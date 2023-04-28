import AsyncStorage from "@react-native-async-storage/async-storage"
const storeItem = async (name, data) => {
    try {
        await AsyncStorage.setItem(name, JSON.stringify(data));
    } catch (error) {
        console.log("Không thành công");
    }
}

const deleteItem = async (name) => {
    try {
        await AsyncStorage.removeItem(name);
    } catch (error) {
        console.log("Không thành công");
    }
}

const getItem = async (name) => {
    try {
        const value = await AsyncStorage.getItem(name);
        if (value !== undefined) {
            return JSON.parse(value);
        } else {
            return null;
        }
    } catch (error) {
        console.log("Không thành công");
    }
}

export { storeItem, deleteItem, getItem};