import {combineReducers} from 'redux';
import cart from './cart';
import error from './error';
import products from './products';
import configs from './configs';
export default combineReducers({
  error,
  cart,
  products,
  configs
});
