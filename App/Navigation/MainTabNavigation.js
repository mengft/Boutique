/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:54:36
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-08-17 00:29:51
 */

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import TabHomeNavigation from './TabHomeNavigation';
import TabPersonalNavigation from './TabPersonalNavigation';

import { Colors } from '../Theme';

// 路由配置
const routeConfiguration = {
	tabHomeNavigation: { screen: TabHomeNavigation },
	tabPersonalNavigation: { screen: TabPersonalNavigation },
	// tabPersonalNavigation1: { screen: TabPersonalNavigation },
	// tabPersonalNavigation2: { screen: TabPersonalNavigation },
};

// 导航配置
const navigatorConfiguration = {
	initialRouteName: 'tabHomeNavigation',

	activeTintColor: Colors.activeTintColor,
	activeBackgroundColor: Colors.activeBackgroundColor,
	inactiveTintColor: Colors.inactiveTintColor,
	inactiveBackgroundColor: Colors.inactiveBackgroundColor,

	labeled: true,
	showLabel: true,
	showIcon: true,
	allowFontScaling: false,
};

const MainTabNavigator = createMaterialBottomTabNavigator(routeConfiguration, navigatorConfiguration);

export default MainTabNavigator;
