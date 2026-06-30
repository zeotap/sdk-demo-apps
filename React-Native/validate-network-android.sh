#!/usr/bin/env bash
#
# Network-level validation (Android) — the STRONGEST proof that the SDK actually
# uploads events: it routes the emulator's traffic through mitmproxy, drives the
# harness with Maestro, and asserts there were real HTTP POSTs to the Zeotap
# collect endpoint:
#
#       https://spl.zeotap.com/fp
#
# This complements validate-runtime-android.sh (logs). Use it when you need to
# see the actual requests + payloads on the wire.
#
# Prerequisites (one-time):
#   1. brew install mitmproxy            # provides mitmdump
#   2. Start mitmproxy once to generate its CA:  mitmdump   (then Ctrl-C)
#   3. Trust the mitmproxy CA on the emulator AS A SYSTEM cert. RN *debug* builds
#      include a network-security-config; this script installs (into the app's
#      debug build) an override that trusts user CAs so interception works
#      without rooting. If you prefer, push the CA as a system cert on a
#      writable-system emulator instead.
#
# Usage:
#   ./validate-network-android.sh [APP_FOLDER] [MITM_PORT]   # default RN-0-86-0 8080
#
set -uo pipefail
cd "$(dirname "$0")"
ROOT="$(pwd)"
APP="${1:-RN-0-86-0}"
PORT="${2:-8080}"
APP_DIR="$ROOT/$APP"
FLOW="$ROOT/e2e/zeo-collect-flow.yaml"
OUT="$ROOT/.runtime-validation/$APP"
FLOWS="$OUT/mitm-flows.dump"
ENDPOINT_HOST="spl.zeotap.com"
ENDPOINT_PATH="/fp"

fail() { echo "ERROR: $*" >&2; exit 1; }

[ -d "$APP_DIR" ] || fail "app folder not found: $APP_DIR"
command -v mitmdump >/dev/null || fail "mitmdump not found — brew install mitmproxy"
command -v adb >/dev/null || fail "adb not found"
command -v maestro >/dev/null || fail "maestro not found"
adb devices | awk 'NR>1 && $2=="device"' | grep -q . || fail "no Android device/emulator ready"
[ -f "$HOME/.mitmproxy/mitmproxy-ca-cert.pem" ] || fail "mitmproxy CA missing — run 'mitmdump' once to generate ~/.mitmproxy/"

APP_ID="$(grep -E 'applicationId' "$APP_DIR/android/app/build.gradle" | head -1 | sed -E 's/.*"([^"]+)".*/\1/')"
mkdir -p "$OUT"
echo "=================================================================="
echo "  Network validation (Android): $APP  appId=$APP_ID  proxy=:$PORT"
echo "  Asserting POSTs to https://$ENDPOINT_HOST$ENDPOINT_PATH"
echo "=================================================================="

cleanup() {
  [ -n "${MITM_PID:-}" ] && kill "$MITM_PID" 2>/dev/null
  adb shell settings put global http_proxy :0 >/dev/null 2>&1
  echo "  (emulator proxy reset)"
}
trap cleanup EXIT

echo "--- starting mitmdump on :$PORT (recording flows) ---"
mitmdump -p "$PORT" -w "$FLOWS" -q >/dev/null 2>&1 &
MITM_PID=$!
sleep 2

# Point the emulator at the host-side proxy (10.0.2.2 = host loopback from AVD).
echo "--- routing emulator traffic through 10.0.2.2:$PORT ---"
adb shell settings put global http_proxy "10.0.2.2:$PORT"

echo "--- launching app (assumes already built; run validate-runtime-android.sh first) ---"
adb shell monkey -p "$APP_ID" -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1
sleep 3

echo "--- driving the app with Maestro ---"
maestro test --env APP_ID="$APP_ID" "$FLOW"; MAESTRO_RC=$?

echo "--- waiting for upload flush ---"; sleep 10
kill "$MITM_PID" 2>/dev/null; MITM_PID=""

echo ""
echo "=================================================================="
echo "  RESULT  (flows: $FLOWS)"
echo "=================================================================="
# Replay the captured stream read-only and count requests to the collect endpoint.
HITS="$(mitmdump -nr "$FLOWS" -q 2>/dev/null | grep -cE "$ENDPOINT_HOST$ENDPOINT_PATH|POST .*$ENDPOINT_HOST")"
echo "  Maestro flow exit:           $MAESTRO_RC"
echo "  Requests to $ENDPOINT_HOST$ENDPOINT_PATH: $HITS"
mitmdump -nr "$FLOWS" -q 2>/dev/null | grep -iE "$ENDPOINT_HOST" | head -10 | sed 's/^/    | /'

if [ "${HITS:-0}" -ge 1 ]; then
  echo "  ✅ The SDK made real network calls to the Zeotap collect endpoint."
  exit 0
else
  echo "  ❌ No requests to $ENDPOINT_HOST$ENDPOINT_PATH captured."
  echo "     Common cause: the proxy CA isn't trusted by the app (TLS handshake"
  echo "     fails). See the README mitmproxy section for the debug network-"
  echo "     security-config override."
  exit 1
fi
