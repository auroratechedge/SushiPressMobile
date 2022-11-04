import {IconButton, Text, Button} from '@react-native-material/core';
import { cloneDeep } from 'lodash';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import 'react-native-gesture-handler';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppSelector} from '../store/storeConfiguration';

type Items = {
  id: number;
  img: string;
  name: string;
  price: number;
  included: boolean;
};

const MenuAlaCarte = ({route}: any) => {
  const {items} = useAppSelector(state => state.sushiReducer);
  const [quantity, setQuantity] = useState<any>(0)

  useEffect(() => {
    //creo un reducer per salvare le quantità quando cambio voce del menu
  }, [items])

  const handleAdd = () => {
    let counter = cloneDeep(quantity);
    counter = counter + 1;
    setQuantity(counter);
  };
  const handleRemove = () => {
    let counter = cloneDeep(quantity);
    if (counter > 0) {
      counter = counter - 1;
    }
    setQuantity(counter);
  };

  return (
    <ScrollView>
      {items?.map((item: Items, index: number) => (
        <View key={index} style={styles.container}>
          <View style={styles.containerPrice}>
            <Text>{route.name === 'A la carte' ? item.price + '€' : '0.00 €'}</Text>
          </View>
          <Image
            style={{width: '50%', height: '50%'}}
            source={{uri: item.img}}
          />
          <View style={styles.containerText}>
            <Text>{item.name}</Text>
          </View>
          <View style={styles.containerQuantity}>
            <Text style={{alignItems: 'center', marginTop: 5}}>
              QUANTITY
            </Text>
            <View style={styles.cardCounter}>
              <IconButton
                icon={<Icon name="plus" />}
                style={{borderRadius: 60, backgroundColor: '#D3CD00'}}
                onPress={handleAdd}
              />
              <Text style={styles.textPeople} >
                {quantity}
              </Text>
              <IconButton
                icon={<Icon name="minus" />}
                style={{borderRadius: 60, backgroundColor: '#D3CD00'}}
                onPress={handleRemove}
              />
            </View>
          </View>
          <View style={{marginTop: 40}}>
          <Button
            onPress={() => {}}
            title="Add to cart"
            color="#D3CD00"
            style={{width: 220}}
            accessibilityLabel="Learn more about this purple button"
          />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: 360,
    borderRadius: 30,
    marginLeft: 60,
    marginRight: 60,
    marginTop: 10,
    marginBottom: 50,
  },
  containerText: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: 280,
  },
  containerQuantity: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: 100,
    height: 50,
  },
  cardCounter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 100 / 2,
  },
  textPeople: {
    width: 70,
    height: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 3,
  },
  containerPrice: {
    backgroundColor: '#f5f5f5', 
    width: 50, 
    borderRadius: 20, 
    alignItems: 'center', 
    marginTop: 5,
    marginLeft: 190
  }
});

export default MenuAlaCarte;
