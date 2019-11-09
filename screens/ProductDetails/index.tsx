import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { getProductDetails } from './utils';

export const ProductDetails: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  const { productId } = navigation.state.params;

  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    getProductDetails({
      restaurantId: null,
      productId,
    }).then(data => setProductDetails(data));
  }, []);

  return (
    <SafeAreaView>
      <Text>Datails for product</Text>
      <Text>{JSON.stringify(productDetails)}</Text>
    </SafeAreaView>
  );
};
