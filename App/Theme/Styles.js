/*
 * @Author: fantao.meng
 * @Date: 2018-08-17 00:45:38
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-08-20 10:46:29
 */

import { Platform } from 'react-native';
import { Colors, px2dp, FontSize } from './index';

module.exports = {
	indexHeaderStyle: {
		headerStyle: { backgroundColor: Colors.C8, borderBottomWidth: 0 },
		headerTintColor: Colors.C1,
		headerTitleStyle: { fontSize: 16 },
	},
	defaultHeaderStyle: {
		headerStyle: {},
		headerTitleStyle: {},
	},
	APPBAR_HEIGHT: Platform.OS === 'ios' ? 44 : 56,
	STATUSBAR_HEIGHT: Platform.OS === 'ios' ? 20 : 0,
};
