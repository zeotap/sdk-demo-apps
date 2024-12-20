import React from 'react';
import { Image, Pressable, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { setEventProperties } from 'zeo-collect';
import { appColors } from '../utils/appColors';
import Label from './Label';

export default function ProductCard({navigation, item}) {
  const {name, description, price, image, isNew} = item;
  return (
    <Pressable onPress={() => {
      setEventProperties(
        "View Product", 
        {name: name, description: description, price: price},
        (data) => {
          console.log("Event status update", data);
        }
      );
      navigation.navigate('ProductDetails',{item})
    }
      } style={{}}>
      <View style={{}}>
        <View
          style={{
            height: scale(200),
            width: scale(160),
            //backgroundColor:appColors.lightGray
          }}>
          <Image source={image} style={{ width: 160, height: 210, resizeMode: 'stretch' }} />
          {isNew && (
            <View
              style={{
                backgroundColor: appColors.red,
                position: 'absolute',
                top: scale(10),
                right: scale(20),
                padding: scale(3),
                borderRadius: scale(3),
                paddingHorizontal: scale(10),
              }}>

              <Label text="New" style={{ fontSize: scale(10), color: appColors.white }} />
            </View>
          )}
        </View>
        <View style={{ paddingVertical: scale(3) }}>
          <Label text={name} style={{ fontSize: scale(18), fontWeight: '500' }} />
        </View>

        <View style={{ paddingVertical: scale(2) }}>
          <Label
            text={description}
            style={{ fontSize: scale(13), color: appColors.darkGray }}
          />
        </View>

        <View style={{ paddingVertical: scale(5) }}>
          <Label
            text={"$" + price}
            style={{
              fontSize: scale(18),
              color: appColors.primary,
              fontWeight: '500',
            }}
          />
        </View>
      </View>
    </Pressable> 
  );
}
