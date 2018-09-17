/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:19:00
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-17 14:38:35
 */

import React from 'react';
import { Easing, Animated } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import Icon from 'react-native-vector-icons/Ionicons';
import { TabBarLabel } from '../Component';
import { Colors, ThemeStyles } from '../Theme';
import { TransitionConfiguration } from '../Utils/Function'

// 界面引入
import PersonalCenter from '../Container/Personal/PersonalCenter';
import PersonalInfo from '../Container/Personal/PersonalInfo';
import FormScreen from '../Container/Personal/FormScreen';
import ChartScreen from '../Container/Personal/ChartScreen';
import Settings from '../Container/Personal/Settings';
import Login from '../Container/Auth/Login'

// 路由配置
const routeConfiguration = {
	personalCenter: { screen: PersonalCenter },
	personalInfo: { screen: PersonalInfo },
	formScreen: { screen: FormScreen },
	chartScreen: { screen: ChartScreen },
	settings: { screen: Settings },
	login: { screen: Login },
};



// 导航配置
const navigatorConfiguration = {
	// 路由选项
	initialRouteName: 'personalCenter',
	// 视觉选项
	mode: 'card',
	headerMode: 'screen',
	// 统一为IOS 兼容Android的Header flex-start排列方式
	headerLayoutPreset: 'center',
	// 转场动画
	transitionConfig: TransitionConfiguration,

	navigationOptions: {
		...ThemeStyles.navigationOptions,
	},
};

export const TabPersonalNavigator = createStackNavigator(routeConfiguration, navigatorConfiguration);
export const middlewareTabPersonal = createReactNavigationReduxMiddleware('personal', state => state.tabPersonalNavigatorReducer);
const TabPersonalNavigationReduxify = reduxifyNavigator(TabPersonalNavigator, 'personal');

class TabPersonalNavigation extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		tabBarIcon: ({ focused, tintColor }) => <Icon name="logo-youtube" size={22} color={tintColor} />,
		tabBarLabel: '个人中心',
		tabBarVisible: navigation.getParam('tabBarVisible', true)
	});

	render() {
		const { navigationState, dispatch } = this.props
		return (
			<TabPersonalNavigationReduxify
				state={navigationState}
				dispatch={dispatch}
			/>
		);
	}
}

const mapStateToProps = state => ({
	navigationState: state.tabPersonalNavigatorReducer,
});

export default connect(mapStateToProps)(TabPersonalNavigation);
