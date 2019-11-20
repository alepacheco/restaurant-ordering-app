import React from 'react';
import { View, FlatList } from 'react-native';
import { Section } from './Section';
import { MenuSection } from 'types/restaurant';

interface MenuOptions {
  menu: Array<MenuSection>;
  restaurantId: string;
}

export const Menu = ({ menu, restaurantId }: MenuOptions) => {
  return (
    <View>
      <FlatList
        initialNumToRender={2}
        data={menu}
        keyExtractor={(selection: any) => selection._id}
        renderItem={({ item }: { item: MenuSection }) => (
          <Section restaurantId={restaurantId} {...item} />
        )}
      />
    </View>
  );
};
