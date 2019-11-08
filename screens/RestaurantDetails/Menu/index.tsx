import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Section } from './Section';
import { Item } from './Item';

interface MenuItem {
  name: string;
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
    return <Section key={index} title={section.title} items={section.items} />;
  });

  return <View>{MenuList}</View>;
};
