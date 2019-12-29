import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { TextInput } from 'components/Forms/TextInput';
import { Header } from 'components/Header';
import { savePaymentMethods } from 'utils/network';
import { useStoreActions } from 'store';
import { getPaymentMethods } from 'utils/network';
import { WideButton } from 'components/Button/WideButton';

const Wrapper = styled.SafeAreaView`
  background-color: ${props => props.theme.contrast0};
  height: 100%;
`;

const AddButtonWrapper = styled.TouchableOpacity`
  margin: 32px 16px;
  padding: 12px;
  background-color: ${props => props.theme.contrast2};
  border-radius: 6px;
`;

const AddButtonText = styled.Text`
  text-align: center;
  color: ${props => props.theme.contrast9};
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

const Space = styled.View`
  height: 35px;
`;

const AddButton: React.FC<{ onPress: any }> = ({ onPress }) => {
  return (
    <AddButtonWrapper onPress={onPress}>
      <AddButtonText>Add card</AddButtonText>
    </AddButtonWrapper>
  );
};

export const AddNewCard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const setPaymentMethods = useStoreActions(
    actions => actions.user.setPaymentMethods
  );

  const [cardNumber, setCardNumber] = useState();
  const [expMonth, setExpMonth] = useState();
  const [expYear, setExpiryYear] = useState();
  const [cvc, setCvc] = useState();

  return (
    <Wrapper>
      <Header title="Add new card" />
      <Space />
      <TextInput
        placeholder="Card Number"
        keyboardType="number-pad"
        autoCompleteType="cc-number"
        enablesReturnKeyAutomatically
        onChangeText={text => setCardNumber(text)}
        value={cardNumber}
        autoCapitalize="none"
        autoCorrect={false}
        blurOnSubmit
        maxLength={16}
      />

      <Row>
        <TextInput
          placeholder="Month"
          keyboardType="number-pad"
          autoCompleteType="cc-exp-month"
          enablesReturnKeyAutomatically
          onChangeText={text => setExpMonth(text)}
          value={expMonth}
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit
          maxLength={2}
        />

        <TextInput
          keyboardType="number-pad"
          autoCompleteType="cc-exp-year"
          enablesReturnKeyAutomatically
          placeholder="Year"
          onChangeText={text => setExpiryYear(text)}
          value={expYear}
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit
          maxLength={4}
        />

        <TextInput
          keyboardType="number-pad"
          autoCompleteType="cc-csc"
          enablesReturnKeyAutomatically
          placeholder="CVC"
          onChangeText={text => setCvc(text)}
          value={cvc}
          autoCapitalize="none"
          blurOnSubmit
          maxLength={4}
        />
      </Row>

      <WideButton
        text="Add card"
        type="secondary"
        onClick={() => {
          savePaymentMethods({
            number: cardNumber,
            expMonth,
            expYear,
            cvc,
          }).then(res => {
            navigation.goBack();
            getPaymentMethods().then(payments => setPaymentMethods(payments));
          });
        }}
      />
    </Wrapper>
  );
};
