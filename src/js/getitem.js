import { AsyncStorage } from 'react-native'
function getItem(name, fn) {

}
function setItem(name, value, fn) {
    AsyncStorage.setItem(name, JSON.stringify(value), (error) => {
        if (error) {
        } else {
        }
    });
}

