import axios from 'axios';
import { API_URL } from '../../constants/network';

export const getProfile = async ({ sessionId }: any) => {
  const { data } = await axios.get(`${API_URL}/user`, {
    params: {
      sessionId,
    },
  });

  return data;
};
