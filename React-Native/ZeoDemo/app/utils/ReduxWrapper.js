import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addToCart} from '../redux/cartAction';
import {getProducts} from '../redux/productAction';
import {updateConfigs} from '../redux/configsAction';
export const mapStateToProps = (state) => ({
    productList: state.products.products
});

export const mapDispatchToProps = {
  addToCart$: addToCart,
  getProducts$: getProducts,
  updateConfigs$: updateConfigs,
};

export const hocComponentName = (WrappedComponent) => {
  const hocComponent = ({...props}) => <WrappedComponent {...props} />;

  hocComponent.propTypes = {};

  return hocComponent;
};

export default (ReduxWrapper) =>
  connect(mapStateToProps, mapDispatchToProps)(hocComponentName(ReduxWrapper));
