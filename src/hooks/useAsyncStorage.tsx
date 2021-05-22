import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = (key: string) => {
  //AsyncStorage.clear();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      alert(`error: ${e}`);
    }
  };

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      alert(`error: ${e}`);
    }
  };

  return {storeData, getData};
};
