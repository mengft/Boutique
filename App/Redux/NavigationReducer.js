/*
 * @Author: fantao.meng 
 * @Date: 2018-08-30 19:37:01 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-17 15:45:31
 */

import * as ActionTypes from '../Redux//ActionTypes';
import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../Navigation/RootNavigation';
import { MainTabNavigator } from '../Navigation//MainTabNavigation';
import { TabHomeNavigator } from '../Navigation/TabHomeNavigation';
import { TabArticleNavigator } from '../Navigation/TabArticleNavigation';
import { TabPersonalNavigator } from '../Navigation/TabPersonalNavigation';

export const RootNavigatorReducer = (state, action) => {
    switch (action.type) {
        default:
            const nextState = RootNavigator.router.getStateForAction(action, state);
            return nextState || state
    }
}

export const MainNavigatorReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_TAR_BAR':
            let { tabBarVisible } = action.payload;
            let { index, routes } = state;
            let route = routes[index];
            return MainTabNavigator.router.getStateForAction(
                NavigationActions.setParams({ key: route['key'], params: { tabBarVisible } }),
                state
            );
        default:
            const nextState = MainTabNavigator.router.getStateForAction(action, state);
            return nextState || state;
    }
}

export const TabHomeNavigatorReducer = (state, action) => {
    switch (action.type) {
        default:
            const nextState = TabHomeNavigator.router.getStateForAction(action, state);
            return nextState || state;
    }
}

export const TabArticleNavigatorReducer = (state, action) => {
    switch (action.type) {
        default:
            const nextState = TabArticleNavigator.router.getStateForAction(action, state);
            return nextState || state;
    }
}

export const TabPersonalNavigatorReducer = (state, action) => {
    let nextAction, nextState;
    switch (action.type) {
        case ActionTypes.LOGOUT_SUCCESS:
            nextAction = NavigationActions.back({ key: null });
            nextState = TabPersonalNavigator.router.getStateForAction(nextAction, state);
            return nextState;
        default:
            nextState = TabPersonalNavigator.router.getStateForAction(action, state);
            return nextState || state;
    }
}