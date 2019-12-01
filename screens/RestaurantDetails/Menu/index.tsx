import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Section } from './Section';
import { MenuSection } from 'types/restaurant';

const StyledFlatList = styled(FlatList)`
  background-color: ${props =>
    props.theme.colorScheme === 'light' ? 'white' : props.theme.contrast1};
`;
interface MenuOptions {
  menu: Array<MenuSection>;
  restaurantId: string;
}

export const Menu = ({ menu, restaurantId }: MenuOptions) => {
  return (
    <StyledFlatList
      initialNumToRender={2}
      data={menu}
      keyExtractor={(selection: any) => selection._id}
      renderItem={({ item }: { item: MenuSection } | any) => (
        <Section restaurantId={restaurantId} {...item} />
      )}
    />
  );
};
