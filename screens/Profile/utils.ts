import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { SESSION_ID_KEY } from '../../constants/session';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export const getProfile = async () => {
  const sessionId = await SecureStore.getItemAsync(SESSION_ID_KEY);

  const { data } = await axios.get(`/user`, {
    params: {
      sessionId,
    },
  });

  return data;
};

export const uploadFile = async (uri: string) => {
  const base64Image = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const sessionId = await SecureStore.getItemAsync(SESSION_ID_KEY);

  return axios.post(`/user/image`, {
    file: base64Image,
    sessionId,
  });
};

export const getPermission = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return false;
    }
  }

  return true;
};

export const pickImage = async (callback: () => void) => {
  await getPermission();
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (result.cancelled === false && result.uri) {
    await uploadFile(result.uri);
    callback();
  }
};
