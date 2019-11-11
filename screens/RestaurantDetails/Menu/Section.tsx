import React from 'react';
import { View, Text, TabBarIOSItem } from 'react-native';
import styled from 'styled-components/native';
import Item from './Item';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: string;
  image_url?: string;
}

const Title = styled.Text`
  margin: 12px;
  font-size: 32px;
`;

const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const SeparatorWrapper = styled.View`
  display: flex;
  margin: 0 12px;
`;

const SectionSeparator = styled.View`
  height: 3px;
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
      <SectionSeparator />

      <View>
        {items.map((item, index) => (
          <View key={item.id}>
            {index === 0 ? (
              <></>
            ) : (
              <SeparatorWrapper>
                <Separator />
              </SeparatorWrapper>
            )}
            <Item
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image_url={item.image_url}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
