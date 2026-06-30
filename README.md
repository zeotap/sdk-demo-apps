# Zeotap SDK Demo Apps

Sample applications demonstrating how to integrate the **Zeotap Collect SDK** across different mobile platforms and languages. Each app follows a realistic e-commerce flow, making it straightforward to see the SDK in action with real-world use cases.

## What's Inside

```
sdk-demo-apps/
├── Android/
│   ├── ZeotapAndroidEcomm/     # Java - Android SDK integration
│   └── ZeotapKotlinShopping/   # Kotlin - Android SDK integration
└── React-Native/
    ├── ZeoDemo/                # React Native 0.72 - full e-commerce demo
    ├── RN-0-73-11/             # React Native 0.73.11 - SDK test harness
    ├── RN-0-74-7/              # React Native 0.74.7  - SDK test harness
    ├── RN-0-75-5/              # React Native 0.75.5  - SDK test harness
    ├── RN-0-76-9/              # React Native 0.76.9  - SDK test harness (New Arch default)
    ├── RN-0-77-3/              # React Native 0.77.3  - SDK test harness (New Arch default)
    ├── RN-0-78-3/              # React Native 0.78.3  - SDK test harness (React 19)
    ├── RN-0-79-7/              # React Native 0.79.7  - SDK test harness
    ├── RN-0-80-3/              # React Native 0.80.3  - SDK test harness
    └── RN-0-86-0/              # React Native 0.86.0  - SDK test harness (latest)
```

### Android Apps

| App | Language | Description |
|-----|----------|-------------|
| **ZeotapAndroidEcomm** | Java | E-commerce app with consent, login, product browsing, and full Zeotap SDK integration |
| **ZeotapKotlinShopping** | Kotlin | Same shopping flow written in idiomatic Kotlin with Zeotap SDK integration |

Both Android apps share the same user flow:

1. **Consent Screen** - Privacy consent with agree/disagree options
2. **Login Screen** - Email & password authentication
3. **Category Screen** - Browse product categories in a grid
4. **Product List** - View products within a category
5. **Product Detail** - Full product details with add-to-cart and buy-now actions

### React Native Apps

The React Native folder is a **multi-version validation matrix**: the same
`zeo-collect` SDK function-test harness, scaffolded fresh on each supported
React Native version. Customers (and we) can pick the version closest to their
project and confirm the SDK initialises and every API method runs as expected —
including across the New Architecture boundary introduced in RN 0.76.

Every harness pins **`zeo-collect@1.3.9`** and exposes each SDK method as a
button that logs its result to the console. See each app's own `README.md` for
run steps and how to toggle between the New and Old Architectures.

| App | RN Version | React | Default Architecture | Notes |
|-----|------------|-------|----------------------|-------|
| **ZeoDemo** | 0.72.10 | 18.2 | Old | Full e-commerce demo (navigation, redux) — not a harness |
| **RN-0-73-11** | 0.73.11 | 18.2 | Old | SDK function-test harness |
| **RN-0-74-7** | 0.74.7 | 18.2 | Old | SDK function-test harness |
| **RN-0-75-5** | 0.75.5 | 18.3 | Old | SDK function-test harness |
| **RN-0-76-9** | 0.76.9 | 18.3 | **New** | New Architecture becomes the default |
| **RN-0-77-3** | 0.77.3 | 18.3 | **New** | SDK function-test harness |
| **RN-0-78-3** | 0.78.3 | 19.0 | **New** | React 19 baseline |
| **RN-0-79-7** | 0.79.7 | 19.0 | **New** | SDK function-test harness |
| **RN-0-80-3** | 0.80.3 | 19.1 | **New** | SDK function-test harness |
| **RN-0-86-0** | 0.86.0 | 19.2 | **New** | Latest stable |

> Each harness ships on its RN version's **default** architecture. To validate
> the SDK on the other architecture, flip `newArchEnabled` in
> `android/gradle.properties` (Android) or reinstall pods with
> `RCT_NEW_ARCH_ENABLED=0|1 bundle exec pod install` (iOS) — see the app README.

#### Validating the SDK without an emulator

Every harness ships with a Jest test (`__tests__/App.test.tsx`) that **mocks the
native `zeo-collect` module and drives the harness UI entirely in JavaScript** —
no device, simulator, or emulator required. It asserts that each SDK method is
called with the expected arguments when its button is pressed, so it catches
JS↔SDK wiring breakage on a given RN version in seconds.

Validate a single version:

```sh
cd React-Native/RN-0-86-0
npm install
npm test
```

Validate **every** version in one shot:

```sh
cd React-Native
./validate-all.sh            # all versions
./validate-all.sh RN-0-86-0  # or a specific one
```

This is the fast feedback loop (CI-friendly). It verifies the SDK's API surface
and integration. The `zeo-collect` JS package is only a thin bridge — the actual
event batching, **network upload, and the SDK's own logs happen in native code**
(`com.zeotap:zeo-collect` on Android, the ZeoCollect pod on iOS). To confirm
those, use the runtime validation below.

#### Validating the SDK at runtime (real network calls + logs)

The harness initialises the SDK with `logging: true` and emits a
`[ZEOTAP-HARNESS] <method>` console marker for every call. The runtime scripts
build & launch a harness on an emulator/simulator, drive **every** SDK method
automatically with [Maestro](https://maestro.mobile.dev), capture the device
logs, and assert that:

1. every `[ZEOTAP-HARNESS]` marker was logged (each function actually ran), and
2. the native Zeotap SDK emitted processing / network-upload log lines.

```sh
cd React-Native

# Android — needs a running emulator/device + Maestro
#   start one first:  $ANDROID_HOME/emulator/emulator -avd <name> &
./validate-runtime-android.sh RN-0-74-7

# iOS — needs a booted Simulator + CocoaPods + Maestro
#   boot one first:   xcrun simctl boot "iPhone 15"; open -a Simulator
./validate-runtime-ios.sh RN-0-74-7
```

The drive sequence is one shared Maestro flow (`e2e/zeo-collect-flow.yaml`);
captured logs are written to `React-Native/.runtime-validation/<app>/` (gitignored).

**What the assertions key off (from the native SDK):**

| Signal | Value |
|--------|-------|
| Collect endpoint | `https://spl.zeotap.com/fp` |
| Android log tag | `Zeotap` (`adb logcat -s Zeotap`) |
| Init success | callback `{status: "SUCCESS", message: "SDK initialized successfully"}` |

#### Network-level proof (mitmproxy)

For the strongest proof — the actual HTTP POSTs on the wire — route the emulator
through [mitmproxy](https://mitmproxy.org) and assert requests to
`spl.zeotap.com/fp`:

```sh
brew install mitmproxy
mitmdump            # run once to generate ~/.mitmproxy/ CA, then Ctrl-C

# build/install the app first, then:
cd React-Native
./validate-network-android.sh RN-0-86-0
```

> TLS note: Android N+ apps don't trust user-added CAs by default. To let a
> **debug** build trust the mitmproxy CA, add a `network_security_config` with a
> `<debug-overrides>` block trusting `user` certs (or push the CA as a system
> cert on a writable-system emulator). Without this the TLS handshake fails and
> no flows are captured. Alternatively, confirm events in the source's live view
> in the Zeotap CDP.

## SDK Functions Demonstrated

Each app showcases the core Zeotap SDK APIs in context:

| SDK Method | Where It's Used |
|------------|-----------------|
| `Collect.init()` / `initialiseZeoCollect()` | Application startup |
| `setConsent()` | Consent screen - grant or deny tracking |
| `setUserIdentities()` | Login - associate user email/ID |
| `setUserProperties()` | Login - set user profile attributes |
| `setEventProperties()` | Product views, cart actions, purchases |
| `setPageProperties()` | Screen navigation tracking |
| `unSetUserIdentities()` | Logout flow |

## Getting Started

### Android (Java / Kotlin)

1. Open the desired project folder in **Android Studio**
2. Replace `"YOUR_WRITE_KEY"` in the Application class with your Zeotap CDP source write key
3. Sync Gradle and run on a device or emulator (API 21+)

### React Native

1. Navigate to the desired project folder
2. Run `npm install` or `yarn install`
3. Update the write keys in the app configuration
4. Run with `npx react-native run-android` or `npx react-native run-ios`

## SDK Documentation

For complete SDK documentation, API references, and advanced configuration options, refer to the [Zeotap SDK Documentation](https://docs.zeotap.com).

## Requirements

- **Android**: Android Studio, JDK 8+, API 21+ device/emulator
- **React Native**: Node.js, npm/yarn, React Native CLI, Xcode (iOS) or Android Studio (Android)
