/*
 * @Author: fantao.meng
 * @Date: 2018-08-17 00:45:38
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-05 17:54:12
 */

import { Platform, StyleSheet } from 'react-native';
import { Colors, px2dp, FontSize } from './index';

module.exports = {
	// 导航首界面Header样式
	indexHeaderStyle: {
		headerStyle: {
			// IOS Style
			borderBottomWidth: 0,
			// Android Style
			// shadowColor: 'black',
			// shadowOpacity: 0.1,
			// shadowRadius: StyleSheet.hairlineWidth,
			// shadowOffset: {
			//   height: StyleSheet.hairlineWidth,
			// },
			// elevation: 4,
		},
		headerTintColor: Colors.C1,
		headerTitleStyle: {
			fontSize: Platform.OS === 'ios' ? 17 : 20,
			fontWeight: Platform.OS === 'ios' ? '700' : '500',
			color: 'rgba(0, 0, 0, .9)',
			marginHorizontal: 16,
		},
	},

	// 二级界面Header样式
	defaultHeaderStyle: {
		headerStyle: {
			// IOS Style
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderBottomColor: '#A7A7AA',
			// Android Style
			// shadowColor: 'black',
			// shadowOpacity: 0.1,
			// shadowRadius: StyleSheet.hairlineWidth,
			// shadowOffset: {
			//   height: StyleSheet.hairlineWidth,
			// },
			// elevation: 4,
		},
		headerTintColor: Colors.C1,
		headerTitleStyle: {
			fontSize: Platform.OS === 'ios' ? 17 : 20,
			fontWeight: Platform.OS === 'ios' ? '700' : '500',
			color: 'rgba(0, 0, 0, .9)',
			marginHorizontal: 16,
		},
	},

	// react-navigation 默认样式
	navigationOptions: {
		headerStyle: {
			// IOS Style
			borderBottomWidth: StyleSheet.hairlineWidth,
			borderBottomColor: '#A7A7AA',
			// Android Style
			// shadowColor: 'black',
			// shadowOpacity: 0.1,
			// shadowRadius: StyleSheet.hairlineWidth,
			// shadowOffset: {
			//   height: StyleSheet.hairlineWidth,
			// },
			// elevation: 4,
		},
		headerTintColor: Colors.C1,
		headerTitleStyle: {
			fontSize: Platform.OS === 'ios' ? 17 : 20,
			fontWeight: Platform.OS === 'ios' ? '700' : '500',
			color: 'rgba(0, 0, 0, .9)',
			marginHorizontal: 16,
		},
	},
};
