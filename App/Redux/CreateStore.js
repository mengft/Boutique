/*
 * @Author: fantao.meng 
 * @Date: 2018-08-30 19:36:57 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-02 19:29:44
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { createLogger } from 'redux-logger'
// Reducer
import { RootNavigatorReducer, MainNavigatorReducer, TabHomeNavigatorReducer, TabFormNavigatorReducer, TabPersonalNavigatorReducer } from './NavigationReducer'
import { middlewareTabHome } from '../Navigation/TabHomeNavigation'; 
import { middlewareTabForm } from '../Navigation/TabFormNavigation'; 
import { middlewareTabPersonal } from '../Navigation/TabPersonalNavigation';
import { middlewareMainTab } from '../Navigation/MainTabNavigation';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
    applyMiddleware(createLogger(), middlewareTabHome, middlewareTabForm, middlewareTabPersonal)
)

export default function configureStore () {
    const RootReducer = combineReducers ({
        // 导航 Reducer
        rootNavigatorReducer: RootNavigatorReducer, 
        mainNavigatorReducer: MainNavigatorReducer, 
        tabHomeNavigatorReducer: TabHomeNavigatorReducer, 
        tabFormNavigatorReducer: TabFormNavigatorReducer, 
        tabPersonalNavigatorReducer: TabPersonalNavigatorReducer
    })
    const store = createStore(RootReducer, enhancer);
    return store;
}


/**
 * createLogger()       在控制台打印redux信息
 * composeEnhancers     调试redux信息
 * combineReducers()    合并render
 */