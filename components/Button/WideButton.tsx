import React from 'react';
import styled from 'styled-components/native';

const getAligment = (type: 'primary' | 'secondary' | 'special' | 'list') => {
  if (type === 'list') {
    return 'flex-start';
  }

  return 'center';
};

const getColor = (type: 'primary' | 'secondary' | 'special' | 'list') => {
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

  if (type === 'list') {
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
  type: 'primary' | 'secondary' | 'special' | 'list';
}>`
  color: ${props => props.theme[getColor(props.type).text]};
  font-weight: bold;
`;

const Wrapper = styled.TouchableOpacity<{
  type: 'primary' | 'secondary' | 'special' | 'list';
}>`
  background-color: ${props => props.theme[getColor(props.type).background]};

  display: flex;
  align-items: ${props => getAligment(props.type)};
  margin: 12px;
  padding: 16px;
  border-radius: 6px;
`;

export const WideButton: React.FC<{
  onClick: () => void;
  text: string;
  type: 'primary' | 'secondary' | 'special' | 'list';
}> = ({ children, onClick, type, text }) => {
  return (
    <Wrapper type={type} onPress={onClick}>
      <Text type={type}>{text}</Text>
    </Wrapper>
  );
};
