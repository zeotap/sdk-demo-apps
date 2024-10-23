import React, { useState } from 'react';
import { FlatList, Pressable, ScrollView, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { connect } from 'react-redux';
import { setUserProperties } from 'zeo-collect';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import Label from '../../components/Label';
import { updatePreference } from '../../redux/configsAction';
import { AlertHelper } from '../../utils/AlertHelper';
import { defaultPreference } from '../../utils/MockData';
import { appColors, shadow } from '../../utils/appColors';

const colorCode = [
    {
        name: "Red",
        code: "#FF0000"
    },
    {
        name: "Cyan",
        code: "#00FFFF"
    },
    {
        name: "DarkBlue",
        code: "#00008B"
    },
    {
        name: "Purple",
        code: "#800080"
    },
    {
        name: "Green",
        code: "#008000"
    },
    {
        name: "Primary",
        code: appColors.primary,
    },
];

function index({ preference, updatePreference$, navigation }) {
  const [newPreference, setNewPreference] = useState({ ...defaultPreference, ...preference });

  const onUpdatePreference = async () => {
    const { displayName, iconColor, age } = newPreference;
    updatePreference$({ ...newPreference });
    setUserProperties({display_name: displayName, icon_color: iconColor, age: age});
    AlertHelper.show("success","Updated preference");
    navigation.navigate("Others");
  };

  const onChangeText = (name, text) => {
    setNewPreference({ ...newPreference, [name]: text });
  };

  const ItemCard = ({item, isSelected}) => {
    const {name, code} = item;
    return (
      <Pressable onPress={() =>{onChangeText('iconColor', code)}} style={{}}>
        <View style={[{ 
            backgroundColor: code, 
            margin: scale(15),
            padding: scale(15),
            borderRadius: 10,
            height: scale(50),
            width: scale(50) }, isSelected ? {borderColor: '#000', borderRadius: 20, borderWidth: 5, shadowColor: '#000', shadowRadius: 30, shadowOpacity: 1,}: {}]}>
        </View>
      </Pressable>
    );
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
            text="Update Preference"
            style={{ fontSize: scale(20), fontWeight: '700' }}
          />
        </View>
        <View style={{ paddingVertical: scale(10) }}>
          <CustomInput
            onChangeText={(text) => onChangeText('displayName', text)}
            value={newPreference.displayName}
            label="Display Name"
            placeholder="Enter here"
          />
        </View>
        <View style={{ paddingVertical: scale(10) }}>
          <CustomInput
            onChangeText={(text) => onChangeText('age', text)}
            value={newPreference.age}
            label="Age"
            placeholder="Enter here"
          />
        </View>
        <View style={{ paddingVertical: scale(10) }}>
        <FlatList
        contentContainerStyle={{flexDirection : "row", flexWrap : "wrap"}} 
        data={colorCode}
        renderItem={ ({item, index}) => <ItemCard key={index} item={item} isSelected={newPreference.iconColor == item.code} />}
      />
        </View>
        <CustomButton onPress={onUpdatePreference} label="Update Preference" />
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => ({
  preference: state.configs.preference
});
const mapDispatchToProps = {
    updatePreference$: updatePreference,
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
