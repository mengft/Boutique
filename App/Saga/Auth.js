/*
 * @Author: fantao.meng 
 * @Date: 2018-09-13 10:37:06 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-17 16:11:09
 */

import { delay } from 'redux-saga';
import { call, put, take, select, fork } from 'redux-saga/effects';
import CryptoJS from 'crypto-js';
import * as ActionTypes from '../Redux/ActionTypes';
import FetchApi from './ServiceApi';
import Config from '../Config';

export function * loginFlow() {
    while (true) {
        let action = yield take('LOGIN');
        yield fork(login, action);
        action = yield take(['LOGOUT', 'LOGIN_ERROR']);
        if (action['type'] === 'LOGOUT') yield fork(logout, action);
    }
}

/**
 * 登录
 * @param {*} action 
 */
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

/**
 * 退出登录
 * @param {*} action 
 */
export function * logout (action) {
    yield put({ type: ActionTypes.LOGOUT_PENDING });
    yield delay(1500);
    yield put({ type: ActionTypes.LOGOUT_SUCCESS });
}
