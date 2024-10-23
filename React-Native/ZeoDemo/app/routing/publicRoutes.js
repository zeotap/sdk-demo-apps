import Consent from '../screens/Consent';
import Verification from '../screens/Verification';
import Welcome from '../screens/Welcome';
export const publicRoutes = [
  {
    name: 'Welcome',
    component: Welcome,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'Welcome',
    },
  },
  {
    name: 'Verification',
    component: Verification,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'Verification',
    },
  },
  {
    name: 'Consent',
    component: Consent,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'Consent',
    },
  },
];
