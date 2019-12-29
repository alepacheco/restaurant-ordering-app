import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Item from './Item';
import { MenuItem } from 'types/restaurant';

const Title = styled.Text`
  ${props => `color: ${props.theme.textColor};`}

  margin: 12px;
  font-size: 24px;
  font-weight: bold;
`;

const SectionWrapper = styled.View`
  margin: 24px 0;
`;

export const Section = ({
  title,
  items,
  restaurantId,
}: {
  title: string;
  items: Array<MenuItem>;
  restaurantId: string;
}) => {
  return (
    <SectionWrapper>
      <Title>{title}</Title>
      <View>
        {items.map((item, index) => (
          <Item
            key={index}
            _id={item._id}
            description={item.description}
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
            restaurantId={restaurantId}
          />
        ))}
      </View>
    </SectionWrapper>
  );
};
