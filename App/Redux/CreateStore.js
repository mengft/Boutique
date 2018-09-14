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
import { persistStore } from 'redux-persist';
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
    })
    const store = createStore(RootReducer, enhancer);
    sagaMiddle.run(rootSage);

    persistStore(
        store,
        {
            // transforms: [
            //     createBlacklistFilter('user', ['showIndicator']),
            // ],
            // blacklist: [
            //     'rootNavigatorReducer',
            //     'mainNavigatorReducer',
            //     'tabHomeNavigatorReducer',
            //     'tabArticleNavigatorReducer',
            //     'tabPersonalNavigatorReducer',
            // ],
        }
    );
    
    return store;
}


/**
 * createLogger()       在控制台打印redux信息
 * composeEnhancers     调试redux信息
 * combineReducers()    合并render
 */