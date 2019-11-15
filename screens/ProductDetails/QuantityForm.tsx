import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

const ButtonWrapper = styled.TouchableOpacity`
  height: 64px;
  width: 64px;
  border-radius: 64px;
  background-color: rgb(140, 140, 140);
  border: 1px solid red;
  margin: auto;
`;

const ButtonText = styled.Text`
  margin: auto;
  font-size: 32px;
  font-weight: bold;
`;

const QuantityWrapper = styled.View`
  max-height: 134px;
  background-color: rgb(200, 200, 200);

  margin: 24px;
  padding: 26px;

  border-radius: 12px;
  display: flex;
  flex-direction: row;
`;
const Quantity = styled.Text`
  flex: 1;
  margin: auto;
  text-align: center;
`;

export const QuantityForm: React.FC<{
  onPlus: () => void;
  onMinus: () => void;
  value: number;
}> = ({ value, onPlus, onMinus }) => (
  <QuantityWrapper>
    <ButtonWrapper onPress={onMinus}>
      <ButtonText>-</ButtonText>
    </ButtonWrapper>
    <Quantity>{value}</Quantity>
    <ButtonWrapper onPress={onPlus}>
      <ButtonText>+</ButtonText>
    </ButtonWrapper>
  </QuantityWrapper>
);
