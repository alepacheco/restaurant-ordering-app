import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Item } from './Item';

interface MenuItem {
  name: string;
  description?: string;
  price: string;
  image: string;
}

const Title = styled.Text`
  margin: 12px 12px 34px;
  font-size: 32px;
`;

export const Section = ({
  title,
  items,
}: {
  title: string;
  items: Array<MenuItem>;
}) => {
  return (
    <View>
      <Title>{title}</Title>
      <View>
        {items.map((item, index) => (
          <Item
            key={index}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </View>
    </View>
  );
};
