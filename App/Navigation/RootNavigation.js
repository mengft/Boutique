/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 18:05:43
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-08-31 13:47:24
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
// 界面引入
import MainTabNavigation from './MainTabNavigation';
// import ArticlePage from '../Container/Form/ArticlePage'

// 路由配置
const routeConfiguration = {
	mainTabNavigation: { screen: MainTabNavigation },
	// articlePage: { screen: ArticlePage }
};

// 导航配置
const navigatorConfiguration = {
	// 路由选项
	initialRouteName: 'mainTabNavigation',
	navigationOptions: {

	},
	// 视觉选项
	mode: 'card',
	headerMode: 'none',
};

export const RootNavigator = createStackNavigator(routeConfiguration, navigatorConfiguration);
export const middlewareRootNavigation = createReactNavigationReduxMiddleware('root', state => state.rootNavigatorReducer)
reduxifyNavigator(RootNavigator, 'root');

class RootNavigation extends React.Component {
	render() {
		return (
			<View style={Styles.container}>
				<RootNavigator />
			</View>
		);
	}
}

const Styles = StyleSheet.create({
	container: { flex: 1 },
});

export default RootNavigation;
