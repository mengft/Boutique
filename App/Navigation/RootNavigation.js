/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 18:05:43
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-12-04 11:34:02
 */

import React from 'react';
import { View, StyleSheet, InteractionManager, Alert, Platform, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { UPDATE_VERSION } from '../Redux/ActionTypes'
import { LoadView } from '../Component';
import { ThemeStyles } from '../Theme';
import { Version } from '../Config'
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

	componentDidMount () {
		InteractionManager.runAfterInteractions(() => {
			this.checkUpdateApp();
		})
	}

	/**
	 * 线上版本获取
	 */
	checkUpdateApp () {
		// 新版本信息
		let updateInfo = {
			currentVersion: "1.0.1",
			downloadUrl: "http://www.healscitech.com/resources/bluevein.apk",
			isNecessary: false,
			isHotReload: false,
		};

		// 是否需要弹框提示更新
		if (!this.updateVersionFilter(updateInfo)) return;
		
		Alert.alert(
			'版本更新',
			'【本次更新】- 优化用户体验',
			[
			  { text: '确定', onPress: () => this.setUpdateIntent(1, updateInfo) },
			].concat(
				!updateInfo['isNecessary'] ?
				[
					{ text: '取消', onPress: () => this.setUpdateIntent(0) },
					{ text: '忽略此版本', onPress: () => this.setUpdateIntent(-1, updateInfo) },
				] : []
			),
			{ cancelable: false }
		)
	}

	/**
	 * 版本更新提醒过滤
	 * Step 1 过滤热更新
     * Step 2 线上版本与本地版本相等
	 * Step 3 线上版本已被忽略
	 * @param {*} updateInfo 
	 */
	updateVersionFilter (updateInfo) {
		let { warnVersion, isIgnored } = this.props;
		
		if (updateInfo['isHotReload']) return false;
		if (Version < updateInfo['currentVersion']) {
			if (updateInfo['isNecessary']) return true;
			if (warnVersion === updateInfo['currentVersion'] && isIgnored) return false;
			return true;
		}
		return false;
	}

	/**
	 * 根据用户选择进行版本更新处理
	 * @param {1 确定更新 0 不更新 -1 忽略该版本} flag 
	 * @param {*} updateInfo 
	 */
	setUpdateIntent (flag, ...updateInfo) {
		switch (flag) {
			case 1:
				// TODO 下载新版
				this.props.updateVersion(updateInfo[0]['currentVersion'], false);
				if (Platform.OS === 'ios') {

				} else {
					const UpdateAppManager = NativeModules.UpdateAppManager;
					if (UpdateAppManager) UpdateAppManager.downloadApp(updateInfo[0]['downloadUrl']);
				}
				break;
			case 0:
				
				break;
			case -1:
				this.props.updateVersion(updateInfo[0]['currentVersion'], true);
				break;
			default:
				break;
		}
 	}

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
	showIndicator: state.user.showIndicator,
	warnVersion: state.app.warnVersion,
	isIgnored: state.app.isIgnored,
});

const mapDispatchToProps = dispatch => ({
	updateVersion: (warnVersion, isIgnored) => dispatch({ type: UPDATE_VERSION, payload: { warnVersion, isIgnored } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigation);
