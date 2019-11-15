import React from 'react';
import { View } from 'react-native';
import { Section } from './Section';
import { MenuSection } from 'types/restaurant';

interface MenuOptions {
  menu: Array<MenuSection>;
}

export const Menu = ({ menu }: MenuOptions) => {
  const MenuList = menu.map((section, index) => {
    return (
      <View key={index}>
        <Section title={section.title} items={section.items} />
      </View>
    );
  });

  return <View>{MenuList}</View>;
};
