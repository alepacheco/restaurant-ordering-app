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
  flex: 1;
  color: ${props => props.theme.textColor};
  font-weight: bold;
`;

const Text = styled.Text`
  margin: auto;
  color: ${props => props.theme.contrast6};
  font-weight: bold;
  flex: 1;
  text-align: center;
`;

const TextRight = styled.Text`
  margin-right: 18px;
  color: ${props => props.theme.contrast6};
  font-weight: bold;
  flex: 1;
  text-align: right;
`;

const RestaurantImage = styled.Image`
  height: 64px;
  width: 64px;
  margin-left: auto;
  border-radius: 6px;
`;

const Column = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Row = styled.View`
  flex: 1;

  display: flex;
  flex-direction: row;
`;

const StatusBadge = styled.View`
  margin: 12px;
  flex: 1;
  display: flex;
  align-items: center;
  border-radius: 16px;
  background-color: ${props => props.theme.contrast2};
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
      <Column>
        <Row>
          <Title>{restaurantName}</Title>
          <TextRight>{total}$</TextRight>
        </Row>

        <Row>
          <StatusBadge>
            <Text>{status && status.replace(/^\w/, c => c.toUpperCase())}</Text>
          </StatusBadge>
          <TextRight>
            {new Date(timestamp).toLocaleDateString('en-US')}
          </TextRight>
        </Row>
      </Column>

      <RestaurantImage source={{ uri: restaurantImageUrl }} />
    </Wrapper>
  );
};
