#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>

//#import <InMobiCMP/InMobiCMP.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"ZeoDemo";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

//- (void)applicationDidBecomeActive:(UIApplication *)application {
//  CollectSDK *Collectobj = [[CollectSDK alloc] init];
//  [Collectobj showPermissionPopUp];
//}
//
//- (void)cmpDidErrorWithError:(NSError * _Nonnull)error {
//}
//
//- (void)cmpDidLoadWithInfo:(PingResponse * _Nonnull)info {
//}
//
//- (void)cmpDidShowWithInfo:(PingResponse * _Nonnull)info {
//}
//
//- (void)didReceiveAdditionalConsentWithAcData:(ACData * _Nonnull)acData updated:(BOOL)updated {
//}
//
//- (void)didReceiveIABVendorConsentWithTcData:(TCData * _Nonnull)tcData updated:(BOOL)updated {
//}
//
//- (void)didReceiveNonIABVendorConsentWithNonIabData:(NonIABData * _Nonnull)nonIabData updated:(BOOL)updated {
//}
//
//- (void)didReceiveCCPAConsentWithString:(NSString * _Nonnull)string {
//}

@end
