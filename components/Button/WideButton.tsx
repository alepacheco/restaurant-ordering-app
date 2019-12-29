import React from 'react';
import styled from 'styled-components/native';

const getColor = (type: 'primary' | 'secondary' | 'special') => {
  if (type === 'primary') {
    return {
      background: 'acentColor' as const,
      text: 'contrast10' as const,
    };
  }
  if (type === 'secondary') {
    return {
      background: 'contrast1' as const,
      text: 'contrast9' as const,
    };
  }
  if (type === 'special') {
    return {
      background: 'contrast1' as const,
      text: 'contrast9' as const,
    };
  }

  return {
    background: 'contrast1' as const,
    text: 'contrast9' as const,
  };
};

const Text = styled.Text<{
  type: 'primary' | 'secondary' | 'special';
}>`
  color: ${props => props.theme[getColor(props.type).text]};
`;

const Wrapper = styled.TouchableOpacity<{
  type: 'primary' | 'secondary' | 'special';
}>`
  background-color: ${props => props.theme[getColor(props.type).background]};

  display: flex;
  align-items: center;
  margin: 12px;
  padding: 12px;
  border-radius: 6px;
`;

export const WideButton: React.FC<{
  onClick: () => void;
  text: string;
  type: 'primary' | 'secondary' | 'special';
}> = ({ children, onClick, type, text }) => {
  return (
    <Wrapper type={type} onPress={onClick}>
      <Text type={type}>{text}</Text>
    </Wrapper>
  );
};
