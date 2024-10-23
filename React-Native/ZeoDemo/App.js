/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React ,{useEffect, useRef}from 'react';
import MainStack from './app/routing/MainStack';
import {Provider} from 'react-redux';
import {StatusBar, LogBox} from 'react-native';
import storePre from './app/redux/store';
import DropdownAlert, { DropdownAlertData } from 'react-native-dropdownalert';
import {AlertHelper} from './app/utils/AlertHelper';
import {PersistGate} from 'redux-persist/integration/react';
import TabNavigationStack from './app/routing/TabNavigationStack';
import {navigationTypeTabs} from './app.json';
import Feather from 'react-native-vector-icons/Feather'; 
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import {initialiseZeoCollect} from 'zeo-collect';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
 

Ionicons.loadFont()
FontAwesome.loadFont()
Feather.loadFont()
const App: () => React$Node = () => {
  const {persistor, store} = storePre;
  let alert = (_data: DropdownAlertData) => new Promise<DropdownAlertData>(res => res);
  let dismiss = useRef(() => {});
  // console.disableYellowBox = true
      useEffect(() => {
        LogBox.ignoreAllLogs();
        initialiseZeoCollect({"android_write_key":"1b19b1c2-dcfc-497e-8d86-8d38cd183c5b", "ios_write_key":"1b19b1c2-dcfc-497e-8d86-8d38cd183c5b", "batch_size": 15, "opt_out":false, "service_interval": 500, "user_country": "ind"})
        console.log('initialiseZeoCollect called');
      }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {navigationTypeTabs ? <TabNavigationStack/> : <MainStack />}
        <DropdownAlert
          defaultContainer={{
            padding: 8,
            paddingTop: StatusBar.currentHeight,
            flexDirection: 'row',
          }}
          ref={(ref) => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
        />
      </PersistGate>
    </Provider>
  );
};

export default App;
