import React, { useState } from 'react';
import { View, ScrollView, Text, Switch, FlatList, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { appColors, shadow } from '../../utils/appColors';
import Label from '../../components/Label';
import CustomButton from '../../components/CustomButton';
import { NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { updateConfigs } from '../../redux/configsAction';
import { setConsent } from 'zeo-collect';

function index({ configs, updateConfigs$, navigation }) {
  const [sdkConfig, setsdkConfig] = useState(configs);
  const consentKeyValue = [
    {
      key: "track",
      name:"Track"
    },
    {
      key: "identify",
      name:"Identify"
    },
    {
      key: "others",
      name:"Others"
    },
  ]
  const [consentConfig, setConsentConfig] = useState({
    hideGranularConsent: true,
        granularConsent: {
            others: true,
            track: true,
            identify: true
        },
        expiry: '365',
        brandConsent: {},
        agreeAllClicked: false,
        disagreeAllClicked: false,
        granularConsentClicked: false
  });
  const agreeAll = () => {
    setConsentConfig({
            hideGranularConsent: true,
            granularConsent : {
                others: true,
                track: true,
                identify: true
            },
            agreeAllClicked: true,
            disagreeAllClicked: false,
            granularConsentClicked: false
    });
  }

  const disagreeAll = () =>{
    setConsentConfig({
        hideGranularConsent: true,
        granularConsent : {
            others: false,
            track: false,
            identify: false
        },
        agreeAllClicked: false,
        disagreeAllClicked: true,
        granularConsentClicked: false
    });
  }
  const onGranularConsentChange = (name, value) => {
    setConsentConfig({...consentConfig, granularConsent : {...consentConfig.granularConsent, [name] : value}});
  }
  const setGranularConsent = () =>{
    setConsentConfig({
      ...consentConfig,
        hideGranularConsent: false,
        agreeAllClicked: false,
        disagreeAllClicked: false,
        granularConsentClicked: true
    });
  }

  const setConsentToSDK = () => {
    if (!sdkConfig.optout && sdkConfig.useConsent) {
      setConsent(consentConfig.granularConsent);
    }
    navigation.goBack();
  }

  const closeConsent = () => {
    navigation.goBack();
  }

  const ItemCard = ({item}) => {
    const {key, name} = item;
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemInnerContainer}>
          <Label text={name} />
          <Switch
        trackColor={{false: 'gray', true: 'teal'}}
        thumbColor="white"
        ios_backgroundColor="gray"
        onValueChange={(value) => onGranularConsentChange(key, value)}
        value={consentConfig.granularConsent[key]}
      />
        </View>
      </View>
    );
  };

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
            text="We value your privacy"
            style={{ fontSize: scale(20), fontWeight: '700' }}
          />
          <CustomButton onPress={closeConsent} label="x" style={styles.iconButton} labelStyle={styles.buttonLabel}/>
        </View>
        <View>
          <Text>
            Our SDK performs the task of identifying users, capturing events and etc.
            Agree All/Disagree All, shall activate/deactivate all these SDK functions.
            To provide granular consent to these SDK purposes Edit the below options.
          </Text>
        </View>
        <FlatList style={styles.flatlistContainer}
        data={consentKeyValue}
        showsVerticalScrollIndicator={false}
        renderItem={ ({item, index}) => <ItemCard key={index} item={item} />}
      />
      <View style={styles.optionButtons}>
      <CustomButton onPress={agreeAll} label="AGREE ALL" style={styles.optionButton} labelStyle={styles.buttonLabel}/>
        <CustomButton onPress={disagreeAll} label="DISAGREE ALL" style={styles.optionButton} labelStyle={styles.buttonLabel}/>
      </View>
      <CustomButton onPress={setConsentToSDK} label="Save & Exit" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingVertical: scale(15),
  },
  iconButton: {
    height: scale(23),
      backgroundColor: appColors.lightGray,
      borderRadius: scale(25),
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
      marginVertical: scale(5),
      paddingHorizontal: scale(7),
  },
  optionButton:{
      height: scale(25),
      backgroundColor: appColors.darkGray,
      borderRadius: scale(5),
      justifyContent: 'space-evenly',
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
      marginVertical: scale(5),
      paddingHorizontal: scale(10),
  },
  buttonLabel: {
      fontSize: scale(12),
      fontWeight: '300',
      color: appColors.white,
      letterSpacing: scale(2),
  },
  optionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    justifyContent: 'space-evenly',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: scale(8),
  },
  itemInnerContainer: {
    flex: 1,

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const mapStateToProps = (state) => ({
  configs: state.configs.configs
});
const mapDispatchToProps = {
  updateConfigs$: updateConfigs,
};
export default connect(mapStateToProps, mapDispatchToProps)(index);