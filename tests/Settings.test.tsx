import React from 'react';
import renderer from 'react-test-renderer';

import { Settings } from '../screens/Settings';

describe('<Settings />', () => {
  it('renders correctly', async () => {
    let tree: null | renderer.ReactTestRenderer = null;

    await renderer.act(async () => {
      tree = renderer.create(<Settings />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
