/*
 * @Author: fantao.meng 
 * @Date: 2018-09-10 15:20:42 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-17 16:14:10
 */

import { call, select, all, takeEvery, takeLatest, take, fork } from 'redux-saga/effects';
import * as AuthSaga from './Auth';

export default function * rootSage() {
    yield all([
        fork(AuthSaga.loginFlow),
    ]);
}