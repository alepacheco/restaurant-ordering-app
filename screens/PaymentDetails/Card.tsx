import styled from 'styled-components/native';
import React, { useEffect } from 'react';

const CardWrapper = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.contrast1};
  margin: 8px;
  padding: 8px;
  border-radius: 6px;
`;

const CardType = styled.Text`
  margin: auto;
  color: ${props => props.theme.textColor};
  text-align: left;
  font-weight: bold;
  font-size: 14px;
`;

const LastFour = styled.Text`
  margin: auto;
  color: ${props => props.theme.textColor};
  text-align: right;
  font-weight: bold;
  font-size: 14px;
`;

const Delete = styled.Text`
  font-weight: bold;
  color: ${props => props.theme.contrast1};

  text-align: center;
`;

const DeleteWrapper = styled.View`
  margin: 8px;
  background-color: red;
  width: 16px;
  border-radius: 16px;
`;

export const Card: React.FC<{ last4: string; brand: string }> = ({
  last4,
  brand,
}) => {
  return (
    <CardWrapper>
      <CardType>{brand.replace(/^\w/, c => c.toUpperCase())}</CardType>
      <LastFour>· · · · · · · · · · · · {last4}</LastFour>
      <DeleteWrapper>
        <Delete>x</Delete>
      </DeleteWrapper>
    </CardWrapper>
  );
};
