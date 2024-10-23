import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, NativeModules, Pressable, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import BottomButtons from '../../components/BottomButtons';
import Container from '../../components/Container';
import Label from '../../components/Label';
import TitleComp from '../../components/TitleComp';
import { addToCart } from '../../redux/cartAction';
import { appColors } from '../../utils/appColors';
import { setPageProperties, setEventProperties } from 'zeo-collect';

function index({cartItems ,addToCart$, navigation,route:{params}}) {
  useFocusEffect(() => {
    setPageProperties({page: "Product Detail Page", extraProp: "Extra Properties"});
  });

  //item
    
  const {name, description, price, size, color, image, isFav, category, id} = params.item;
  //console.warn({cartItems});
  const onAddToCart = () => {
    addToCart$({...params.item, quantity:1});
  };
  const _renderBottom = () => {
    return (
      <BottomButtons
        onPress={() => {
          setEventProperties("Add To Cart", {name: name, price: price, size: size, color: color, quantity:1});
          onAddToCart();
          navigation.navigate('Cart');
        }}
        price={"$"+price}
        buttonLabel="ADD"
      />
    );
  };
  return (
    <>
      <Container bodyStyle={{paddingHorizontal: scale(0)}} isScrollable>
        <View>
          <ImageBackground
            style={{height: scale(400), width: '100%'}}
            resizeMode="cover"
            source={image}>
            <View
              style={{
                marginTop: scale(40),
                paddingHorizontal: scale(20),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>

              <Pressable
                style={{
                  borderRadius: scale(25),
                  backgroundColor: appColors.white,
                  height: scale(45),
                  width: scale(45),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Feather name="star" size={scale(20)} color={appColors.black} />
              </Pressable>
            </View>
          </ImageBackground>
        </View>
        <View style={{paddingHorizontal: scale(20), marginBottom: scale(100)}}>
          <View style={{paddingVertical: scale(20)}}>
            <Label
              text={name}
              style={{fontWeight: '700', fontSize: scale(30)}}
            />
          </View>

          <View
            style={{
              paddingVertical: scale(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={styles.sizeContainer}>
              <Label text="Size" style={{fontSize: scale(15)}} />
              <Label
                text="XL"
                style={{fontWeight: '700', fontSize: scale(15)}}
              />
            </View>

            <View style={styles.sizeContainer}>
              <Label text="Colour" style={{fontSize: scale(15)}} />
              <View style={styles.itemColor} />
            </View>
          </View>

          <View style={{paddingVertical: scale(20)}}>
            <TitleComp heading={'Details'} />
            <View style={{paddingVertical: scale(20)}}>
              <Label
                text={description}
                style={{fontSize: scale(14), lineHeight: scale(25)}}
              />
            </View>
          </View>
        </View>
      </Container>
      {_renderBottom()}
    </>
  );
}

const mapStateToProps = (state) => ({
   cartItems : state.cart.cartItems
});
const mapDispatchToProps = {
  addToCart$: addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
const styles = StyleSheet.create({
  sizeContainer: {
    flex: 0.47,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: appColors.white,
    padding: scale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(20),
    borderWidth: scale(0.4),
    borderColor: appColors.gray,
  },
  itemColor: {
    height: scale(20),
    width: scale(20),
    backgroundColor: appColors.primary,
    borderRadius: scale(5),
  },
  wrtitle: {
    paddingVertical: scale(10),
    fontSize: scale(14),
    color: appColors.primary,
  },
});
