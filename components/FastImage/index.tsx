import React, { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { Image } from 'react-native';

const cyrb53 = function(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

const defaultUrl =
  'https://storage.googleapis.com/barapp-data-images/default-dish.jpg';
export const FastImage: React.FC<{ url: string }> = ({ url, ...options }) => {
  const [uri, setUri] = useState(url || defaultUrl);

  useEffect(() => {
    (async () => {
      const { exists } = await FileSystem.getInfoAsync(
        FileSystem.cacheDirectory + cyrb53(url)
      );
      if (exists) {
        setUri(FileSystem.cacheDirectory + cyrb53(url));
      }
    })();
  }, [url]);

  useEffect(() => {
    (async () => {
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        FileSystem.cacheDirectory + cyrb53(url)
      );
      try {
        const { uri } = await downloadResumable.downloadAsync();

        setUri(uri);
      } catch (e) {
        setUri(defaultUrl);
      }
    })();
  }, [url]);

  return <Image resizeMode="cover" source={{ uri }} {...options} />;
};
