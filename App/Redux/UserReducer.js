/*
 * @Author: fantao.meng 
 * @Date: 2018-09-13 15:09:42 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-13 16:35:03
 */

import * as ActionTypes from './ActionTypes';

const initialState = {
    username: null,
    access_token: null,
    showIndicator: false,
};

export default UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_PENDING:
            return {
                ...state,
                showIndicator: true,
            };
        case ActionTypes.LOGIN_SUCCESS:
            let { username, access_token } = action.payload;
            return {
                ...state,
                username,
                access_token,
                showIndicator: false,
            };
        case ActionTypes.LOGIN_ERROR:
            return {
                ...state,
                showIndicator: false,
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}