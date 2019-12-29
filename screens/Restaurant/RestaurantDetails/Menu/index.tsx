import React from 'react';
import { ScrollView } from 'react-native';
import { Section } from './Section';
import { MenuSection } from 'types/restaurant';

interface MenuOptions {
  menu: Array<MenuSection>;
  restaurantId: string;
}

export const Menu = ({ menu, restaurantId }: MenuOptions) => {
  return (
    <ScrollView>
      {menu.map(section => (
        <Section key={section._id} restaurantId={restaurantId} {...section} />
      ))}
    </ScrollView>
  );
};
