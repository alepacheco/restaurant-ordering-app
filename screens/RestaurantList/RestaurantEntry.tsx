import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 18px 8px;
`;

const TextBox = styled.View`
  flex: 2;
  display: flex;
`;

const RestaurantImage = styled.Image`
  height: 84px;
  width: 84px;
  border-radius: 6px;
`;

const Title = styled.Text`
  justify-content: center;
  font-size: 24px;
`;

const SubTitle = styled.Text`
  justify-content: center;
  font-size: 18px;
  color: gray;
`;

export const RestaurantEntry: React.FC<{
  title: string;
  description: string;
  id: number;
}> = ({ title, description, id }) => {
  return (
    <Container>
      <RestaurantImage source={{ uri: 'https://picsum.photos/50/50' }} />
      <TextBox>
        <Title>{title}</Title>
        <SubTitle>{description}</SubTitle>
      </TextBox>
    </Container>
  );
};
