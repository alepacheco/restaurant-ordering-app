import React from 'react';
import renderer from 'react-test-renderer';
import { Theme } from '../components/Theme';
import { Settings } from '../screens/Settings';
jest.useFakeTimers();
describe('<Settings />', () => {
  it('renders correctly', async () => {
    let tree: null | renderer.ReactTestRenderer = null;

    await renderer.act(async () => {
      tree = renderer.create(
        <Theme>
          <Settings />
        </Theme>
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
