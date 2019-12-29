import React, { useState, useEffect } from 'react';
import { Text, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { getUserOrders } from 'utils/network';
import { Order } from './Order';
import { Loading } from 'components/Loading';
import { Header } from 'components/Header';

type Unpacked<T> = T extends Promise<infer U> ? U : T;

const Wrapper = styled.View`
  height: 100%;
  background-color: ${props => props.theme.contrast0_5};
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getUserOrders();
      setUserOrders(data);

      setLoading(false);
    })();
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Header title="Orders" />
      <OrderScroll
        data={userOrders}
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }: any) => <Order {...item}></Order>}
      />
    </Wrapper>
  );
};
