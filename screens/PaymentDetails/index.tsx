import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useStoreActions, useStoreState } from 'store';
import { getPaymentMethods } from 'utils/network';
import { Card } from './Card';

const Wrapper = styled.View`
  background-color: ${props => props.theme.contrast0_5};
  height: 100%;
  padding-top: 34px;
`;

const Title = styled.Text`
  color: ${props => props.theme.textColor};
  font-weight: bold;
  margin: 18px 0 12px 12px;
  font-size: 24px;
`;

const AddCardText = styled.Text`
  color: ${props => props.theme.textColor};
  font-weight: bold;
`;

const AddCardButton = () => {
  return <AddCardText>Add new card</AddCardText>;
};

export const PaymentDetails: React.FC<{}> = () => {
  const paymentMethods = useStoreState(state => state.user.user.paymentMethods);
  const setPaymentMethods = useStoreActions(
    actions => actions.user.setPaymentMethods
  );

  useEffect(() => {
    if (!paymentMethods) {
      getPaymentMethods().then(payments => setPaymentMethods(payments));
    }
  }, [paymentMethods, setPaymentMethods]);

  console.log({ paymentMethods });

  return (
    <Wrapper>
      <Title>Payment options</Title>
      {paymentMethods &&
        paymentMethods.map(paymentMethod => {
          return (
            <Card
              key={paymentMethod.card.fingerprint}
              last4={paymentMethod.card.last4}
              brand={paymentMethod.card.brand}
            />
          );
        })}
      <AddCardButton />
    </Wrapper>
  );
};
