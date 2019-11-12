import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

const AddToCartWrapper = styled.View`
  background-color: orange;
  border-radius: 2px;

  margin: 12px;
  padding: 12px;
`;
const AddToCartText = styled.Text`
  text-align: center;
  width: 100%;
`;
const AddToCartPrice = styled.Text`
  margin: 12px;
  width: 100%;

  position: absolute;
  text-align: right;
`;

export const AddToCart: React.FC<{ price: string }> = ({ price }) => {
  return (
    <AddToCartWrapper>
      <AddToCartText>Add to Cart</AddToCartText>
      <AddToCartPrice>{price}</AddToCartPrice>
    </AddToCartWrapper>
  );
};
