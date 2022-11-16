import {IconButton, Text, Button} from '@react-native-material/core';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppSelector} from '../store/storeConfiguration';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {addToCart} from '../store/actions/sushi';

const Cart = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const { cart, people } = useAppSelector(state => state.sushiReducer);
  const [totalALaCarte, setTotalALaCarte] = useState<number>(0)
  const [totalAllYouCanEat, setTotalAllYouCanEat] = useState<number>(0)
  const priceAllYouCanEat = 12.90

  useEffect(() => {
    console.debug("route: ", route)
  }, [route])

  useEffect(() => {
    console.debug('cart: ', cart);
    if (route.params.name === "A la carte") {
      let total = 0
      cart.map((el: any) => {
        total += el.price * el.quantity
      })
      setTotalALaCarte(total)
    } else {
      setTotalAllYouCanEat((priceAllYouCanEat * people))
    }
    
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
    <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <IconButton
          icon={<Icon name="arrow-left" size={20} />}
          //style={{borderRadius: 60, backgroundColor: '#D3CD00'}}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerLabel}>{route.name}</Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 10}}>
        {cart.length > 0 ? (
          cart?.map((element: any) => (
            <View key={element.id} style={styles.itemContainer}>
              <View style={styles.containerTrashBtn}>
                <IconButton
                  icon={<Icon name="trash-o" size={30} color={'red'} />}
                  //style={{borderRadius: 60, backgroundColor: '#D3CD00'}}
                  onPress={() => handleDelete(element.id)}
                />
              </View>
              <Image
                style={{width: '50%', height: '50%'}}
                source={{uri: element.img}}
              />
              <Text>{element.name}</Text>
              <Text>
                {element.quantity}X{route.params.name === "A la carte" ? element.price : 0.00} €
              </Text>
            </View>
          ))
        ) : (
          <Text>Cart is empty</Text>
        )}
      </View>
      <View style={styles.containerTotalOrder}>
        <Text>Total order: {route.params.name === "A la carte" ? totalALaCarte : totalAllYouCanEat} €</Text>
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
    //alignItems: 'center',
  },
  headerLabel: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  itemContainer: {
    width: '90%',
    height: 220,
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 10,
  },
  containerTrashBtn: {
    backgroundColor: '#f5f5f5',
    width: 50,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 290,
  },
  containerTotalOrder: {
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 20
  }
});

export default Cart;
