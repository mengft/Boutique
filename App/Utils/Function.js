/*
 * @Author: fantao.meng 
 * @Date: 2018-09-12 13:53:32 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-12 13:56:52
 */

import { TransitionConfigs } from './Constant'
import StackViewTransitionConfigs from 'react-navigation-stack/dist/views/StackView/StackViewTransitionConfigs';

/**
 * forHorizontal
 * forVertical
 * forFadeFromBottomAndroid
 * forFade
 * * {} StackViewStyleInterpolator 转场方式
 *
 * defaultTransitionConfig
 * getTransitionConfig
 * SlideFromRightIOS
 * ModalSlideFromBottomIOS
 * FadeInFromBottomAndroid
 * FadeOutToBottomAndroid
 * * {} StackViewTransitionConfigs 转场方式、动画配置
 * 
 * transitionConfig 配置详情参考 https://reactnavigation.org/docs/zh-Hans/stack-navigator.html
 * 导航配置 - 转场动画配置
 * @param {*} sceneProps 
 */
export const TransitionConfiguration = (sceneProps) => {
	const params = sceneProps['scene']['route']['params'] || {};
	const transition = params.transition || 'SlideFromRight';
	return StackViewTransitionConfigs[TransitionConfigs[transition]]
}