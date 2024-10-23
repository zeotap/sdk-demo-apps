import React from 'react';
import { FlatList, NativeModules, Pressable, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import { connect } from 'react-redux';
import { unsetUserIdentities } from 'zeo-collect';
import AvatarImage from '../../components/AvatarImage';
import Container from '../../components/Container';
import Label from '../../components/Label';
import { AlertHelper } from '../../utils/AlertHelper';
import { appColors } from '../../utils/appColors';
import { defaultPreference, otherKeys } from '../../utils/MockData';

function index({preference, navigation}) {

  const unsetIdentities = () => {
    unsetUserIdentities();
    AlertHelper.show("success","User Identities are cleared");
  }

  const displayGDPRConsentScreen = () => {
    NativeModules.RelaunchModule.displayGDPRConsentScreen();
  }

  const ItemCard = ({item}) => {
    const {lebel, icon,route} = item;
    return (
      <Pressable onPress={() =>{
        lebel == "Unset UserIdentities" && unsetIdentities()
        lebel == "Privacy Policy" && displayGDPRConsentScreen()
        route && navigation.navigate(route)
        }} style={styles.itemContainer}>
        <View style={styles.tabContainer}>
          <Pressable style={styles.iconContainer}>
            <Feather name={icon} size={scale(22)} color={appColors.black} />
          </Pressable>
          <View style={styles.itemInnerContainer}>
            <Label text={lebel} />
            <Feather name={"chevron-right"} size={scale(18)} />
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <Container>
        <View style={{paddingVertical:scale(20), flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
            <AvatarImage  size={scale(110)} style={[preference?.iconColor ? {backgroundColor: preference.iconColor}: {backgroundColor: appColors.primary}]}/>
            <View style={{marginLeft:scale(20)}}> 
                <Label text={preference?.displayName ? preference.displayName : defaultPreference.displayName} style={{fontSize:scale(28)}} />
            </View>
        </View>
      <FlatList
        data={otherKeys}
        showsVerticalScrollIndicator={false}
        renderItem={ ({item, index}) => <ItemCard key={index} item={item} />}
      />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  preference: state.configs.preference
});
const mapDispatchToProps = { 
};

export default connect(mapStateToProps, mapDispatchToProps)(index);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  itemInnerContainer: {
    flex: 1,

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    borderRadius: scale(5),
    padding: scale(10),
    marginRight: scale(20),
    backgroundColor: appColors.lightGreen,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(20),
  }
});
