import axios from 'axios';
import { API_URL } from '../../constants/network';
import * as FileSystem from 'expo-file-system';
import { SESSION_ID_KEY } from '../../constants/session';
import * as SecureStore from 'expo-secure-store';

export const getProfile = async ({ sessionId }: any) => {
  const { data } = await axios.get(`${API_URL}/user`, {
    params: {
      sessionId,
    },
  });

  return data;
};

export const uploadFile = async (uri: string) => {
  console.log({ uri });

  const base64Image = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const sessionId = await SecureStore.getItemAsync(SESSION_ID_KEY);

  return axios.post(`${API_URL}/user/image`, {
    file: base64Image,
    sessionId,
  });
};
