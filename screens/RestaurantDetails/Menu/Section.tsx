import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Item } from './Item';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  image: string;
}

const Title = styled.Text`
  margin: 12px 12px 34px;
  font-size: 32px;
`;

const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
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
          <View key={index}>
            {index === 0 ? <></> : <Separator />}
            <Item
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
