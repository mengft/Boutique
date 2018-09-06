/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:19:00
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-05 17:56:55
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import Icon from 'react-native-vector-icons/Ionicons';
import { TabBarLabel } from '../Component';
import { Colors } from '../Theme';

// 界面引入
import PersonalCenter from '../Container/Personal/PersonalCenter';
import PersonalInfo from '../Container/Personal/PersonalInfo';

// 路由配置
const routeConfiguration = {
	personalCenter: { screen: PersonalCenter },
	personalInfo: { screen: PersonalInfo },
};

// 导航配置
const navigatorConfiguration = {
	// 路由选项
	initialRouteName: 'personalCenter',

	// 视觉选项
	// mode: 'card',
	headerMode: 'screen',
};


export const TabPersonalNavigator = createStackNavigator(routeConfiguration, navigatorConfiguration);
export const middlewareTabPersonal = createReactNavigationReduxMiddleware('personal', state => state.tabPersonalNavigatorReducer);
const TabPersonalNavigationReduxify = reduxifyNavigator(TabPersonalNavigator, 'personal');

class TabPersonalNavigation extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		tabBarIcon: ({ focused, tintColor }) => <Icon name="logo-youtube" size={22} color={tintColor} />,
		tabBarLabel: '个人中心',
		tabBarColor: Colors.personalTabBarColor,
		tabBarVisible: navigation.getParam('tabBarVisible', true)
	})

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
