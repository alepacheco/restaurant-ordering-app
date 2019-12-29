import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useStoreActions, useStoreState } from 'store';
import { getUserOrders } from 'utils/network';

const StyledView = styled.SafeAreaView`
  margin: 24px;
  display: flex;
  flex-direction: row;
`;

const StatBox = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const StatNumber = styled.Text`
  ${props => `color: ${props.theme.textColor};`}
  text-align: center;
  font-size: 32px;
`;

const StatLabel = styled.Text`
  text-align: center;
  font-size: 18px;
  color: gray;
`;

const onlyUnique = (value: any, index: number, self: Array<any>) =>
  self.indexOf(value) === index;

export const UserStats = () => {
  const setUserOrders = useStoreActions(actions => actions.user.setOrders);
  const userOrders = useStoreState(state => state.user.user.orders);

  useEffect(() => {
    if (!userOrders) {
      getUserOrders().then(data => setUserOrders(data));
    }
  }, [setUserOrders, userOrders]);

  return (
    <StyledView>
      <StatBox>
        <StatNumber>{userOrders ? userOrders.length : 0}</StatNumber>
        <StatLabel>Orders</StatLabel>
      </StatBox>
      <StatBox>
        <StatNumber>
          {userOrders
            ? userOrders.map(orders => orders.restaurantName).filter(onlyUnique)
                .length
            : 0}
        </StatNumber>
        <StatLabel>Venues</StatLabel>
      </StatBox>
    </StyledView>
  );
};
