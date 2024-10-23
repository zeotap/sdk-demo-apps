import React from 'react';
import {View, Text, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../utils/appColors';
import Label from './Label';
import {SimpleStepper} from 'react-native-simple-stepper';

export default function CheckOutItem({noBg, image, name, price}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor:  noBg ?  'transparent':   appColors.lightGray,
        //borderRadius: scale(  5 )
      }}>
      <Image
        style={{
          height: scale(130),
          width: scale(130),
           borderRadius:  scale(noBg ? 5 : 0),
          //backgroundColor:appColors.darkGray
        }}
        source={image}
      />

      <View
        style={{
          marginLeft: scale(10),
          justifyContent: 'space-between',
          paddingVertical: scale(10),
        }}>
        <Label text={name} style={{fontWeight: '600'}} />
        <Label
          text={"$"+price}
          style={{
            fontSize: scale(18),
            fontWeight: '500',
            color: appColors.primary,
          }}
        />
      </View>
    </View>
  );
}
