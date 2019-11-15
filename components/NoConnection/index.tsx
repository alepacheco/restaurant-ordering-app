import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';

const Wrapper = styled.SafeAreaView`
  display: flex;
  ${props => `background-color: ${props.theme.color};`}
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

export const NoConnection: React.FC<{ type?: 'drinks' }> = ({ type }) => {
  return (
    <Wrapper>
      <CenterMiddle>
        <StyledLottieView
          source={require('../../assets/animations/no-connection.json')}
          speed={1}
          loop={true}
          autoPlay
        />
        <LoadingText>You are not connected to the internet!</LoadingText>
        <LoadingText>Retry</LoadingText>
      </CenterMiddle>
    </Wrapper>
  );
};
