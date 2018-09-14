/*
 * @Author: fantao.meng 
 * @Date: 2018-09-10 15:20:42 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-13 10:38:41
 */

import { call, select, all, takeEvery, takeLatest, take } from 'redux-saga/effects';
import * as AuthSaga from './Auth';

function * sayHello () {
    console.log("Hello World!!");
}

export default function * rootSage() {
    yield all([
        takeEvery('TEST_SAGE', sayHello),
        takeLatest('LOGIN', AuthSaga.login),
    ]);
}