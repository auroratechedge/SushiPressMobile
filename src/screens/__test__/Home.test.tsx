import React from 'react';
import Home from '../Home';
import { render, fireEvent, screen } from "@testing-library/react-native";
import { Provider } from 'react-redux';
import { store } from '../../store/storeConfiguration';

const mockDispatch = jest.fn();
// const mockSelector = jest.fn()

//questo serve per la presenza delle chiamate redux
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch
    // useSelector: () => mockSelector.mockReturnValueOnce(true)
}))

const setup = () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

beforeEach(() => {
  mockDispatch.mockClear()
  setup()
})

//test per capire quante volte viene chiamata la dispatch

describe('Home screen', () => {
    test("count all text element", async () => {
        const { getByText, getByTestId } = render(
            <Provider store={store}>
                <Home />
            </Provider>)
        getByTestId("counter-people")
        getByText("0")
    })
})

describe('Home screen', () => {
    test("add one people to order", async () => {
        const addPeopleButton = screen.getByTestId("counter-people-add")
        const boxCounterPeople = screen.getByTestId("counter-people")
        expect(boxCounterPeople.props.children).toBe(0);
        fireEvent.press(addPeopleButton)
        expect(boxCounterPeople.props.children).toBe(1);
    });
})

describe('Home screen', () => {
    test("add two people to order", async () => {
        const addPeopleButton = screen.getByTestId("counter-people-add")
        const boxCounterPeople = screen.getByTestId("counter-people")
        expect(boxCounterPeople.props.children).toBe(0);
        fireEvent.press(addPeopleButton)
        fireEvent.press(addPeopleButton)
        expect(boxCounterPeople.props.children).toBe(2);
    });
})

describe('Home screen', () => {
    test("remove one people to order after added one", async () => {
        const boxCounterPeople = screen.getByTestId("counter-people")
        const addPeopleButton = screen.getByTestId('counter-people-add')
        const removePeopleButton = screen.getByTestId('counter-people-remove')
        fireEvent.press(addPeopleButton)
        expect(boxCounterPeople.props.children).toBe(1);
        fireEvent.press(removePeopleButton)
        expect(boxCounterPeople.props.children).toBe(0);
    });
})

afterEach(() => {
})