import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { getUserOrders } from 'utils/network';

const Wrapper = styled.View``;

const Header = styled.View``;

const OrderScroll = styled.ScrollView``;

export const Orders: React.FC<{}> = ({}) => {
  const [userOrders, setUserOrders] = useState([]);
  useEffect(() => {
    getUserOrders().then(data => setUserOrders(data));
  }, []);

  return (
    <Wrapper>
      <Header>
        <Text>Orders</Text>
      </Header>
      <OrderScroll>
        {userOrders.map((order, index) => (
          <Text key={index}>{JSON.stringify(order)}</Text>
        ))}
      </OrderScroll>
    </Wrapper>
  );
};
