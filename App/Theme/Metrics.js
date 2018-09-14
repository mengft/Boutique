/*
 * @Author: fantao.meng
 * @Date: 2018-08-17 00:58:48
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-05 15:45:25
 */

import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * px和rn长度单位转化
 * @param {*} uiElementPx
 */
function px2dp(uiElementPx, uiWidthPx = 750) {
	const length = uiElementPx * width / uiWidthPx;
	return Math.ceil(length);
}

module.exports = {
	screenWidth: width < height ? width : height,
	screenHeight: width < height ? height : width,
	uiWidthPx: 750,
	px2dp,
	mainPadding: px2dp(50),
	APPBAR_HEIGHT: Platform.OS === 'ios' ? 44 : 56,		// Header高度
	STATUSBAR_HEIGHT: Platform.OS === 'ios' ? 20 : 0,	// 状态栏高度
};
