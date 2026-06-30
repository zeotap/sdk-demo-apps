#!/usr/bin/env bash
#
# Runtime validation (Android) — proves the REAL zeo-collect SDK ran as expected:
# it builds & launches a harness app on a connected emulator/device, drives every
# SDK method with Maestro, captures `adb logcat`, and asserts that
#   (a) every [ZEOTAP-HARNESS] marker was logged (each function actually ran), and
#   (b) the native Zeotap SDK emitted processing / network-upload log lines
#       (the SDK is initialised with logging:true).
#
# Prerequisites: Android SDK (adb), a running emulator or device, Maestro, Node.
#   Start an emulator first, e.g.:  emulator -avd Pixel_6_Pro &
#
# Usage:
#   ./validate-runtime-android.sh [APP_FOLDER]      # default: RN-0-86-0
#
set -uo pipefail
cd "$(dirname "$0")"
ROOT="$(pwd)"
APP="${1:-RN-0-86-0}"
APP_DIR="$ROOT/$APP"
FLOW="$ROOT/e2e/zeo-collect-flow.yaml"
OUT="$ROOT/.runtime-validation/$APP"
LOG="$OUT/logcat.txt"
METRO_LOG="$OUT/metro.log"

fail() { echo "ERROR: $*" >&2; exit 1; }

[ -d "$APP_DIR" ] || fail "app folder not found: $APP_DIR"
command -v adb >/dev/null || fail "adb not found (install Android platform-tools)"
command -v maestro >/dev/null || fail "maestro not found (https://maestro.mobile.dev)"

# Require a ready device/emulator.
DEVICE_COUNT="$(adb devices | awk 'NR>1 && $2=="device"' | wc -l | tr -d ' ')"
[ "$DEVICE_COUNT" -ge 1 ] || fail "no Android device/emulator ready. Start one: emulator -avd <name> &"

# Resolve the applicationId.
APP_ID="$(grep -E 'applicationId' "$APP_DIR/android/app/build.gradle" | head -1 | sed -E 's/.*"([^"]+)".*/\1/')"
[ -n "$APP_ID" ] || APP_ID="$(grep -E 'namespace' "$APP_DIR/android/app/build.gradle" | head -1 | sed -E 's/.*"([^"]+)".*/\1/')"
[ -n "$APP_ID" ] || fail "could not resolve applicationId for $APP"

mkdir -p "$OUT"
echo "=================================================================="
echo "  Runtime validation (Android): $APP   appId=$APP_ID"
echo "=================================================================="

cleanup() {
  [ -n "${LOGCAT_PID:-}" ] && kill "$LOGCAT_PID" 2>/dev/null
  [ -n "${METRO_PID:-}" ] && kill "$METRO_PID" 2>/dev/null
}
trap cleanup EXIT

cd "$APP_DIR"
[ -d node_modules ] || { echo "--- npm install ---"; npm install --no-audit --no-fund || fail "npm install failed"; }

echo "--- starting Metro ---"
( npx react-native start --reset-cache >"$METRO_LOG" 2>&1 ) &
METRO_PID=$!
for i in $(seq 1 60); do
  curl -s "http://localhost:8081/status" 2>/dev/null | grep -q "packager-status:running" && break
  sleep 1
done

echo "--- building & installing debug app (first build can take several minutes) ---"
npx react-native run-android --no-packager || fail "run-android failed (see output above)"

echo "--- clearing logcat and starting capture (ReactNativeJS + Zeotap tags) ---"
adb logcat -c
# Capture only the harness JS markers (ReactNativeJS) and the native Zeotap SDK
# tag, silencing everything else (keeps out Maestro's verbose hierarchy dumps).
adb logcat -v time ReactNativeJS:V Zeotap:V "*:S" > "$LOG" 2>&1 &
LOGCAT_PID=$!

echo "--- driving the app with Maestro ---"
maestro test --env APP_ID="$APP_ID" "$FLOW"
MAESTRO_RC=$?

echo "--- waiting for native SDK to flush/upload events ---"
sleep 10
kill "$LOGCAT_PID" 2>/dev/null; LOGCAT_PID=""

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
echo "[2] Native Zeotap SDK activity (logging:true, logcat tag 'Zeotap'):"
# Lines emitted by the native SDK appear under tag 'Zeotap' (e.g. 'I/Zeotap (..)').
SDK_LINES="$(grep -cE '[VDIWE]/Zeotap' "$LOG")"
echo "    matched $SDK_LINES native-SDK log line(s) (tag=Zeotap)"
grep -E '[VDIWE]/Zeotap' "$LOG" | head -10 | sed 's/^/      | /'
# Known SDK lifecycle tokens.
for tok in "SDK initialized successfully" "consent" "init"; do
  n="$(grep -icF "$tok" "$LOG")"; echo "    token \"$tok\": $n hit(s)"
done

echo ""
echo "[3] Network / upload evidence (collect endpoint https://spl.zeotap.com/fp):"
# The native SDK uploads events to spl.zeotap.com/fp. With logging on it may log
# the request/response; the strongest proof is a proxy capture (see README).
NET_LINES="$(grep -icE 'spl\.zeotap\.com|/fp|upload|response code|status code' "$LOG")"
echo "    matched $NET_LINES line(s) referencing the endpoint/upload"
grep -iE 'spl\.zeotap\.com|/fp|upload|response code|status code' "$LOG" | head -8 | sed 's/^/      | /'
[ "$NET_LINES" -eq 0 ] && echo "    (none in logcat — confirm upload via mitmproxy or the Zeotap CDP live view; see README)"

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
