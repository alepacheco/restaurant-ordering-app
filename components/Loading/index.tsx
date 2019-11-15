import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';

const Wrapper = styled.SafeAreaView<{ background?: string }>`
  display: flex;
  ${props => `background-color: ${props.background || props.theme.color};`}
  height: 100%;
  width: 100%;
  align-items: center;
  margin: auto;
`;

const CenterMiddle = styled.View`
  align-items: center;
  margin: auto;
`;

const LoadingText = styled.Text`
  ${props => `color: ${props.theme.textColor};`}
  text-align: center;
  font-size: 24px;
`;
const StyledLottieView = styled(LottieView)`
  height: 160px;
  width: 160px;
`;

export const Loading: React.FC<{ type?: 'drinks' }> = ({ type }) => {
  const types = {
    default: require('../../assets/animations/loading.json') as string,
    drinks: require('../../assets/animations/drinks-loading.json') as string,
  };

  const selectedType = types[type] || types.default;

  return (
    <Wrapper background={type === 'drinks' ? '#463268' : null}>
      <CenterMiddle>
        <LoadingText>Loading</LoadingText>
        <StyledLottieView
          source={selectedType}
          speed={1}
          loop={true}
          autoPlay
        />
      </CenterMiddle>
    </Wrapper>
  );
};
