#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <InMobiCMP/InMobiCMP.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, ChoiceCmpDelegate, CCPADelegate>

@property (nonatomic, strong) UIWindow *window;

@end
