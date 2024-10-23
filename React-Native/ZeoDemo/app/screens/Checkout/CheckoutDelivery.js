import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { setEventProperties } from 'zeo-collect';
import SelectAble from '../../components/SelectAble';
import { deliveryTypes } from '../../utils/MockData';

export default function CheckoutDelivery({navigation}) {
    const [selectedAddress, setSelectedAddress] = useState("Standard Delivery") 
    const onSelect = (item) =>{
      setEventProperties("Delivery type", {type: item.label});
        setSelectedAddress( item.label)
    }
  return (
    <View style={{paddingVertical: scale(20)}}>
      <FlatList
        data={deliveryTypes}
        renderItem={({item, index}) => <SelectAble selected={ selectedAddress === item.label } onSelect={onSelect} item={item} key={index} />}
      />
    </View>
  );
}
