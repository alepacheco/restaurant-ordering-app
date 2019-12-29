import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
background-color: ${props => props.theme.contrast0_5};
    height: 100%;
  padding-top: 34px;
`;

const Title = styled.Text`
  color: ${props => props.theme.textColor};
  font-weight: bold;
`;

export const PaymentDetails: React.FC<{}> = () => {
  return (
    <Wrapper>
      <Title>Payment options</Title>
    </Wrapper>
  );
};
