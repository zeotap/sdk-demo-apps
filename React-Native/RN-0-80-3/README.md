# Zeotap Collect SDK — React Native 0.80.3 Test Harness

A minimal, single-screen React Native **0.80.3** app whose only purpose is to
validate that the [`zeo-collect`](https://www.npmjs.com/package/zeo-collect)
SDK (pinned to **1.3.9**) initialises and runs correctly on this exact
React Native version. Every `zeo-collect` API method is wired to a button that
logs its result to the console.

Use it to confirm — for both Zeotap and our customers — that the SDK behaves as
expected on RN 0.80.3.

## Prerequisites

Complete the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment)
for your target platform(s).

## 1. Install dependencies

```sh
npm install
# iOS only — install CocoaPods (first run, or after native dep changes):
cd ios && bundle install && bundle exec pod install && cd ..
```

## 2. Add your write key

Open `App.tsx` and replace `ANDROID_WRITE_KEY` / `IOS_WRITE_KEY` with your
Zeotap CDP source write key(s).

## 3. Run

```sh
npm start          # start Metro (in one terminal)
npm run android    # or: npm run ios
```

## 4. Validate

1. Tap **Yes, I Consent** — the SDK initialises (`initialiseZeoCollect`) and the
   instance id is logged (`getZI`).
2. Tap each button and watch the console (Metro / `adb logcat` / Xcode) to
   confirm every method fires without error.

### SDK methods exercised

| Button | `zeo-collect` method |
|--------|-----------------------|
| Yes, I Consent | `initialiseZeoCollect`, `getZI` |
| No, Decline | `pauseCollection` |
| set Consent | `setConsent` |
| set Event / with cb | `setEventNameProperties` |
| set Event properties / cb | `setEventProperties` |
| set Instant Event / with cb | `setInstantEventNameProperties` |
| set user identities | `setUserIdentities` |
| unset Identities | `unsetUserIdentities` |
| set user properties | `setUserProperties` |
| set page properties | `setPageProperties` |

## New Architecture

This RN version ships with the **New Architecture enabled by default**.

- **Run on New Architecture (default):** just build and run as above.
- **Run on the legacy (Old) Architecture** to validate the SDK there too:
  - Android — set `newArchEnabled=false` in `android/gradle.properties`, then rebuild.
  - iOS — reinstall pods with the flag off: `cd ios && RCT_NEW_ARCH_ENABLED=0 bundle exec pod install && cd ..`, then rebuild.

---

Part of the [Zeotap SDK Demo Apps](../../README.md) multi-version validation matrix.
