/*
 * @Author: fantao.meng 
 * @Date: 2018-08-30 19:37:01 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-02 20:40:33
 */

import { NavigationActions } from 'react-navigation';
import { RootNavigator } from '../Navigation/RootNavigation';
import { MainTabNavigator } from '../Navigation//MainTabNavigation';
import { TabHomeNavigator } from '../Navigation/TabHomeNavigation';
import { TabFormNavigator } from '../Navigation/TabFormNavigation';
import { TabPersonalNavigator } from '../Navigation/TabPersonalNavigation';

const RootNavigatorReducer = (state, action) => {
    switch (action.type) {
        default:
            const newState = RootNavigator.router.getStateForAction(action, state);
            return newState || state
    }
}

const MainNavigatorReducer = (state, action) => {
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

const TabHomeNavigatorReducer = (state, action) => {
    switch (action.type) {
        default:
            const newState = TabHomeNavigator.router.getStateForAction(action, state);
            return newState || state
    }
}

const TabFormNavigatorReducer = (state, action) => {
    switch (action.type) {
        default:
            const newState = TabFormNavigator.router.getStateForAction(action, state);
            return newState || state
    }
}

const TabPersonalNavigatorReducer = (state, action) => {
    switch (action.type) {
        default:
            const newState = TabPersonalNavigator.router.getStateForAction(action, state);
            return newState || state
    }
}

export { RootNavigatorReducer, MainNavigatorReducer, TabHomeNavigatorReducer, TabFormNavigatorReducer, TabPersonalNavigatorReducer }
