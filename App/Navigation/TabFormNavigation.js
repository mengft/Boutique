/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:19:00
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-02 20:41:16
 */

import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import Icon from 'react-native-vector-icons/Ionicons';
import { TabBarLabel } from '../Component';
import { Colors, ThemeStyles } from '../Theme';

// 界面引入
import ArticlePage from '../Container/Form/ArticlePage';
import WebViewScreen from '../Container/Common/WebViewScreen';

// 路由配置
const routeConfiguration = {
	articlePage: { screen: ArticlePage },
	webViewForm: { screen: WebViewScreen }
};

// 导航配置
const navigatorConfiguration = {
	// 路由选项
	initialRouteName: 'articlePage',
	// 视觉选项
	// mode: 'card',
	headerMode: 'screen',
	navigationOptions: {
		...ThemeStyles.navigationOptions,
	}
};

export const TabFormNavigator = createStackNavigator(routeConfiguration, navigatorConfiguration);
export const middlewareTabForm = createReactNavigationReduxMiddleware('form', state => state.tabFormNavigatorReducer);
const TabFormNavigationReduxify = reduxifyNavigator(TabFormNavigator, 'form');

class TabFormNavigation extends React.Component {

	static navigationOptions = ({ navigation, screenProps }) => {
		return {
			tabBarIcon: ({ focused, tintColor }) => <Icon name="logo-twitter" size={24} color={tintColor} />,
			tabBarLabel: '表单',
			tabBarColor: Colors.formTabBarColor,
			tabBarVisible: navigation.getParam('tabBarVisible', true)
		}
	}

	render() {
		const { navigationState, dispatch } = this.props
		return (
			<TabFormNavigationReduxify 
				state={navigationState}
				dispatch={dispatch}
			/>
		);
	}
}

const mapStateToProps = state => ({
	navigationState: state.tabFormNavigatorReducer,
});

export default connect(mapStateToProps)(TabFormNavigation);
