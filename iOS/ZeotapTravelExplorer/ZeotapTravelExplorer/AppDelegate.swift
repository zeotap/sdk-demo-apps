import UIKit
import ZeotapCollect

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {

        // Initialize Zeotap SDK
        initZeotapSDK()

        // Setup root view controller
        window = UIWindow(frame: UIScreen.main.bounds)
        let consentVC = ConsentViewController()
        let navController = UINavigationController(rootViewController: consentVC)
        window?.rootViewController = navController
        window?.makeKeyAndVisible()

        return true
    }

    private func initZeotapSDK() {
        let collectOptions = CollectOption()
            .writeKey(value: "YOUR_WRITE_KEY") // Replace with your Zeotap write key
            .logging(value: true)
            .useConsent(value: true)
            .build()

        Collect.initialize(option: collectOptions)
        print("[ZeotapTravelExplorer] Zeotap SDK initialized successfully")
    }
}
