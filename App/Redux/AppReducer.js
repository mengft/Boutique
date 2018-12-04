/*
 * @Author: fantao.meng 
 * @Date: 2018-11-30 17:10:40 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-11-30 17:20:56
 */

import * as ActionTypes from './ActionTypes';

const initialState = {
    // 版本忽略信息
    warnVersion: "1.0.0",
    isIgnored: false
};

export default AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_VERSION:
            let { warnVersion, isIgnored } = action.payload;
            return {
                ...state,
                warnVersion,
                isIgnored
            };
        default:
            return state;
    }
}