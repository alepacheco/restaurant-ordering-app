import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Section } from './Section';

interface MenuItem {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
  price: string;
  image: string;
}
interface MenuOptions {
  menu: Array<{
    title: string;
    items: Array<MenuItem>;
  }>;
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
