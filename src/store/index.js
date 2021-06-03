import { createStore, combineReducers } from 'redux'
import {
    loginReducer,
    productReducer
} from './reducer'
console.log(loginReducer, 'loginReducer')
const reducer = combineReducers({
    login: loginReducer,
    product: productReducer
})
const store = createStore(reducer)
export default store