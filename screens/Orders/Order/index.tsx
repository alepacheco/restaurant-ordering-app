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
  color: ${props => props.theme.textColor};
  font-weight: bold;
`;

const Text = styled.Text`
  color: ${props => props.theme.contrast6};
  font-weight: bold;
`;

const RestaurantImage = styled.Image`
  height: 64px;
  width: 64px;
  margin-left: auto;
  border-radius: 6px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: column;
`;

interface OrderArguments {
  restaurantName: string;
  restaurantImageUrl: string;
  items: Array<{
    amount: number;
    name: string;
  }>;
  total: string;
  status: string;
  timestamp: string;
}

export const Order: React.FC<OrderArguments> = ({
  restaurantName,
  restaurantImageUrl,
  total,
  status,
  timestamp,
}) => {
  return (
    <Wrapper>
      <Row>
        <Title>{restaurantName}</Title>
        <Text>{total}$</Text>
        <Text>{status && status.replace(/^\w/, c => c.toUpperCase())}</Text>
        <Text>
          {new Date(timestamp).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </Row>

      <RestaurantImage source={{ uri: restaurantImageUrl }} />
    </Wrapper>
  );
};
