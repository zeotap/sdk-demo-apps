import React, { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import { setEventProperties } from 'zeo-collect';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Label from '../../components/Label';
import { AlertHelper } from '../../utils/AlertHelper';
import { appColors, shadow } from '../../utils/appColors';
export default function index({navigation}) {
  const [userInfo, setUserInfo] = useState({});
  const onChnage = (name, text) => {
    setUserInfo({...userInfo, [name]: text});
  };

  const onSignUp =async () => {
    const {email,password}=userInfo
    setEventProperties('SuccessFul User sign up');
    AlertHelper.show("success", "Signup Success, Welcome to ZeoDemo")
    navigation.navigate("Home")
  };
  return (
    <ScrollView>
      <View
        style={{
          marginTop: scale(70),
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
            text="Sign Up"
            style={{fontSize: scale(30), fontWeight: '700'}}
          />
        </View>
        <View style={{paddingVertical: scale(15)}}>
          <Label
            text="Sign in to Continue"
            style={{
              fontSize: scale(16),
              //fontWeight: '500',
              color: appColors.darkGray,
            }}
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={(text) => onChnage('name', text)}
            label="Name"
            placeholder="Name"
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={(text) => onChnage('email', text)}
            keyboardType="email-address"
            label="Email"
            placeholder="john@doe.com"
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={(text) => onChnage('password', text)}
            secureTextEntry
            label="Password"
            placeholder="Password"
          />
        </View>
        <CustomButton onPress={onSignUp} label="Sign up" />
      </View>
    </ScrollView>
  );
}
