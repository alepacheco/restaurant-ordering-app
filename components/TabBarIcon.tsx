import React from 'react';
import styled from 'styled-components/native';

const Emoji = styled.Text`
  font-size: 28px;
  margin: 0 auto;
`;

const Wrapper = styled.View<{ focused: boolean }>`
  background-color: ${({ focused }) =>
    focused ? 'rgba(1,100,200,0.4)' : 'white'};
  border-radius: 8px;
  padding: 4px;
  width: 100%;
  margin: 0 0 -12px 0;
  text-align: center;
`;
export const TabBarIcon: React.FC<{ emoji: string; focused: boolean }> = ({
  emoji,
  focused,
}) => {
  return (
    <Wrapper focused={focused}>
      <Emoji>{emoji}</Emoji>
    </Wrapper>
  );
};
