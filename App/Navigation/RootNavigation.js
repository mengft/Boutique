/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 18:05:43
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-13 17:01:21
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { LoadView } from '../Component';
import { ThemeStyles } from '../Theme';
// 界面引入
import MainTabNavigation from './MainTabNavigation';

// 路由配置
const routeConfiguration = {
	mainTabNavigation: { screen: MainTabNavigation },
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
			<View style={ThemeStyles.container}>
				<RootNavigator />
				<LoadView style={Styles.loadView} visible={this.props.showIndicator} gif='triangles' />
			</View>
		);
	}
}

const Styles = StyleSheet.create({
	loadView: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'transparent' },
});

const mapStateToProps = state => ({
	showIndicator: state.user.showIndicator
})

export default connect(mapStateToProps)(RootNavigation);
