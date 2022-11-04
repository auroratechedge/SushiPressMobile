import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {DrawerActions, NavigationContainer, useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import { Divider } from 'react-native-flex-layout';
import 'react-native-gesture-handler';
import Home from './Home';
import MenuAlaCarte from './MenuAlaCarte';
import { useDispatch } from "react-redux";
import { getItems, getListMenu } from '../store/actions/sushi';
import { useAppSelector } from '../store/storeConfiguration';
import { cloneDeep } from 'lodash';

type Items = {
  id: number,
  img: string,
  name: string,
  price: number,
  included: boolean,
}

const Menu = ({ navigation, route }: any) => {
  const Drawer = createDrawerNavigator();
  const dispatch: any = useDispatch()
  const { listMenu } = useAppSelector((state) => state.sushiReducer)
  const [selectedOption, setSelectedOption] = useState<boolean[]>(Array(listMenu.length).fill(false))

  useEffect(() => {
    const optionsTMP = selectedOption
    optionsTMP[0] = true
    setSelectedOption(optionsTMP)
  }, [listMenu])

  const handleOptionMenu = (item: any, index: number) => {
    const optionsTMP = Array(listMenu.length).fill(false)
    optionsTMP[index] = true
    setSelectedOption(optionsTMP)
    dispatch(getItems(item.id))
  }
  
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => (
        <View>
          <View style={{alignItems: 'center', width: '100%'}}>
            <Image
              source={require('./../assets/images/logo_nobg.png')}
              style={{width: 150, height: 150}}
            />
          </View>
          <View style={{alignContent: 'center'}}>
            {listMenu?.map((item: any, index: number) => (
              <DrawerItem
                key={item.id}
                label={item.category}
                labelStyle={{
                  fontSize: 20,
                  //width: '100%',
                  height: 30,
                  marginLeft: 40,
                }}
                style={{backgroundColor: selectedOption[index] ? '#D3CD00' : '#f5f5f5', borderRadius: 20 }}
                onPress={() => {
                  handleOptionMenu(item, index)
                  navigation.dispatch(DrawerActions.closeDrawer())
                }}
              />
            ))}
          </View>
          <Divider />
          <View style={{alignContent: 'center', flexDirection: 'row'}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 20,
                marginLeft: 20
              }}>
              Menu: 
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginLeft: 5
              }}>{route.params.name}</Text>
          </View>
          <TouchableHighlight onPress={() => navigation.goBack()}>
            <View style={{alignContent: 'center', flexDirection: 'row'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  fontSize: 20,
                  marginLeft: 20
                }}>
                GO BACK TO HOME 
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      )}>
      <Drawer.Screen name={route.params.name} component={MenuAlaCarte} />
    </Drawer.Navigator>
  );
};

export default Menu;
