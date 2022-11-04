import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {IconButton, Text} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import {cloneDeep} from 'lodash';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/storeConfiguration';
import { getItems, getListMenu } from '../store/actions/sushi';
const Home = ({ navigation } : any) => {
  const [counterPeople, setCounterPeople] = useState(0);
  const dispatch: any = useDispatch()
  const { listMenu } = useAppSelector((state) => state.sushiReducer)

  useEffect(() => {
    dispatch(getListMenu())
    dispatch(getItems(1))
  }, [dispatch])

  const handleAdd = () => {
    let counter = cloneDeep(counterPeople);
    counter = counter + 1;
    setCounterPeople(counter);
  };
  const handleRemove = () => {
    let counter = cloneDeep(counterPeople);
    if (counter > 0) {
      counter = counter - 1;
    }
    setCounterPeople(counter);
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.cardPeople}>
          <Image
            source={require('../assets/images/logo_nobg.png')}
            style={{width: 150, height: 150}}
          />
          <View style={styles.cardPeople}>
          <Text variant="h6" style={{alignItems: 'center'}}>
            PEOPLE
          </Text>
          <View style={styles.cardCounter}>
            <IconButton
              icon={<Icon name="plus" />}
              style={{borderRadius: 60, backgroundColor: '#D3CD00'}}
              onPress={handleAdd}
            />
            <Text style={styles.textPeople} variant="h6">
              {counterPeople}
            </Text>
            <IconButton
              icon={<Icon name="minus" />}
              style={{borderRadius: 60, backgroundColor: '#D3CD00'}}
              onPress={handleRemove}
            />
          </View>
        </View>
          <TouchableHighlight onPress={() => {
            navigation.navigate('Menu', {name: 'A la carte'})
            }}>
            <View style={styles.boxCard}>
              <View style={styles.circle}>
                <Image
                  source={require('./../assets/images/alacarte.png')}
                  style={{
                    width: 200,
                    height: 170,
                    borderTopLeftRadius: 100 / 5,
                    borderTopRightRadius: 100 / 5,
                  }}
                />
                <View style={styles.card}>
                  <Text>A la carte **</Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => {navigation.navigate('Menu', {name: 'All you can eat'})}}>
            <View style={styles.boxCard}>
              <View style={styles.circle}>
                <Image
                  source={require('./../assets/images/allyoucaneat.png')}
                  style={{
                    width: 200,
                    height: 170,
                    borderTopLeftRadius: 100 / 5,
                    borderTopRightRadius: 100 / 5,
                  }}
                />
                <View style={styles.card}>
                  <Text>All you can eat *</Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
    height: '100%',
  },
  card: {
    alignItems: 'center',
  },
  boxCard: {
    padding: 10,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100 / 5,
    backgroundColor: 'white',
  },
  cardPeople: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 100 / 2,
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
});

export default Home;