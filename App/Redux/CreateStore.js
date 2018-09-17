/*
 * @Author: fantao.meng 
 * @Date: 2018-08-30 19:36:57 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-13 20:03:05
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { createLogger } from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBlacklistFilter }  from 'redux-persist-transform-filter';
// Reducer
import { RootNavigatorReducer, MainNavigatorReducer, TabHomeNavigatorReducer, TabArticleNavigatorReducer, TabPersonalNavigatorReducer } from './NavigationReducer'
import { middlewareTabHome } from '../Navigation/TabHomeNavigation'; 
import { middlewareTabArticle } from '../Navigation/TabArticleNavigation'; 
import { middlewareTabPersonal } from '../Navigation/TabPersonalNavigation';
import { middlewareMainTab } from '../Navigation/MainTabNavigation';
import UserReducer from './UserReducer';
import rootSage from '../Saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddle = createSagaMiddleware();

const enhancer = composeEnhancers(
    applyMiddleware(
        createLogger(), 
        middlewareTabHome, 
        middlewareTabArticle, 
        middlewareTabPersonal,
        sagaMiddle,    
    )
    // 持久化增强器(用于启动分发Store)
    // autoRehydrate()
)

export default function configureStore () {
    const RootReducer = combineReducers ({
        // 导航 Reducer
        rootNavigatorReducer: RootNavigatorReducer, 
        mainNavigatorReducer: MainNavigatorReducer, 
        tabHomeNavigatorReducer: TabHomeNavigatorReducer, 
        tabArticleNavigatorReducer: TabArticleNavigatorReducer, 
        tabPersonalNavigatorReducer: TabPersonalNavigatorReducer,
        // 数据信息
        user: UserReducer,
    });

    const persistConfig = {
        key: 'root',
        storage: storage,
        blacklist: [
            'rootNavigatorReducer',
            'mainNavigatorReducer',
            'tabHomeNavigatorReducer',
            'tabArticleNavigatorReducer',
            'tabPersonalNavigatorReducer',
        ],
        transform: [
            createBlacklistFilter('user', ['showIndicator']),
        ],
        debug: true,
    };

    // 持久化存储Store
    const presistRootReducer = persistReducer(persistConfig, RootReducer);

    const store = createStore(presistRootReducer, enhancer);
    const persistor = persistStore(store);

    // 开启saga对action的监听
    sagaMiddle.run(rootSage);
    
    return { store, persistor };
}


/**
 * createLogger()       在控制台打印redux信息
 * composeEnhancers     调试redux信息
 * combineReducers()    合并render
 */