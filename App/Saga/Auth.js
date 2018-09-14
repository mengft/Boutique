/*
 * @Author: fantao.meng 
 * @Date: 2018-09-13 10:37:06 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-13 16:11:39
 */

import { call, put, select } from 'redux-saga/effects';
import CryptoJS from 'crypto-js';
import * as ActionTypes from '../Redux/ActionTypes';
import FetchApi from './ServiceApi';
import Config from '../Config';

export function * login (action) {
    let { username, password } = action.payload;
    yield call(FetchApi, {
        url: `${Config.AuthHost}/oidcserver/token`,
        method: 'POST',
        params: {
            grant_type: 'password',
            client_id: Config.ClientId,
            
            username: username.trim(), 
            password: CryptoJS.MD5(password.trim()).toString(CryptoJS.enc.Hex),
        },
        isTokenRequired: false,
        actions: [
            { type: ActionTypes.LOGIN_PENDING },
            function * (response) {
                yield put({ type: ActionTypes.LOGIN_SUCCESS, payload: { username: username.trim(), access_token: response['access_token'] } });
            },
            function * (error) {
                yield put({ type: ActionTypes.LOGIN_ERROR });
            },
        ],
    });
}
