import React, { useState, useEffect } from 'react';
import { Text, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { getUserOrders } from 'utils/network';
import { Order } from './Order';

type Unpacked<T> = T extends Promise<infer U> ? U : T;

const Wrapper = styled.View`
  height: 100%;
  background-color: ${props => props.theme.contrast0_5};
`;

const Header = styled.View`
  margin-top: 38px;
`;

const HeaderText = styled.Text`
  color: ${props => props.theme.textColor};
  margin: 8px;
  font-weight: bold;
`;

const OrderScroll = styled(FlatList)`
  background-color: ${props => props.theme.contrast0_5};
`;

export const Orders: React.FC<{}> = ({}) => {
  const [userOrders, setUserOrders] = useState(
    [] as Unpacked<ReturnType<typeof getUserOrders>>
  );
  useEffect(() => {
    getUserOrders().then(data => setUserOrders(data));
  }, []);

  return (
    <Wrapper>
      <Header>
        <HeaderText>Orders</HeaderText>
      </Header>
      <OrderScroll
        data={userOrders}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }: any) => <Order {...item}></Order>}
      />
    </Wrapper>
  );
};
