/*
 * @Author: fantao.meng
 * @Date: 2018-08-17 00:58:48
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-08-20 11:08:54
 */

import { Dimensions } from 'react-native';

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
};
