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
  margin-left: 12px;
  display: flex;
`;

const FirstRow = styled.View`
  display: flex;
  flex-direction: row;
`;

const Distance = styled.Text`
  flex: 1;
  text-align: right;
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
  font-size: 12px;
  color: gray;
`;

export const RestaurantEntry: React.FC<{
  title: string;
  description: string;
  id: number;
  distance: string;
}> = ({ title, description, id, distance }) => {
  return (
    <Container>
      <RestaurantImage source={{ uri: 'https://picsum.photos/50/50' }} />
      <TextBox>
        <FirstRow>
          <Title>{title}</Title>
          <Distance>{distance}</Distance>
        </FirstRow>
        <SubTitle>{description}</SubTitle>
      </TextBox>
    </Container>
  );
};
