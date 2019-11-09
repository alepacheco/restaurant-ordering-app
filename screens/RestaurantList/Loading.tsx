import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.SafeAreaView`
  display: flex;
`;

const LoadingText = styled.Text`
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
