import React,{useEffect} from 'react'
import { View, Text } from 'react-native'
import { listenToAskForConsent } from 'zeo-collect'

export default function index({navigation}) {
  const navigateHome = () => navigation.navigate("Home");
  const navigateConsent = () => navigation.navigate("Consent");
    useEffect(() => {
      listenToAskForConsent(navigateConsent);
      navigateHome();
      // askForConsent();
    }, []);

    return (
        <View style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <Text>Welcome to Zeotap</Text>
        </View>
    )
}
