import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react-native";
import { Provider, useSelector } from 'react-redux';
import * as reactRedux from 'react-redux'
import { store } from '../../store/storeConfiguration';
import Cart from '../Cart';
import { createAction } from '@reduxjs/toolkit';
import { ScrollView } from 'react-native-gesture-handler';

const mockDispatch = jest.fn();
// const mockSelector = jest.fn()

//questo serve per la presenza delle chiamate redux
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch
    // useSelector: () => mockSelector.mockReturnValueOnce(true)
}))

import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

const setup = () => {
    render(
        <Provider store={store}>
            <ScrollView>
                <Cart route={{name: 'Cart', params: {name: "A la carte"}}}/>
            </ScrollView>
        </Provider>
    );
}
  
beforeEach(() => {
    setup()
})

describe('Cart screen', () => {
    test("count all text element", async () => {
        const props = {};

        const useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch');
        const mockDispatchFn = jest.fn();
        mockDispatchFn.mockReturnValue(
        [{ Cart }],
        );

        
    })
})

afterEach(() => {
});









//mocco gli elementi del carrello, per testare l'elimina mi creo anche la funzione dello splice
//altro testi vedo in base a gli elementi che ho inserito quanto fa il totale

//ci starebbe testare il drawer navigation