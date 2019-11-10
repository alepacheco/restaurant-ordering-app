import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';
jest.useFakeTimers();
import { RestaurantList } from '../screens/RestaurantList';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

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

describe('<RestaurantList />', () => {
  it('renders correctly while empty', async () => {
    let tree: null | renderer.ReactTestRenderer = null;

    // @ts-ignore
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [],
      })
    );

    await renderer.act(async () => {
      tree = renderer.create(
        <RestaurantList navigation={{ navigate: () => {} }} />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly whith data', async () => {
    let tree: null | renderer.ReactTestRenderer = null;

    // @ts-ignore
    axios.get.mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            id: '1',
            title: `McDonalds`,
            image_url: 'https://picsum.photos/84/84',
            description: 'This is the restaurant description',
          },
          {
            id: '2',
            title: `McDonalds 2`,
            image_url: 'https://picsum.photos/84/84',
            description: 'This is the restaurant description 2',
          },
        ],
      })
    );

    await renderer.act(async () => {
      tree = renderer.create(
        <RestaurantList navigation={{ navigate: () => {} }} />
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
