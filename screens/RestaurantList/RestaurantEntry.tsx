import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { NearbyRestaurant } from 'types/restaurant';
import { withNavigation } from 'react-navigation';
import { useStoreState, useStoreActions } from 'store';
import { getRestaurantDetails } from 'utils/network';

const Container = styled.TouchableOpacity`
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
  ${props => (props.theme.colorScheme === 'dark' ? 'color: white;' : '')}

  flex: 1;
  text-align: right;
`;

const StyledRating = styled.Text`
  ${props => (props.theme.colorScheme === 'dark' ? 'color: white;' : '')}

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

const Review: React.FC<{ rating: number }> = ({ rating }) => {
  if (!rating) {
    return <StyledRating>No ratings yet</StyledRating>;
  }
  return <StyledRating>{rating} ★</StyledRating>;
};

export const _RestaurantEntry: React.FC<NearbyRestaurant & {
  navigation: any;
}> = ({
  name,
  description,
  distance,
  imageUrl,
  rating,
  _id,
  navigation: { navigate },
}) => {
  const restaurantDetails = useStoreState(
    state => state.restaurantDetails.list[_id]
  );
  const addRestaurant = useStoreActions(
    actions => actions.restaurantDetails.addRestaurant
  );

  useEffect(() => {
    if (!restaurantDetails) {
      getRestaurantDetails({ restaurantId: _id }).then(data => {
        addRestaurant(data);
      });
    }
  }, [addRestaurant, restaurantDetails, _id]);

  return (
    <Container
      onPress={() => navigate('RestaurantDetails', { restaurantId: _id })}>
      <RestaurantImage source={{ uri: imageUrl }} />
      <TextBox>
        <FirstRow>
          <Title>{name}</Title>
          <Distance>{distance}</Distance>
        </FirstRow>
        <SubTitle>{description}</SubTitle>
        <Review rating={rating} />
      </TextBox>
    </Container>
  );
};

export const RestaurantEntry = withNavigation(_RestaurantEntry);
