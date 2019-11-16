import React from 'react';
import { View } from 'react-native';
import { Section } from './Section';
import { MenuSection } from 'types/restaurant';

interface MenuOptions {
  menu: Array<MenuSection>;
  restaurantId: string;
}

export const Menu = ({ menu, restaurantId }: MenuOptions) => {
  const MenuList = menu.map((section, index) => {
    return (
      <View key={index}>
        <Section
          title={section.title}
          items={section.items}
          restaurantId={restaurantId}
        />
      </View>
    );
  });

  return <View>{MenuList}</View>;
};
