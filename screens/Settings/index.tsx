import React from 'react';
import { Text } from 'react-native';
import { Header } from 'components/Header';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  background-color: ${props => props.theme.contrast1};
  display: flex;
`;

export const Settings: React.FC<{}> = ({}) => {
  return (
    <Wrapper>
      <Header title="Need help?" />
    </Wrapper>
  );
};
