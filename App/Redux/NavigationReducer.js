/*
 * @Author: fantao.meng 
 * @Date: 2018-08-30 19:37:01 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-13 20:02:27
 */

import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../Navigation/RootNavigation';
import { MainTabNavigator } from '../Navigation//MainTabNavigation';
import { TabHomeNavigator } from '../Navigation/TabHomeNavigation';
import { TabArticleNavigator } from '../Navigation/TabArticleNavigation';
import { TabPersonalNavigator } from '../Navigation/TabPersonalNavigation';

export const RootNavigatorReducer = (state, action) => {
    switch (action.type) {
        default:
            const newState = RootNavigator.router.getStateForAction(action, state);
            return newState || state
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
            const newState = TabHomeNavigator.router.getStateForAction(action, state);
            return newState || state
    }
}

export const TabArticleNavigatorReducer = (state, action) => {
    switch (action.type) {
        default:
            const newState = TabArticleNavigator.router.getStateForAction(action, state);
            return newState || state
    }
}

export const TabPersonalNavigatorReducer = (state, action) => {
    switch (action.type) {
        default:
            const newState = TabPersonalNavigator.router.getStateForAction(action, state);
            return newState || state
    }
}