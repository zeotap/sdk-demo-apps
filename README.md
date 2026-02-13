# Zeotap SDK Demo Apps

Sample applications demonstrating how to integrate the **Zeotap Collect SDK** across different mobile platforms and languages. Each app follows a realistic e-commerce flow, making it straightforward to see the SDK in action with real-world use cases.

## What's Inside

```
sdk-demo-apps/
├── Android/
│   ├── ZeotapAndroidEcomm/     # Java - Android SDK integration
│   └── ZeotapKotlinShopping/   # Kotlin - Android SDK integration
└── React-Native/
    ├── RN-0-75-5/              # React Native 0.75.5 - RN SDK integration
    └── ZeoDemo/                # React Native - RN SDK integration
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

| App | RN Version | Description |
|-----|------------|-------------|
| **RN-0-75-5** | 0.75.5 | SDK function test app covering all `zeo-collect` API methods |
| **ZeoDemo** | - | Demo app with Zeotap React Native SDK |

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
