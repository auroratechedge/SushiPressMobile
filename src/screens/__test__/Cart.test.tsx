import React from 'react';
import { render, fireEvent, screen } from "@testing-library/react-native";
import { Provider, useSelector } from 'react-redux';
import * as reactRedux from 'react-redux'
import { store } from '../../store/storeConfiguration';
import Cart from '../Cart';
import { createAction } from '@reduxjs/toolkit';



const mockMethod = jest.fn()



const setup = () => {
    render(
        <Cart route={{name: 'Cart'}}/>
    );
}
  
beforeEach(() => {
    setup()
})

describe('Cart screen', () => {
    test("count all text element", async () => {
        
    })
})

afterEach(() => {
});









//mocco gli elementi del carrello, per testare l'elimina mi creo anche la funzione dello splice
//altro testi vedo in base a gli elementi che ho inserito quanto fa il totale

//ci starebbe testare il drawer navigation