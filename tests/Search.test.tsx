import React from 'react';
import renderer from 'react-test-renderer';
import { Search } from '../screens/Search';

jest.useFakeTimers();
jest.mock('react-navigation', () => ({
  withNavigation: (x: any) => x,
}));

jest.mock('react-native-maps', () => ({ children }: any) => <>{children}</>);

describe('<Search />', () => {
  it('renders correctly', async () => {
    let tree: null | renderer.ReactTestRenderer = null;

    await renderer.act(async () => {
      tree = renderer.create(<Search />);
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
