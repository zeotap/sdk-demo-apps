import React, { useState } from 'react';
import { NativeModules, Pressable, View, ScrollView } from 'react-native';
import { scale } from 'react-native-size-matters';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Label from '../../components/Label';
import { AlertHelper } from '../../utils/AlertHelper';
import { appColors, shadow } from '../../utils/appColors';
import CheckBox from '@react-native-community/checkbox';
import { setEventNameProperties, setUserIdentities, setPageProperties } from 'zeo-collect';
export let customIdentifierInput = {};

export default function index({navigation}) {
  const [credentials, setCredentials] = useState({});
  const [oldCellConfig, setOldCellConfig] = useState(false);

  const onLogin = async (ishashed = false, useOldCellConfig = false) => {
    const {email, cc, loginid, cellno, password} = credentials;
    if((!!email || !!loginid || !!cellno ) && !!password) {
      setEventNameProperties('Login Clicked');
      let userProp = {};
      userProp = {
        ...(!!email ? {email: email} : {}),
        ...(!!loginid ? {loginid: loginid} : {}),
        ...(!!cellno && !!cc ? {cellno_cc: cc + cellno} : {}),
        ...(!!cellno && !cc ? {cellno: cellno} : {})
      };

      const length =  Object.getOwnPropertyNames(customIdentifierInput).length;

      if(length%2!=0){
        AlertHelper.show("warn","Add both key and value")
        return
      }

      for (let i = 0; i < length/2 ; i++) {
        if (customIdentifierInput.hasOwnProperty(i+'_1') && customIdentifierInput.hasOwnProperty(i+'_2')) {
          userProp = {...userProp, [customIdentifierInput[i+'_1']] : customIdentifierInput[i+'_2'] }
        }
      }
      setUserIdentities(userProp, (data) => {
        console.log("User Identities updated", data);
      });
      AlertHelper.show("success","Welcome to Zeotap")
      setPageProperties({screen: "home"});
      navigation.navigate("Home")
    } else {
      AlertHelper.show("warn","Please enter atleast one Email or Phone No or User Name")
    }
  };

  const onChangeText = (name, text) => {
    setCredentials({...credentials, [name]: text});
  };


  const CustomView = ({ index, onChange }) => {
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
  
    const handleInputChange1 = (key) => {
      setInputValue1(key);
      onChange(index, 1, key);
    }

    const handleInputChange2 = (value) => {
      setInputValue2(value);
      onChange(index, 2, value);
    }

    return (
      <View style={{
        paddingVertical: scale(10),
        flexDirection: 'row',
        alignItems: 'flex-end',
        }}>
        <View style={{paddingVertical: scale(10), flex: 4}}>
        <CustomInput
          onChangeText={(key) => handleInputChange1(key)}
          keyboardType="default"
          placeholder="Custom Key"
        />
      </View>
      <View style={{paddingVertical: scale(10), paddingHorizontal: scale(10), flex: 4}}>
        <CustomInput
          onChangeText={(value) => handleInputChange2(value)}
          keyboardType="default"
          placeholder="Custom Value"
        />
      </View>
      </View>
    );
  };


  const CustomIdentifierComp = () => {
    const [customViews, setCustomViews] = useState([]);
    const [customIdentifiers, setInputValues] = useState({});
  
    const handleButtonPress = () => {

    const newCustomView = <CustomView key={customViews.length} index={customViews.length} onChange={handleInputChange} />;
    setCustomViews([...customViews, newCustomView]);
    }
  
    const handleInputChange = (index, inputNumber, value) => {
        customIdentifierInput = ({ ...customIdentifierInput, [index + '_' + inputNumber]: value });
    }

    return (
      <View>
        {customViews}
        <CustomButton onPress={handleButtonPress} label="Add Custom Identifer" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View
        style={{
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
            text="Welcome,"
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
            onChangeText={(text) => onChangeText('loginid', text)}
            keyboardType="default"
            placeholder="User Name/ Login Id"
          />
        </View>
        <View style={{
          paddingVertical: scale(10),
          flexDirection: 'row',
          alignItems: 'flex-end',
          }}>
          <View style={{paddingVertical: scale(10), flex: 1}}>
          <CustomInput
            onChangeText={(text) => onChangeText('cc', text)}
            keyboardType="phone-pad"
            placeholder="91"
          />
        </View>
        <View style={{paddingVertical: scale(10), paddingHorizontal: scale(10), flex: 4}}>
          <CustomInput
            onChangeText={(text) => onChangeText('cellno', text)}
            keyboardType="phone-pad"
            placeholder="Phone No Input"
          />
        </View>
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={(text) => onChangeText('email', text)}
            keyboardType="email-address"
            placeholder="john@doe.com"
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={(text) => onChangeText('password', text)}
            secureTextEntry
            placeholder="Password"
            // value="*******"
          />
        </View>


        <View style={{paddingVertical: scale(10)}}>
            <CustomIdentifierComp/>
        </View>

        {/* <Pressable
          onPress={() => navigation.navigate('Configs')}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingVertical: scale(10),
          }}>
          <Label
            text="Forgot password"
            style={{
              fontSize: scale(14),
              // fontWeight: '500',
            }}
          />
        </Pressable> */}
        <View style={{
          paddingVertical: scale(10),
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}>
          </View>
        <CustomButton onPress={() => onLogin(false, oldCellConfig)} label="Sign in" />
      </View>

    </ScrollView>
  );
}
