import React, { useState } from 'react';
import { NativeModules, View, ScrollView } from 'react-native';
import { scale } from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Label from '../../components/Label';
import { AlertHelper } from '../../utils/AlertHelper';
import { appColors, shadow } from '../../utils/appColors';

export default function index({navigation}) {
  const [zi, setZI] = useState("");

  const onSetClick = async () => {
    const value = zi;
    if (value) {
        navigation.navigate("Others")
        AlertHelper.show("success","Updated ZI Value")
    } else {
        AlertHelper.show("warn","Please enter valid input")
    }
  };

  const onChangeText = (text) => {
    setZI(text);
  };

  return (
    <ScrollView>
      <View
        style={{
          marginTop: scale(50),
          backgroundColor: appColors.white,
          ...shadow,
          padding: scale(15),
          borderRadius: scale(5),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Label
            text="Set ZI"
            style={{fontSize: scale(30), fontWeight: '700'}}
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={(text) => onChangeText(text)}
            keyboardType="default"
            placeholder="ZI value"
          />
        </View>
        <CustomButton onPress={() => onSetClick()} label="set ZI" />
      </View>
    </ScrollView>
  );
}
