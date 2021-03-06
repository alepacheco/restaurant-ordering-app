/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import { RestaurantList } from '../screens/RestaurantList';
import { Theme } from '../components/Theme';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { StoreProvider } from 'easy-peasy';
import { store } from 'store';

jest.useFakeTimers();

jest.mock('react-navigation', () => ({
  withNavigation: (Component: any) => (...args: any) => (
    <Component {...args} navigation={{ navigate: () => {} }} />
  ),
}));

jest.mock('axios', () => ({
  get: jest.fn(),
}));
jest.mock('react-native-appearance');
jest.mock('expo-permissions', () => ({
  askAsync: () => ({ status: 'granted' }),
}));
jest.mock('expo-location', () => ({
  getCurrentPositionAsync: () => ({
    coords: {
      longitude: 3,
      latitude: 3,
    },
  }),
}));

useColorScheme.mockImplementation(() => 'light');

// @ts-ignore
AppearanceProvider.mockImplementation(({ children }) => children);

describe('<RestaurantList />', () => {
  it('renders correctly while empty', async () => {
    let tree: null | renderer.ReactTestRenderer = null;

    // @ts-ignore
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [],
      })
    );

    tree = renderer.create(
      <Theme>
        <StoreProvider store={store}>
          <RestaurantList />
        </StoreProvider>
      </Theme>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly whith data', async () => {
    let tree: null | renderer.ReactTestRenderer = null;

    // @ts-ignore
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            _id: '1',
            name: `McDonalds`,
            bannerImgUrl: 'https://picsum.photos/84/84',
            description: 'This is the restaurant description',
          },
          {
            _id: '2',
            name: `McDonalds 2`,
            bannerImgUrl: 'https://picsum.photos/84/84',
            description: 'This is the restaurant description 2',
          },
        ],
      })
    );

    await renderer.act(async () => {
      tree = renderer.create(
        <Theme>
          <StoreProvider store={store}>
            <RestaurantList />
          </StoreProvider>
        </Theme>
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
