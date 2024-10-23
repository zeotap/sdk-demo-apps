import React from 'react';
import {View, Text, FlatList, TextInput,KeyboardAvoidingView } from 'react-native';
import Container from '../../components/Container';
import {bestSellersList} from '../../utils/MockData';
import CheckOutItem from '../../components/CheckOutItem';
import {scale} from 'react-native-size-matters';
import {appColors} from '../../utils/appColors';
import Label from '../../components/Label';
import CustomButton from '../../components/CustomButton';
import { NativeModules } from 'react-native';
import {connect} from 'react-redux';
import {removeAllFromCart} from '../../redux/cartAction';
import { AlertHelper } from '../../utils/AlertHelper';
import { setInstantEventProperties } from 'zeo-collect';

function index({cartItems, removeAllFromCart$, navigation}) {
  const onCheckOut = () => {
    removeAllFromCart$({});
  };
  const priceAmount = cartItems.reduce((acc, item) => acc + +item.price, 0);
  return (
    <KeyboardAvoidingView style={{flex:1}}>
      <Container
        isScrollable
        bodyStyle={{
          flex: 1,
          paddingHorizontal: scale(0),
          paddingVertical: scale(20),
        }}>
        <View
          style={{paddingHorizontal: scale(20), paddingVertical: scale(20)}}>
          <FlatList
            data={[...cartItems]  || [...bestSellersList]}
            ItemSeparatorComponent={() => <View style={{padding: scale(10)}} />}
            renderItem={({item, index}) => (
              <CheckOutItem
                noBg
                name={item.name}
                image={item.image}
                price={item.price}
              />
            )}
          />
        </View>
        <View
          style={{
            borderColor: appColors.lightGray,
            /*  bottom:scale(130),  */ borderBottomWidth: scale(2),
            borderTopWidth: scale(2),
          }}>
          <View
            style={{
              paddingVertical: scale(20),
              paddingHorizontal: scale(20),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Label
              text="Sub Total"
              style={{fontWeight: '400', fontSize: scale(18)}}
            />
            <View
              style={{
                borderRadius: scale(1),
                borderWidth: scale(0.5),
                borderStyle: 'dashed',
                width: '60%',
              }}
            />
            <Label text={"$"+priceAmount} style={{fontWeight: '800'}} />
          </View>

          <View
            style={{
              paddingVertical: scale(20),
              paddingHorizontal: scale(20),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Label
              text="Tax"
              style={{fontWeight: '400', fontSize: scale(18)}}
            />
            <View
              style={{
                borderRadius: scale(1),
                borderWidth: scale(0.5),
                borderStyle: 'dashed',
                width: '60%',
              }}
            />
            <Label text="$40" style={{fontWeight: '800'}} />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingHorizontal: scale(20),
            paddingVertical: scale(30),
          }}>
          <CustomButton label="CHECKOUT" onPress={() => {
            setInstantEventProperties("Order SuccessFul", { totalPrice: 4500, tax: 40 });
            onCheckOut();
            AlertHelper.show("success","Order Successful");
            navigation.navigate("Home")
          }
          } />
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}

const mapStateToProps = (state) => ({
  cartItems : state.cart.cartItems
});
const mapDispatchToProps = {
  removeAllFromCart$: removeAllFromCart,
};
export default connect(mapStateToProps, mapDispatchToProps)(index);