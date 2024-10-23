import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, NativeModules, StyleSheet, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { scale } from 'react-native-size-matters';
import Container from '../../components/Container';
import Label from '../../components/Label';
import ProductCard from '../../components/ProductCard';
import TitleComp from '../../components/TitleComp';
import { bestSellersList, categoriesList } from '../../utils/MockData';
import ReduxWrapper from '../../utils/ReduxWrapper';
import { appColors, shadow } from '../../utils/appColors';
import { setPageProperties, setEventProperties } from 'zeo-collect';

function Home({getProducts$, addToCart$,navigation}) {
  useEffect(() => {
  }, [])
  useFocusEffect(() => {
    setPageProperties({page: "Home Page"});
  });

  const RenderTitle = ({heading, rightLabel}) => {
    return <TitleComp heading={heading} rightLabel={rightLabel} />;
  };
  return (
    <Container isScrollable style={styles.container}>
      <View style={{paddingVertical: scale(30)}}>
        <RenderTitle heading="Categories" />
        <FlatList
          style={{marginTop: scale(40)}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={categoriesList}
          ItemSeparatorComponent={() => <View style={{padding: scale(10)}} />}
          renderItem={({item, index}) => {
            const {label, Icon} = item;
            return (
              <View key={index} style={{alignItems: 'center'}}>
                <TouchableRipple
                  onPress={() => {
                    setEventProperties("Category Selected", {selectedCategory: label});
                    getProducts$(label)
                    navigation.navigate('Category', {item})
                  }}
                  rippleColor={appColors.primary}
                  rippleContainerBorderRadius={scale(40)}
                  rippleDuration={800}
                  style={{
                    ...shadow,
                    backgroundColor: appColors.white,
                    height: scale(70),
                    width: scale(70),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: scale(40),
                  }}>
                  <Icon />
                </TouchableRipple>
                <View style={{marginTop: scale(15)}}>
                  <Label text={label} style={{fontSize: scale(14)}} />
                </View>
              </View>
            );
          }}
        />
      </View>
      <View>
        <View style={{paddingVertical: scale(25)}}>
          <RenderTitle heading="Best Selling" rightLabel="See All" />
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{padding: scale(10)}} />}
          horizontal
          data={bestSellersList}
          renderItem={({item, index}) => (
            <ProductCard navigation={navigation} item={item} />
          )}
        />
      </View>
    </Container>
  );
}
 
 export default ReduxWrapper(Home)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: appColors.primary,
    alignItems: 'center',
    borderBottomWidth: 12,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    padding: 20,
    margin: 20,
    textAlign: 'center',
  },
  TitleText: {
    fontSize: 25,
    // padding: 20,
    marginVertical: 20,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
