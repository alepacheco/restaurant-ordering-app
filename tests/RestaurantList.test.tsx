import React from 'react';
import renderer from 'react-test-renderer';

import { RestaurantList } from '../screens/RestaurantList';

describe('<RestaurantList />', () => {
  it('renders correctly', async () => {
    let tree: null | renderer.ReactTestRenderer = null;

    await renderer.act(async () => {
      tree = renderer.create(<RestaurantList />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
