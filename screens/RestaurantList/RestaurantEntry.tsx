import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 8px;
  background-color: rgb(40, 40, 40);

  ${props =>
    props.theme.colorScheme === 'dark'
      ? 'background-color: rgb(40, 40, 40);'
      : 'background-color: rgba(2, 2, 2, 0.05);'}

  border-radius: 8px;
  padding: 12px;
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
  ${props => (props.theme.colorScheme === 'dark' ? 'color: white;' : '')}

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
  isScrolling?: boolean;
  image_url: string;
}> = ({ title, description, id, distance, isScrolling, image_url }) => {
  const [scrollMargin] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(scrollMargin, {
      toValue: isScrolling ? 24 : 0,
      duration: 400,
    }).start();
  }, [isScrolling]);

  return (
    <Animated.View style={{ marginTop: scrollMargin }}>
      <Container>
        <RestaurantImage source={{ uri: image_url }} />
        <TextBox>
          <FirstRow>
            <Title>{title}</Title>
            <Distance>{distance}</Distance>
          </FirstRow>
          <SubTitle>{description}</SubTitle>
        </TextBox>
      </Container>
    </Animated.View>
  );
};
