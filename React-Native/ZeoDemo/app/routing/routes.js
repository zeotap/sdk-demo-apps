/**
 * @author Amusoftech <er.amudeep@gmail.com>
 * @description List of routes for Tabs Navigator and Stack navigator, Along addational  Option for Tabs
 */
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import CheckoutDelivery from '../screens/Checkout/CheckoutDelivery';
import CheckOutSteper from '../screens/Checkout/CheckOutSteper';
import Home from '../screens/Home';
import ProductDetails from '../screens/ProductDetails';
import Search from '../screens/Search';
import Summary from '../screens/Summary';

import Address from '../screens/Address';
import Category from '../screens/Category';
import Login from '../screens/Login';
import Orders from '../screens/Orders';
import Others from '../screens/Others';

export const RoutesList = [
 
  {
    name: 'Home',
    component: Home,
    options: {
      //tabBarBadge: 3,
      tabBarLabel: 'Home',
    },
  },
  {
    name: 'Login',
    component: Login,
    options: {
      tabBarButton: (props) => null,
      // tabBarVisible: false,
      // tabBarBadge: 3,
      tabBarLabel: 'Login',
    },
  },
  {
    name: 'Cart',
    component: Cart,
    options: {
      //tabBarBadge: 3,
      tabBarLabel: 'Cart',
    },
  },

  {
    name: 'ProductDetails',
    component: ProductDetails,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      tabBarBadge: 3,
      tabBarLabel: 'ProductDetails',
    },
  },

  {
    name: 'Checkout',
    component: Checkout,
    options: {
      tabBarButton: (props) => null,
      //tabBarVisible:false,
      //tabBarBadge: 3,
      tabBarLabel: 'Checkout',
    },
  },

  {
    name: 'Category',
    component: Category,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'Category',
    },
  },

  {
    name: 'Search',
    component: Search,
    options: {
      tabBarButton: (props) => null,
      //tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'Search',
    },
  },

  {
    name: 'CheckoutDelivery',
    component: CheckoutDelivery,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'CheckoutDelivery',
    },
  },

  {
    name: 'CheckOutSteper',
    component: CheckOutSteper,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'CheckOutSteper',
    },
  },

  {
    name: 'Summary',
    component: Summary,
    options: {
      tabBarButton: (props) => null,
      tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'Summary',
    },
  },

  {
    name: 'Others',
    component: Others,
    options: {
      // tabBarButton: (props) => null,
      //tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'Others',
    },
  },
  {
    name: 'Orders',
    component: Orders,
    options: {
      tabBarButton: (props) => null,
      //tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'Orders',
    },
  },
  {
    name: 'Address',
    component: Address,
    options: {
      tabBarButton: (props) => null,
      //tabBarVisible: false,
      //tabBarBadge: 3,
      tabBarLabel: 'Address',
    },
  },
];
