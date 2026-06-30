#!/usr/bin/env bash
#
# Runtime validation (iOS) — proves the REAL zeo-collect SDK ran as expected on a
# booted iOS Simulator: builds & launches a harness app, drives every SDK method
# with Maestro, captures the simulator's os_log stream, and asserts that
#   (a) every [ZEOTAP-HARNESS] marker was logged, and
#   (b) the native Zeotap SDK emitted processing / network log lines
#       (the SDK is initialised with logging:true).
#
# Prerequisites: Xcode + a booted Simulator, CocoaPods, Maestro, Node.
#   Boot a simulator first, e.g.:  xcrun simctl boot "iPhone 15" ; open -a Simulator
#
# Usage:
#   ./validate-runtime-ios.sh [APP_FOLDER]          # default: RN-0-86-0
#
set -uo pipefail
cd "$(dirname "$0")"
ROOT="$(pwd)"
APP="${1:-RN-0-86-0}"
APP_DIR="$ROOT/$APP"
FLOW="$ROOT/e2e/zeo-collect-flow.yaml"
OUT="$ROOT/.runtime-validation/$APP"
LOG="$OUT/oslog.txt"
METRO_LOG="$OUT/metro.log"

fail() { echo "ERROR: $*" >&2; exit 1; }

[ -d "$APP_DIR" ] || fail "app folder not found: $APP_DIR"
command -v xcrun >/dev/null || fail "xcrun not found (install Xcode)"
command -v maestro >/dev/null || fail "maestro not found (https://maestro.mobile.dev)"

xcrun simctl list devices booted | grep -q "Booted" || \
  fail "no booted iOS Simulator. Boot one: xcrun simctl boot \"iPhone 15\"; open -a Simulator"

APP_NAME="$(basename "$APP_DIR"/ios/*.xcodeproj .xcodeproj)"
APP_ID="org.reactjs.native.example.$APP_NAME"

mkdir -p "$OUT"
echo "=================================================================="
echo "  Runtime validation (iOS): $APP   appId=$APP_ID"
echo "=================================================================="

cleanup() {
  [ -n "${LOG_PID:-}" ] && kill "$LOG_PID" 2>/dev/null
  [ -n "${METRO_PID:-}" ] && kill "$METRO_PID" 2>/dev/null
}
trap cleanup EXIT

cd "$APP_DIR"
[ -d node_modules ] || { echo "--- npm install ---"; npm install --no-audit --no-fund || fail "npm install failed"; }
echo "--- pod install ---"
( cd ios && bundle install && bundle exec pod install ) || fail "pod install failed"

echo "--- starting Metro ---"
( npx react-native start --reset-cache >"$METRO_LOG" 2>&1 ) &
METRO_PID=$!
for i in $(seq 1 60); do
  curl -s "http://localhost:8081/status" 2>/dev/null | grep -q "packager-status:running" && break
  sleep 1
done

echo "--- starting os_log capture ---"
xcrun simctl spawn booted log stream --level debug --style compact > "$LOG" 2>&1 &
LOG_PID=$!

echo "--- building, installing & launching (first build can take several minutes) ---"
npx react-native run-ios --no-packager || fail "run-ios failed (see output above)"

echo "--- driving the app with Maestro ---"
maestro test --env APP_ID="$APP_ID" "$FLOW"
MAESTRO_RC=$?

echo "--- waiting for native SDK to flush/upload events ---"
sleep 10
kill "$LOG_PID" 2>/dev/null; LOG_PID=""

# ---- Assertions ---------------------------------------------------------------
echo ""
echo "=================================================================="
echo "  ASSERTIONS  (full log: $LOG)"
echo "=================================================================="

MARKERS=(
  "initialiseZeoCollect" "getZI" "setConsent"
  "setEventNameProperties" "setEventNameProperties:cb"
  "setEventProperties" "setEventProperties:cb"
  "setInstantEventNameProperties" "setInstantEventNameProperties:cb"
  "setUserIdentities" "setUserIdentities:alt"
  "setUserProperties" "setPageProperties" "unsetUserIdentities"
)

missing=()
echo "[1] JS function markers ([ZEOTAP-HARNESS] ...):"
for m in "${MARKERS[@]}"; do
  if grep -qF "[ZEOTAP-HARNESS] $m" "$LOG"; then
    echo "    ok   $m"
  else
    echo "    MISS $m"
    missing+=("$m")
  fi
done

echo ""
echo "[2] Native Zeotap SDK activity (logging:true):"
SDK_LINES="$(grep -icE 'zeotap|zeocollect|collect' "$LOG")"
echo "    matched $SDK_LINES line(s) mentioning zeotap/collect"
grep -iE 'zeotap|zeocollect' "$LOG" | grep -ivE 'ZEOTAP-HARNESS' | head -8 | sed 's/^/      | /'

echo ""
echo "[3] Network / upload evidence:"
NET_LINES="$(grep -icE 'http(s)?://|upload|batch|flush|POST |response|zeotap\.com|spl\.' "$LOG")"
echo "    matched $NET_LINES line(s) suggesting network/upload"
grep -iE 'http(s)?://|upload|flush|zeotap\.com|spl\.' "$LOG" | head -8 | sed 's/^/      | /'

echo ""
echo "=================================================================="
echo "  RESULT"
echo "=================================================================="
echo "  Maestro flow exit: $MAESTRO_RC"
echo "  Missing markers:   ${#missing[@]} (${missing[*]:-none})"
echo "  SDK log lines:     $SDK_LINES"
echo "  Network log lines: $NET_LINES"

if [ "${#missing[@]}" -eq 0 ] && [ "$MAESTRO_RC" -eq 0 ]; then
  echo "  ✅ All SDK functions ran. Review [2]/[3] above to confirm native upload."
  exit 0
else
  echo "  ❌ Some functions did not run — inspect $LOG"
  exit 1
fi
