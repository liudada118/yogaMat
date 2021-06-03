// import {createStore} from 'redux'
const defaultState = false
// 判断用户是否登录状态作为全局状态
export function loginReducer(state = false, action) {
    const { type } = action;
    switch (type) {
        case 'LOGIN':
            return true;
        case 'UNLOGIN':
            return false;
        default:
            return state;
    }
}
// 判断用户选择那一套系统
export function productReducer(state = 0, action) {
    const { type } = action
    switch (type) {
        case 'CHAIR':
            return 2;
        case 'BED':
            return 1;
        case 'BACK':
            return 0;
        default:
            return state
    }
}