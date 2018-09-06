/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:19:00
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-02 19:10:34
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import Icon from 'react-native-vector-icons/Ionicons';
import { TabBarLabel } from '../Component';
import { Colors } from '../Theme';

// 界面引入
import HomePage from '../Container/Home/HomePage';

// 路由配置
const routeConfiguration = {
	homePage: { screen: HomePage },
};

// 导航配置
const navigatorConfiguration = {
	// 路由选项
	initialRouteName: 'homePage',
	// 视觉选项
	// mode: 'card',
	headerMode: 'screen',
};


export const TabHomeNavigator = createStackNavigator(routeConfiguration, navigatorConfiguration);
export const middlewareTabHome = createReactNavigationReduxMiddleware('home', state => state.tabHomeNavigatorReducer);
const TabHomeNavigationReduxify = reduxifyNavigator(TabHomeNavigator, 'home');

class TabHomeNavigation extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		tabBarIcon: ({ focused, tintColor }) => <Icon name="logo-windows" size={22} color={tintColor} />,
		tabBarLabel: '首页',
		tabBarColor: Colors.homeTabBarColor,
		tabBarVisible: navigation.getParam('tabBarVisible', true)
	})

	render() {
		const { navigation, navigationState, dispatch } = this.props
		return (
			<TabHomeNavigationReduxify
				state={navigationState}
				dispatch={dispatch}
			/>
		);
	}
}

const mapStateToProps = state => ({
	navigationState: state.tabHomeNavigatorReducer,
});

export default connect(mapStateToProps)(TabHomeNavigation);
