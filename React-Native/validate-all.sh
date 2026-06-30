#!/usr/bin/env bash
#
# Validate the Zeotap Collect SDK against every React Native version in this
# folder — WITHOUT an emulator or device.
#
# For each harness app it runs `npm install` and the Jest suite, which mocks the
# native `zeo-collect` module and drives the UI in pure JS, asserting that every
# SDK method is invoked correctly on that React Native version.
#
# Usage:
#   ./validate-all.sh                 # validate every RN-* harness
#   ./validate-all.sh RN-0-86-0 ...   # validate only the given app folder(s)
#
set -uo pipefail
cd "$(dirname "$0")"

if [ "$#" -gt 0 ]; then
  APPS=("$@")
else
  APPS=(RN-0-73-11 RN-0-74-7 RN-0-75-5 RN-0-76-9 RN-0-77-3 RN-0-78-3 RN-0-79-7 RN-0-80-3 RN-0-86-0)
fi

pass=(); fail=()
for app in "${APPS[@]}"; do
  echo ""
  echo "=================================================================="
  echo "  $app"
  echo "=================================================================="
  if [ ! -d "$app" ]; then
    echo "  (skipped — folder not found)"
    continue
  fi
  ( cd "$app" \
      && npm install --no-audit --no-fund \
      && npm test -- --ci ) \
    && pass+=("$app") || fail+=("$app")
done

echo ""
echo "=================================================================="
echo "  SUMMARY"
echo "=================================================================="
echo "  PASS (${#pass[@]}): ${pass[*]:-none}"
echo "  FAIL (${#fail[@]}): ${fail[*]:-none}"
[ "${#fail[@]}" -eq 0 ]
