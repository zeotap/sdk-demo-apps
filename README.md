# Zeotap SDK Demo Apps

Sample applications demonstrating how to integrate the **Zeotap Collect SDK** across different mobile platforms and languages. Each app follows a realistic app flow, making it straightforward to see the SDK in action with real-world use cases.

## What's Inside

```
sdk-demo-apps/
├── Android/
│   ├── ZeotapAndroidEcomm/       # Java - Android SDK integration (E-commerce)
│   └── ZeotapKotlinShopping/     # Kotlin - Android SDK integration (Shopping)
├── iOS/
│   └── ZeotapTravelExplorer/     # Swift - iOS SDK integration (Travel)
└── React-Native/
    ├── RN-0-75-5/                # React Native 0.75.5 - RN SDK integration
    └── ZeoDemo/                  # React Native - RN SDK integration
```

### Android Apps

| App | Language | Theme | Description |
|-----|----------|-------|-------------|
| **ZeotapAndroidEcomm** | Java | E-commerce | Consent, login, product categories, product list, product detail with cart and purchase actions |
| **ZeotapKotlinShopping** | Kotlin | Shopping | Same flow as ZeotapAndroidEcomm, written in idiomatic Kotlin |

**App flow:** Consent → Login → Product Categories (grid) → Product List → Product Detail (Add to Cart / Buy Now)

### iOS App

| App | Language | Theme | Description |
|-----|----------|-------|-------------|
| **ZeotapTravelExplorer** | Swift | Travel | Consent, login, destination categories, place list, place detail with trip planning and wishlist actions |

**App flow:** Consent → Login → Destination Categories (grid) → Place List → Place Detail (Plan Trip / Save to Wishlist)

**6 destination categories** with 4 places each (24 places total): Beaches, Mountains, Cities, Historical, Adventure, Islands

### React Native Apps

| App | RN Version | Description |
|-----|------------|-------------|
| **RN-0-75-5** | 0.75.5 | SDK function test app covering all `zeo-collect` API methods |
| **ZeoDemo** | - | Demo app with Zeotap React Native SDK |

## SDK Functions Demonstrated

Each app showcases the core Zeotap SDK APIs in context:

| SDK Method | Android (Java/Kotlin) | iOS (Swift) | React Native |
|------------|----------------------|-------------|--------------|
| `Collect.init()` / `Collect.initialize()` | App startup | App startup | `initialiseZeoCollect()` |
| `setConsent()` | Consent screen | Consent screen | Button tap |
| `setUserIdentities()` | Login | Login | Button tap |
| `setUserProperties()` | Login | Login | Button tap |
| `setEventProperties()` | Product/place views, cart, purchases | Place views, trip planning, wishlist | Button tap |
| `setPageProperties()` | Screen navigation | Screen navigation | Button tap |
| `unSetUserIdentities()` | Logout | Logout | Button tap |

## Getting Started

### Android (Java / Kotlin)

1. Open the desired project folder in **Android Studio**
2. Replace `"YOUR_WRITE_KEY"` in the Application class with your Zeotap CDP source write key
3. Sync Gradle and run on a device or emulator (API 21+)

### iOS (Swift)

1. Open `iOS/ZeotapTravelExplorer` in terminal and run `pod install`
2. Open `ZeotapTravelExplorer.xcworkspace` in **Xcode**
3. Replace `"YOUR_WRITE_KEY"` in `AppDelegate.swift` with your Zeotap CDP source write key
4. Build and run on a simulator or device (iOS 13.0+)

### React Native

1. Navigate to the desired project folder
2. Run `npm install` or `yarn install`
3. Update the write keys in the app configuration
4. Run with `npx react-native run-android` or `npx react-native run-ios`

## SDK Documentation

For complete SDK documentation, API references, and advanced configuration options, refer to the [Zeotap SDK Documentation](https://docs.zeotap.com).

## Requirements

- **Android**: Android Studio, JDK 8+, API 21+ device/emulator
- **iOS**: Xcode 12+, CocoaPods, iOS 13.0+ device/simulator
- **React Native**: Node.js, npm/yarn, React Native CLI, Xcode (iOS) or Android Studio (Android)
