/*
 * @Author: fantao.meng
 * @Date: 2018-08-20 16:57:10
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-05 14:33:07
 */

import React from 'react';
import {
	View, Image, Animated, Easing, ViewPropTypes, StyleSheet, Platform,
} from 'react-native';
import * as PropTypes from 'prop-types';
import { Colors } from '../Theme';

export default class LoadImage extends React.Component {
	static propTypes = {
	  style: PropTypes.oneOfType([
	    ViewPropTypes.style,
	    PropTypes.number,
	  ]),
	  source: PropTypes.oneOfType([
	    PropTypes.object,
	    PropTypes.number,
	  ]),
	  defaultSource: PropTypes.oneOfType([
	    PropTypes.object,
	    PropTypes.number,
	  ]),
	  onLoad: PropTypes.func,
	  onError: PropTypes.func,
	}

	static defaultProps = {
		onLoad: () => {},
		onError: () => {},
	}

	constructor(props) {
    	super(props);
    	this.state = {
    		loadStatus: 'pending',
    		backgroundColor: new Animated.Value(0),
    	};
	}

	componentWillUnmount() {
    	if (undefined !== this.backgroundColorAnimated) this.backgroundColorAnimated.stop();
	}

	/**
     * 图片资源开始加载
     */
	onLoadStart() {
    	// 配置加载动画
    	this.backgroundColorAnimated = Animated.sequence([
    	Animated.timing(this.state.backgroundColor, {
    		toValue: 1,
    		easing: Easing.ease,
    		duration: 800,
    	}),
    	Animated.timing(this.state.backgroundColor, {
    		toValue: 0,
    		easing: Easing.in,
    		duration: 800,
    	}),
    	]);

    	this.backgroundColorAnimated.start(() => {
    		this.state.loadStatus === 'pending' && this.onLoadStart();
    	});
	}

	/**
     * 加载结束
     */
	onLoadEnd() {
    	// if (undefined !== this.backgroundColorAnimated) this.backgroundColorAnimated.stop()
	}

	/**
     * 加载成功
     */
	handleImageLoaded() {
    	this.setState({ loadStatus: 'success' }, () => {
			this.props.onLoad();
		});
	}

	/**
     * 加载失败
     * @param {*} error
     */
	handleImageErrored(error) {
    	console.log(error);
    	this.setState({ loadStatus: 'error' }, () => {
			this.props.onError();
		});
	}

	/**
     * 渲染加载中界面
     */
	renderPending() {
    	const { style } = this.props;
    	return (
	    <Animated.View style={[style, {
				position: 'absolute',
				backgroundColor: this.state.backgroundColor.interpolate({
					inputRange: [0, 1],
					outputRange: ['#F7F9FB', Colors.C7],
				}),
			}]}
	    >
	    </Animated.View>
    	);
	}

	/**
     * 渲染加载失败界面
     */
	renderError() {
    	let { style, defaultSource } = this.props;
    	if (typeof style === 'number') {
    		style = StyleSheet.flatten(style);
    	}
    	const iconSize = Math.min(style.height, style.width) / 3;
    	return (
    		defaultSource
    			? <Image source={defaultSource} style={[{ position: 'absolute' }, style]} />
    			: (
	       			<View style={[{
    						justifyContent: 'center', backgroundColor: Colors.C7, position: 'absolute', alignItems: 'center',
					}, style]}
	       			/>
    			)
    	);
	}

	render() {
		let { style, source } = this.props;
		const { loadStatus } = this.state;
    	// 兼容 uri为null的情况
    	if (source.hasOwnProperty('uri') && typeof source.uri !== 'string') {
    		source = { ...source, uri: '' };
    	}
    	// 兼容Androud无法对空字符串进行处理情况
    	if (Platform.OS === 'android' && source.hasOwnProperty('uri') && !source.uri) {
    		source = { ...source, uri: ' ' };
    	}
    	return (
			<View style={[style, { overflow: 'hidden' }]}>
				<Image
					source={source}
					// source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536058126543&di=feb3c32b5cf72366c50b745a88e50507&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D3806537842%2C2941389672%26fm%3D214%26gp%3D0.jpg' }}
					style={style}
					onLoadStart={this.onLoadStart.bind(this)}
					onLoadEnd={this.onLoadEnd.bind(this)}
					onLoad={this.handleImageLoaded.bind(this)}
					onError={this.handleImageErrored.bind(this)}
				/>
				{loadStatus === 'pending' && this.renderPending()}
				{loadStatus === 'error' && this.renderError()}
			</View>
    	);
	}
}
