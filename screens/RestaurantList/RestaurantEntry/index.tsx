import React, { useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { NearbyRestaurant } from 'types/restaurant';
import { withNavigation } from 'react-navigation';
import { useStoreState, useStoreActions } from 'store';
import { getRestaurantDetails } from 'utils/network';
import * as haptics from 'utils/haptics';

const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px;
  background-color: ${props => props.theme.contrast1};

  overflow: hidden;
  border-radius: 8px;
`;

const TextBox = styled.View`
  flex: 2;
  margin-left: 12px;
  display: flex;
  min-height: 64px;
`;

const FirstRow = styled.View`
  margin-top: 12px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const SecondRow = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Distance = styled.Text`
  color: ${props => props.theme.textColor};

  flex: 1;
  text-align: right;
  margin-right: 12px;
`;

const StyledRating = styled.Text`
  color: ${props => props.theme.textColor};

  flex: 1;
  text-align: right;

  margin: 8px;
`;

const RestaurantImage = styled.Image`
  height: 124px;
  width: 100%;
`;

const Title = styled.Text`
  color: ${props => props.theme.textColor};

  flex: 1;
  text-align: left;
  font-weight: bold;
  font-size: 14px;
`;

const SubTitle = styled.Text`
  justify-content: center;
  font-size: 14px;
  color: ${props => props.theme.contrast6};
`;

const Review: React.FC<{ rating: number }> = ({ rating }) => {
  if (!rating) {
    return <View></View>;
  }
  return (
    <StyledRating>{new Array(rating).fill(null).map(() => '★')}</StyledRating>
  );
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
  bannerImgUrl,
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
      onPress={() => {
        haptics.selectionTouch().then(() => {
          navigate('RestaurantDetails', { restaurantId: _id });
        });
      }}>
      <RestaurantImage
        source={{
          uri:
            bannerImgUrl ||
            'https://storage.googleapis.com/barapp-data-images/default-restaurant.jpg',
        }}
      />
      <TextBox>
        <FirstRow>
          <Title>{name}</Title>
          <Distance>{distance}</Distance>
        </FirstRow>
        <SecondRow>
          <SubTitle>{description}</SubTitle>
          <Review rating={rating} />
        </SecondRow>
      </TextBox>
    </Container>
  );
};

export const RestaurantEntry = withNavigation(_RestaurantEntry);
