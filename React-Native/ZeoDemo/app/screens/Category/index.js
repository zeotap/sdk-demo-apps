import React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import Label from '../../components/Label';
import ProductCard from '../../components/ProductCard';
import TitleComp from '../../components/TitleComp';
import {productsList} from '../../utils/MockData';
import Feather from 'react-native-vector-icons/Feather';
import {appColors} from '../../utils/appColors';
import BottomButtons from '../../components/BottomButtons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ReduxWrapper from '../../utils/ReduxWrapper';
import { NativeModules } from 'react-native';

function index({productList,navigation, route: {params}}) {
  console.warn({productList});
  const _renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: scale(20),
        }}>

        <Label
          text={params.item.label}
          style={{fontWeight: '500', fontSize: scale(22)}}
        />

        <View
          style={{
            height: scale(45),
            width: scale(45),
            backgroundColor: appColors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale(25),
          }}>
          <Feather name="search" size={scale(20)} color={appColors.white} />
        </View>
      </View>
    );
  };
  const BrandCard = ({item}) => {
    const {label,icon, products} =item
    return (
      <View style={{  borderRadius:scale(5), backgroundColor:appColors.white, flexDirection:"row", paddingHorizontal:scale(20),paddingVertical:scale(20)}}>
        <View style={{marginRight:scale(10), backgroundColor:appColors.black,height:scale(40), width:scale(40), justifyContent:'center', alignItems:'center', borderRadius:scale(20) }}>
            <Ionicons name={icon} size={scale(25)} color={appColors.white} />
        </View>
        <View>
          <Label text={label}  style={{fontSize:scale(18), fontWeight:"600"}}/> 
          <Label text={products} style={{fontSize:scale(14), opacity:scale(.4),marginTop:scale(5)}}/>
        </View>
      </View>
    );
  };
  return (
    <>
      <Container isScrollable>
        {_renderHeader()}
        <View style={{flex: 1, marginBottom:scale(50),   alignItems:'center'}}>
          <FlatList 
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={()=> <View style={{padding:scale(10) }} />}
            numColumns={2}
            data={productsList[params.item.id]}
            renderItem={({item, index}) => (
              <ProductCard
                key={index}
                navigation={navigation}
                item={{...item, isNew: index < 1}}
              />
            )}
          />
        </View>
      </Container>
    </>
  );
}
export default ReduxWrapper(index)