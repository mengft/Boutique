/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:19:00
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-08-17 00:42:03
 */

import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabBarLabel } from '../Component';
import { Colors } from '../Theme';

// 界面引入
import PersonalCenter from '../Container/Personal/PersonalCenter';

// 路由配置
const routeConfiguration = {
	personalCenter: { screen: PersonalCenter },
};

// 导航配置
const navigatorConfiguration = {
	// 路由选项
	initialRouteName: 'personalCenter',

	// 视觉选项
	// mode: 'card',
	headerMode: 'screen',
};

const TabPersonalNavigator = createStackNavigator(routeConfiguration, navigatorConfiguration);

class TabPersonalNavigation extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		tabBarIcon: ({ focused, tintColor }) => <Icon name="logo-youtube" size={22} color={tintColor} />,
		tabBarLabel: '个人中心',
		tabBarColor: '#c03961',
	})

	render() {
		return (
			<TabPersonalNavigator />
		);
	}
}

export default TabPersonalNavigation;
