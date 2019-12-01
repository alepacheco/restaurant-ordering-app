import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { QuantityForm } from './QuantityForm';
import { AddToCart } from './AddToCart';
import { MenuItem } from 'types/restaurant';
import { useStoreState, useStoreActions } from 'store';
import * as haptics from 'utils/haptics';
import { OptionSelector } from './OptionSelector';

const StyledView = styled.View`
  background-color: ${props =>
    props.theme.colorScheme === 'light' ? 'white' : props.theme.contrast1};
`;

const ProductImage = styled.Image`
  background-color: white;
  margin: 34px auto;
  height: 134px;
  width: 134px;
  border-radius: 6px;
`;

const Name = styled.Text`
  ${props => `color: ${props.theme.textColor};`}
  margin: 4px 24px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const Description = styled.Text`
  margin: 24px;
  font-size: 14px;
  color: gray;
`;

const Wrapper = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

interface ProductDetailsParams {
  itemId: string;
  restaurantId: string;
}

export const ProductDetails: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const {
    itemId,
    restaurantId,
  }: ProductDetailsParams = navigation.state.params;

  const itemDetails: MenuItem = useStoreState(state =>
    state.restaurantDetails.list[restaurantId].menu
      .reduce((acc, item) => acc.concat(item.items), [] as Array<MenuItem>)
      .find(menuItem => menuItem._id === itemId)
  );
  const addToCart = useStoreActions(actions => actions.cart.add);

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState(
    {} as { [optionId: string]: Array<string> }
  );

  const updateSelectionForOption = (optionId: string) => (
    choices: Array<string>
  ) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionId]: choices,
    });
  };

  const getTotal = () => {
    const optionsExtraPrice = Object.keys(selectedOptions)
      .map(optionId => {
        return itemDetails.options
          .find(option => option._id === optionId)
          .choices.filter(choice =>
            selectedOptions[optionId].includes(choice._id)
          )
          .map(choice => choice.price);
      })
      .flat()
      .map(price => Number(price))
      .reduce((sum, price) => sum + price, 0);

    return (quantity * (optionsExtraPrice + Number(itemDetails.price))).toFixed(
      2
    );
  };

  const itemOptions = itemDetails.options.map(option => {
    return (
      <OptionSelector
        key={option._id}
        type={option.type}
        name={option.name}
        choices={option.choices}
        state={selectedOptions[option._id]}
        updateState={updateSelectionForOption(option._id)}
      />
    );
  });

  return (
    <StyledView>
      <SafeAreaView>
        <Wrapper>
          <ScrollView>
            <ProductImage
              resizeMode="contain"
              source={{
                uri:
                  itemDetails.imageUrl ||
                  'https://storage.googleapis.com/barapp-data-images/default-dish.jpg',
              }}
            />
            <Name>{itemDetails.name}</Name>
            <Description>{itemDetails.description}</Description>

            <View>{itemOptions}</View>

            <QuantityForm onChange={setQuantity} initialValue={quantity} />
          </ScrollView>
          <AddToCart
            price={getTotal()}
            onPress={async () => {
              await haptics.selectionTouch();
              addToCart({
                restaurantId,
                selection: {
                  amount: quantity,
                  itemId,
                  options: selectedOptions,
                },
              });
              navigation.goBack();
            }}
          />
        </Wrapper>
      </SafeAreaView>
    </StyledView>
  );
};
