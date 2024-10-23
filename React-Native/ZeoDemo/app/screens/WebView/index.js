import React, {useRef, useEffect,  useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';
import CustomButton from '../../components/CustomButton';

export default function index({navigation}) {
  const webViewRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    webViewRef.current.reload();
    setValue(Math.random)
  }, [])
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <WebView 
        ref={(ref) => (webViewRef.current = ref)}
        source={{uri: `https://demosdk.zeotap.com/`}} />
        <CustomButton onPress={() => { webViewRef?.current?.reload(); }} label="Reload" />
      </SafeAreaView>
    </>
  );
}