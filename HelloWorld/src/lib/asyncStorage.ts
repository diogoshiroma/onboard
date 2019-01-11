import { AsyncStorage } from "react-native";

export const storeItem = async (key: string, item: string) => {
    try {
        var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
};

export const retrieveItem = async(key:string)=> {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key) || "null";
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
};