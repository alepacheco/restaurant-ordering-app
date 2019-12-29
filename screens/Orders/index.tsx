import React, { useState, useEffect } from 'react';
import { Text, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { getUserOrders } from 'utils/network';
import { Order } from './Order';
import { Loading } from 'components/Loading';
import { Header } from 'components/Header';
import { useStoreActions, useStoreState } from 'store';

type Unpacked<T> = T extends Promise<infer U> ? U : T;

const Wrapper = styled.View`
  height: 100%;
  background-color: ${props => props.theme.contrast0_5};
`;

const OrderScroll = styled(FlatList)`
  background-color: ${props => props.theme.contrast0_5};
`;

export const Orders: React.FC<{}> = ({}) => {
  const setUserOrders = useStoreActions(actions => actions.user.setOrders);
  const userOrders = useStoreState(state => state.user.user.orders);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    (async () => {
      if (!userOrders) {
        const data = await getUserOrders();
        setUserOrders(data);
      }

      setRefreshing(false);
    })();
  }, [refreshing, setUserOrders, userOrders]);

  return (
    <Wrapper>
      <Header title="Orders" />
      <OrderScroll
        data={[].concat(userOrders).reverse()}
        onRefresh={async () => {
          setRefreshing(true);
          const data = await getUserOrders();
          setUserOrders(data);
          setRefreshing(false);
        }}
        refreshing={refreshing}
        keyExtractor={(item: any) => item && item._id}
        renderItem={({ item }: any) => <Order {...item}></Order>}
      />
    </Wrapper>
  );
};
