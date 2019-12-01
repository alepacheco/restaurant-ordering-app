import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  margin: 8px;
  padding: 12px;
  background-color: ${props => props.theme.contrast1};
  border-radius: 6px;

  display: flex;
  flex-direction: row;
`;

const Title = styled.Text`
  margin: 8px;
  padding: 12px;
  color: ${props => props.theme.textColor};
  font-weight: bold;
`;

const Total = styled.Text`
  margin: 8px;
  padding: 12px;
  color: ${props => props.theme.contrast6};
  font-weight: bold;
`;

const RestaurantImage = styled.Image`
  height: 64px;
  width: 64px;
  margin-left: auto;
  border-radius: 6px;
`;

interface OrderArguments {
  restaurantName: string;
  restaurantImageUrl: string;
  items: Array<{
    amount: number;
    name: string;
  }>;
  total: string;
}

export const Order: React.FC<OrderArguments> = ({
  restaurantName,
  restaurantImageUrl,
  items,
  total,
}) => {
  return (
    <Wrapper>
      <Title>{restaurantName}</Title>
      <Total>{total}</Total>
      <RestaurantImage source={{ uri: restaurantImageUrl }} />
    </Wrapper>
  );
};
