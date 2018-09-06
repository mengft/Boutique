/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:54:36
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-05 14:49:03
 */

import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import TabHomeNavigation from './TabHomeNavigation';
import TabFormNavigation from './TabFormNavigation';
import TabPersonalNavigation from './TabPersonalNavigation';

import { Colors } from '../Theme';

// 路由配置
const routeConfiguration = {
	tabHomeNavigation: { screen: TabHomeNavigation },
	tabFormNavigation: { screen: TabFormNavigation },
	tabPersonalNavigation: { screen: TabPersonalNavigation },
	tabPersonalNavigation1: { screen: TabPersonalNavigation },
};

// 导航配置
const navigatorConfiguration = {
	initialRouteName: 'tabPersonalNavigation',

	activeTintColor: Colors.activeTintColor,
	activeBackgroundColor: Colors.activeBackgroundColor,
	inactiveTintColor: Colors.inactiveTintColor,
	inactiveBackgroundColor: Colors.inactiveBackgroundColor,

	labeled: true,
	showLabel: true,
	showIcon: true,
	allowFontScaling: false,
};

export const MainTabNavigator = createBottomTabNavigator(routeConfiguration, navigatorConfiguration);
export const middlewareMainTab = createReactNavigationReduxMiddleware('main', state => state.mainNavigatorReducer);
const MainTabNavigatorReduxify = reduxifyNavigator(MainTabNavigator, 'main');

class MainTabNavigation extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		header: null,
	});

	render() {
		const { navigationState, dispatch } = this.props;
		return (
			<MainTabNavigatorReduxify
				state={navigationState}
				dispatch={dispatch}
			/>
		);
	}
}

const mapStateToProps = state => ({
	navigationState: state.mainNavigatorReducer,
});

export default connect(mapStateToProps)(MainTabNavigation);
