import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.SafeAreaView``;

const Title = styled.Text`
  color: ${props => props.theme.textColor};
  font-weight: bold;
  margin: 18px 0 12px 12px;
  font-size: 24px;
`;

export const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
    </Wrapper>
  );
};
