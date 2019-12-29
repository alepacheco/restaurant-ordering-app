import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useStoreActions, useStoreState } from 'store';
import { getPaymentMethods } from 'utils/network';
import { Card } from './Card';
import { Header } from 'components/Header';

const Wrapper = styled.View`
  background-color: ${props => props.theme.contrast0_5};
  height: 100%;
  padding-top: 34px;
`;

const AddCardText = styled.Text`
  color: ${props => props.theme.textColor};
  font-weight: bold;
  margin: auto;
  padding: 18px;
`;

const AddCardWrapper = styled.TouchableOpacity`
  background-color: ${props => props.theme.contrast1};
  font-weight: bold;
  margin: 18px 8px;
  border-radius: 6px;
`;

export const PaymentDetails: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const paymentMethods = useStoreState(state => state.user.user.paymentMethods);
  const setPaymentMethods = useStoreActions(
    actions => actions.user.setPaymentMethods
  );

  useEffect(() => {
    if (!paymentMethods) {
      getPaymentMethods().then(payments => setPaymentMethods(payments));
    }
  }, [paymentMethods, setPaymentMethods]);

  return (
    <Wrapper>
      <Header title="Payment options" />
      <ScrollView>
        {paymentMethods &&
          paymentMethods.map((paymentMethod, index) => (
            <Card
              key={index}
              last4={paymentMethod.card.last4}
              brand={paymentMethod.card.brand}
            />
          ))}
        <AddCardWrapper onPress={() => navigation.navigate('AddNewCard')}>
          <AddCardText>Add new card</AddCardText>
        </AddCardWrapper>
      </ScrollView>
    </Wrapper>
  );
};
