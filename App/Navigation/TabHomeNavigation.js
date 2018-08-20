/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:19:00
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-08-17 00:42:14
 */

import React from 'react';
import { createStackNavigator } from 'react-navigation';
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

const TabHomeNavigator = createStackNavigator(routeConfiguration, navigatorConfiguration);

class TabHomeNavigation extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		tabBarIcon: ({ focused, tintColor }) => <Icon name="logo-windows" size={22} color={tintColor} />,
		tabBarLabel: '首页',
		tabBarColor: Colors.homeTabBarColor,
	})

	render() {
		return (
			<TabHomeNavigator />
		);
	}
}

export default TabHomeNavigation;
