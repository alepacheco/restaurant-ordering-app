import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

const ButtonWrapper = styled.TouchableOpacity`
  height: 64px;
  width: 64px;
  border-radius: 64px;
  background-color: ${props => props.theme.contrast3}
  margin: auto;
`;

const ButtonText = styled.Text`
  margin: auto;
  font-size: 32px;
  font-weight: bold;
`;

const QuantityWrapper = styled.View`
  max-height: 134px;
  background-color: ${props => props.theme.contrast2}

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
  color: ${props => props.theme.textColor};
`;

export const QuantityForm: React.FC<{
  onChange: (value: number) => void;
  initialValue: number;
}> = ({ onChange, initialValue }) => {
  const [quantity, setQuantity] = useState(initialValue);

  useEffect(() => {
    onChange(quantity);
  }, [onChange, quantity]);

  return (
    <QuantityWrapper>
      <ButtonWrapper onPress={() => setQuantity(Math.max(quantity - 1, 1))}>
        <ButtonText>-</ButtonText>
      </ButtonWrapper>
      <Quantity>{quantity}</Quantity>
      <ButtonWrapper onPress={() => setQuantity(quantity + 1)}>
        <ButtonText>+</ButtonText>
      </ButtonWrapper>
    </QuantityWrapper>
  );
};
