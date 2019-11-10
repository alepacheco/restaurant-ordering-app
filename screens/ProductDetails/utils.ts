import axios from 'axios';
import { API_URL } from '../../constants/network';

export const getProductDetails = async ({ productId }: any) => {
  const { data } = await axios.get(`${API_URL}/restaurants/menu/item`, {
    params: {
      itemId: productId,
    },
  });

  return data;
};
