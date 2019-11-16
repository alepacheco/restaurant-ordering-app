import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Item from './Item';
import { MenuItem } from 'types/restaurant';

const Title = styled.Text`
  ${props => `color: ${props.theme.textColor};`}

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
  restaurantId,
}: {
  title: string;
  items: Array<MenuItem>;
  restaurantId: string;
}) => {
  return (
    <View>
      <Title>{title}</Title>
      <SectionSeparator />

      <View>
        {items.map((item, index) => (
          <View key={index}>
            {index === 0 ? (
              <></>
            ) : (
              <SeparatorWrapper>
                <Separator />
              </SeparatorWrapper>
            )}
            <Item
              _id={item._id}
              description={item.description}
              imageUrl={item.imageUrl}
              name={item.name}
              price={item.price}
              restaurantId={restaurantId}
            />
          </View>
        ))}
      </View>
    </View>
  );
};
