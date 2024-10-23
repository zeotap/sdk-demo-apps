import React from 'react';
import { FlatList, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import { setInstantEventNameProperties } from 'zeo-collect';
import CheckBox from '../../components/CheckBox';
import Container from '../../components/Container';
import CustomButton from '../../components/CustomButton';
import Divider from '../../components/Divider';
import Label from '../../components/Label';
import ProductCard from '../../components/ProductCard';
import ScreenHeader from '../../components/ScreenHeader';
import SelectAble from '../../components/SelectAble';
import TitleComp from '../../components/TitleComp';
import { AlertHelper } from '../../utils/AlertHelper';
import { bestSellersList } from '../../utils/MockData';

 
export default function index({navigation}) {
  return (
      <> 
    <Container isScrollable>
       
        <ScreenHeader label="Summary" navigation={navigation} />

        <View style={{ }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{padding: scale(10)}} />}
          horizontal
          data={bestSellersList} 
          renderItem={({item, index}) => (
            <ProductCard key={index} item={item} />
          )}
        />
        </View>
        <SelectAble
          item={{
            label: 'Shipping Address',
            subLabel:
              '21, Alex Davidson Avenue, Opposite Omegatron, Vicent Smith Quarters, Victoria Island, Lagos, Nigeria',
          }}
          selected
        />
        <Divider  isDark/>
        <View style={{ paddingVertical:scale(20)}}>
        <TitleComp heading="Payment" />
        <View style={{paddingVertical:scale(20),flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Feather name="credit-card" size={scale(25)}/> 
        <View style={{}}>
        <Label text="Master Card" style={{fontSize:scale(13), opacity:scale(.5)}} />
        <Label text="**** **** **** 1234" style={{fontSize:scale(17)}} />
        </View>
         <CheckBox isChecked />
        </View>
        </View>
        {/* <SelectAble
          item={{
            label: 'Shipping Address',
            subLabel:
              '21, Alex Davidson Avenue, Opposite Omegatron, Vicent Smith Quarters, Victoria Island, Lagos, Nigeria',
          }}
          selected
        /> */}
        <Divider  isDark/>
       
    </Container>
    <View style={{flexDirection:'row' , justifyContent:'space-between', alignItems:'center', paddingHorizontal:scale(20), bottom:scale(10)}}>
    <CustomButton onPress={()=> navigation.goBack()} label="back" unFilled  />
    <CustomButton onPress={()=>{
      AlertHelper.show("success", "Your Order Placed Successfully")
      setInstantEventNameProperties("Order Successful");
       navigation.navigate("Home")
        }} label="Pay" />
    </View>
    </>
  );
}
