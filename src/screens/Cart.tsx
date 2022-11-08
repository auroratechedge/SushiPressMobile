import {IconButton, Text, Button} from '@react-native-material/core';
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppSelector} from '../store/storeConfiguration';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {addToCart} from '../store/actions/sushi';

const Cart = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const {cart} = useAppSelector(state => state.sushiReducer);

  useEffect(() => {
    console.debug('cart: ', cart);
  }, [cart]);

  const handleDelete = (itemId: string) => {
    dispatch(
      addToCart(
        cart.find((el: any) => el.id === itemId),
        'delete',
      ),
    );
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <IconButton
          icon={<Icon name="arrow-left" />}
          //style={{borderRadius: 60, backgroundColor: '#D3CD00'}}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerLabel}>Cart</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 10}}>
        {cart.length > 0 ? (
          cart?.map((element: any) => (
            <View key={element.id} style={styles.itemContainer}>
              <Image
                style={{width: '50%', height: '50%'}}
                source={{uri: element.img}}
              />
              <Text>{element.name}</Text>
              <Text>
                {element.quantity}X{element.price} €
              </Text>
              <Button
                onPress={() => handleDelete(element.id)}
                title="Delete"
                color="#D3CD00"
                style={{width: 220}}
              />
            </View>
          ))
        ) : (
          <Text>Cart is empty</Text>
        )}
      </View>
      <View style={{alignItems: 'center'}}>
        <Button
          onPress={() => {}}
          title="Send order"
          color="#D3CD00"
          style={{width: 220}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLabel: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  itemContainer: {
    width: '90%',
    height: 180,
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Cart;
