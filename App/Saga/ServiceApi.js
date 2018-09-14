/*
 * @Author: fantao.meng 
 * @Date: 2018-09-13 10:40:58 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-13 14:52:11
 */
import qs from 'qs'
import { Platform } from 'react-native';
import { call, put } from 'redux-saga/effects';
import isGenerator from '../Utils/IsGenerator';
import Config from '../Config';
import { LOGOUT } from '../Redux/ActionTypes';

export default function * FetchApi ({ url, method = 'GET', params, actions, isTokenRequired = true }) {
    if (actions[0]) yield put(actions[0])
    const { response, error } = yield call(ServiceApi, {
        url,
        method,
        params,
        headers: yield call(getHeader),
    });
    if (error) {
        if (actions[2]) {
            let errorAction = actions[2];
            if (typeof errorAction === 'function') {
                if (isGenerator(errorAction)) {
                    yield call(errorAction, error);
                } else {
                    yield put(errorAction(error));
                }
            } else {
                yield put(errorAction);
            }
        }
        // 权限过期
        if (isTokenRequired && error.message === '401') {
            yield put({ type: LOGOUT });
        }
        return { error }
    }
    if (actions[1]) {
        let successAction = actions[1];
        if (typeof successAction === 'function') {
            if (isGenerator(successAction)) {
                yield call(successAction, response);
            } else {
                yield put(successAction(response));
            }
        } else {
            yield put(successAction);
        }
    }
    return { response }
    // console.log(response);
    // console.log(error);
}

function * getHeader () {
    let deviceHeader = {
        appVersion: Config.Version,
        devicePlatform: Platform.OS === 'android' ? 'android' : 'ios',
        clientId: Config.ClientId,
    };
    const headers = {}
    return {
        ...headers,
        'X-Device-Info': JSON.stringify(deviceHeader)
    }
}

function ServiceApi ({ url, method, headers, params }) {
    let options = {
        method: method.toUpperCase(),
        headers: {
            ...headers,
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify(params),
    };
    const p = fetch(url, options)

    return p.then(response => {
        if (response.status === 401) throw new Error(response.status);
        return response.json();
    })
    .then(json => {
        console.log(json);
        return { response: json }
    })
    .catch(error => {
        return { error }
    })
}