/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 18:05:43
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-08-15 18:27:22
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
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

const RootNavigator = createStackNavigator(routeConfiguration, navigatorConfiguration);

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
