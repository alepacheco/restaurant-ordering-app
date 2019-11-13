import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.SafeAreaView`
  display: flex;
  ${props => `background-color: ${props.theme.color};`}
  height: 100%;
  width: 100%;
`;

const LoadingText = styled.Text`
  ${props => `color: ${props.theme.textColor};`}

  text-align: center;
  font-size: 24px;
`;

export const Loading: React.FC<{}> = ({}) => {
  return (
    <Wrapper>
      <LoadingText>Loading...</LoadingText>
    </Wrapper>
  );
};
