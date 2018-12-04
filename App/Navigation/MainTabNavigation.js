/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:54:36
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-12-04 09:19:26
 */

import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import TabHomeNavigation from './TabHomeNavigation';
import TabArticleNavigation from './TabArticleNavigation';
import TabPersonalNavigation from './TabPersonalNavigation';

import { Colors } from '../Theme';

// 路由配置
const routeConfiguration = {
	tabHomeNavigation: { screen: TabHomeNavigation },
	tabArticleNavigation: { screen: TabArticleNavigation },
	tabPersonalNavigation: { screen: TabPersonalNavigation },
};

// 导航配置
const navigatorConfiguration = {
	// 路由选项
	initialRouteName: 'tabArticleNavigation',
	// 视觉选项
	tabBarOptions: {
		activeTintColor: Colors.activeTintColor,
		inactiveTintColor: Colors.inactiveTintColor,
		activeBackgroundColor: Colors.activeBackgroundColor,
		inactiveBackgroundColor: Colors.inactiveBackgroundColor,
	
		showLabel: true,
		showIcon: true,
		allowFontScaling: false,
	},
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
