#import "AppDelegate.h"


#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
#import<ChoiceMobile/ChoiceMobile-Swift.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"ZeoDemo"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [[ChoiceCmp shared] startChoiceWithPcode: @"p-mc0g3-k1GYpmj" delegate: self ccpaDelegate: NULL shouldDisplayIDFA: false];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
}

- (void)cmpDidErrorWithError:(NSError * _Nonnull)error {
  NSLog(@"Error: %@", error.localizedDescription);
}

- (void)cmpDidLoadWithInfo:(PingResponse * _Nonnull)info {}

- (void)cmpUIStatusChangedWithInfo:(DisplayInfo * _Nonnull)info { }

- (void)didReceiveAdditionalConsentWithAcData:(ACData * _Nonnull)acData updated:(BOOL)updated {}

- (void)didReceiveIABVendorConsentWithGdprData:(GDPRData * _Nonnull)gdprData updated:(BOOL)updated {}

- (void)didReceiveNonIABVendorConsentWithNonIabData:(NonIABData * _Nonnull)nonIabData updated:(BOOL)updated {}

- (void)didReceiveUSRegulationsConsentWithUsRegData:(USRegulationsData * _Nonnull)usRegData { 
  
}

- (void)userDidMoveToOtherState { 
  
}

- (void)didReceiveCCPAConsent:(NSString * _Nonnull)string { }

- (void)didReceiveCCPAConsentWithString:(NSString * _Nonnull)string {
  
}

@end
