/*
 * @Author: fantao.meng
 * @Date: 2018-08-26 18:22:30
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-17 19:30:34
 */

import React, { ReactDOM, ReactChildren, ReactElement } from 'react';
import {
	View, Image, Text, ScrollView, FlatList, WebView, StyleSheet, Animated, PanResponder, TouchableWithoutFeedback, ViewPropTypes, InteractionManager,
} from 'react-native';
import * as PropTypes from 'prop-types';
import { ItemSeparator } from './index';
import {
	Colors, px2dp, Metrics, FontSize,
} from '../Theme';

const UNDERLINE_WIDTH = px2dp(120);		// 下划线宽度
const ITEM_GRAP = px2dp(20);				// 图片之间的grap
const ANIMATED_DURATION = 500;			// 动画duration

class ScrollTopBar extends React.Component {
	static propTypes = {
		topBarUnderlineStyle: PropTypes.oneOfType([
			ViewPropTypes.style,
			PropTypes.number,
		]),
		labelList: PropTypes.array,
		topBarInactiveTextColor: PropTypes.string,
		topBarActiveTextColor: PropTypes.string,
		topBarBackgroundColor: PropTypes.string,
	};

	static defaultProps = {
		topBarUnderlineStyle: {
			backgroundColor: Colors.CB, height: px2dp(8), width: UNDERLINE_WIDTH, marginTop: -px2dp(8),
		},
		labelList: ['推荐', '军事', '政治', '财经', '娱乐', '社会', '生活', '美食', '旅行'],
		topBarInactiveTextColor: Colors.C5,
		topBarActiveTextColor: Colors.CB,
		topBarBackgroundColor: Colors.C3,
	}

	constructor(props) {
    	super(props);
    	this.state = {
    		index: 0,
			position: new Animated.Value(0),
			topBar: new Animated.Value(0),
			underline: new Animated.Value(ITEM_GRAP),
		};
		this.topBarContentWidth = 0;
		this.touchMove = { pageX: -1, pageY: -1 };		// 记录内容区手势
		this.clickHistory = [0];
	}

	componentWillMount() {
		// TopBar区滑动事件响应
		this._topBarPanResponder = PanResponder.create({
    		// 要求成为响应者：
			onStartShouldSetPanResponder: (evt, gestureState) => true,
    		onStartShouldSetPanResponderCapture: (evt, gestureState) => {
				// 发生点击事件，将事件响应交给Touchable控件
				if (Math.abs(gestureState.dx) < 4 && Math.abs(gestureState.dy) < 4) return false;
				// 发生拖动事件
				return true;
			},
    		onMoveShouldSetPanResponder: (evt, gestureState) => true,
    		onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    		onPanResponderGrant: (evt, gestureState) => {
    			// 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
				// gestureState.{x,y} 现在会被设置为0
    		},
    		onPanResponderMove: (evt, gestureState) => {
    			// 最近一次的移动距离为gestureState.move{X,Y}
    			// 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
    		},
    		onPanResponderTerminationRequest: (evt, gestureState) => true,
    		onPanResponderRelease: (evt, gestureState) => {
    			// 用户放开了所有的触摸点，且此时视图已经成为了响应者。
				// 一般来说这意味着一个手势操作已经成功完成。
				this.onTopBarPanResponderRelease(gestureState);
    		},
    		onPanResponderTerminate: (evt, gestureState) => {
    			// 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    		},
    		onShouldBlockNativeResponder: (evt, gestureState) => true
    		,
    	});
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.switchTopBar(this.state.index);
		});
	}

	shouldComponentUpdate (nextProps, nextState) {
		if (this.clickHistory.indexOf(nextState.index) === -1) {
			console.log(nextState.index);
			// 点击记录
			this.clickHistory.push(nextState.index);
		}
		return true;
	}
	
	/**
	 * Content 手势停止，开启动画
	 * @param {*} gestureState
	 */
	onPanResponderRelease(gestureState) {
		// console.log(gestureState)
		// 降低界面滑动敏感度
		if (Math.abs(gestureState.dx) < 60 || Math.abs(gestureState.dy) > 20) return;
		if (gestureState.dx < 0) {
			// 往左滑动,渲染右侧界面
			if (this.state.index < (this.props.labelList.length - 1)) {
				this.refs[`topBar${this.state.index + 1}`].measure((x, y, width, height, pageX, pageY) => {
					// console.log('width=' + width + ',x=' + x + ',pageX' + pageX)
					Animated.parallel([
						Animated.timing(this.state.position, {
							toValue: -Metrics.screenWidth * (this.state.index + 1),
							duration: ANIMATED_DURATION,
							isInteraction: true,
						}),
						Animated.timing(this.state.underline, {
							toValue: x + (width - UNDERLINE_WIDTH) / 2,
							duration: ANIMATED_DURATION,
							isInteraction: true,
						}),
					]).start(() => {
						this.setState({ index: ++this.state.index }, () => {
							if (this.state.index < this.props.labelList.length - 1) this.checkTopBarPosition('forward');
						});
					});
				});
			}
		} else {
			// 往右滑动,渲染左侧界面
			if (this.state.index <= 0) return;
			this.refs[`topBar${this.state.index - 1}`].measure((x, y, width, height, pageX, pageY) => {
				// console.log('width=' + width + ',x=' + x + ',pageX' + pageX)
				Animated.parallel([
					Animated.timing(this.state.position, {
						toValue: -Metrics.screenWidth * (this.state.index - 1),
						duration: ANIMATED_DURATION,
						isInteraction: true,
					}),
					Animated.timing(this.state.underline, {
						toValue: x + (width - UNDERLINE_WIDTH) / 2,
						duration: ANIMATED_DURATION,
						isInteraction: true,
					}),
				]).start(() => {
					this.setState({ index: --this.state.index }, () => {
						if (this.state.index > 0) this.checkTopBarPosition('back');
					});
				});
			});
		}
	}

	/**
	 * TopBar 手势停止，开启动画
	 * @param {*} gestureState
	 */
	onTopBarPanResponderRelease(gestureState) {
		// console.log(gestureState)
		gestureState = { ...gestureState };
		// 是否探明TopBar边界
		if (!this.topBarContentWidth) {
			this.refs[`topBar${this.props.labelList.length - 1}`].measure((x, y, width, height, pageX, pageY) => {
				// console.log('width=' + width + ',x=' + x + ',pageX' + pageX)
				// console.log(`TopBar的长度为=${width + x}`)
				this.topBarContentWidth = width + x;
				this.onTopBarPanResponderRelease(gestureState);
			});
			return;
		}

		// 如果topBar区域小于界面宽度，放弃topBar滑动动作
		if (this.topBarContentWidth <= Metrics.screenWidth) return;

		// 降低界面滑动敏感度
		if (Math.abs(gestureState.dx) < 40 || Math.abs(gestureState.dy) > 20) return;
		// 获取当前AnimatedValue的number
		let translateX = this.state.topBar.__getValue();
		if (gestureState.dx < 0) {
			// 往左滑动,渲染右侧界面
			translateX -= Metrics.screenWidth / 2;
			if (translateX < (-this.topBarContentWidth + Metrics.screenWidth)) translateX = -this.topBarContentWidth + Metrics.screenWidth;
		} else {
			// 往右滑动,渲染左侧界面
			translateX += Metrics.screenWidth / 2;
			if (translateX > 0) translateX = 0;
		}
		// console.log(translateX)
		Animated.timing(this.state.topBar, {
			toValue: translateX,
			duration: ANIMATED_DURATION,
			isInteraction: true,
		}).start();
	}

	/**
	 * 内容区手势捕捉
	 * @param {*} key
	 * @param {*} value
	 */
	onTouchMove(key, nativeEvent) {
		if (key === 'start') {
			this.touchMove = { pageX: nativeEvent.pageX, pageY: nativeEvent.pageY };
		} else if (key === 'end') {
			const { pageX, pageY } = this.touchMove;
			this.onPanResponderRelease({ dx: nativeEvent.pageX - pageX, dy: nativeEvent.pageY - pageY });
		}
	}

	/**
	 * 切换TopBar
	 * @param {*} index
	 */
	switchTopBar(index) {
		// console.log(index)
		// 获取
		if (this.state.index === 0 && index === 0) {
			return;
		}

		if (index > this.state.index) {
			// 往左滑动,渲染右侧界面
			if (this.state.index < (this.props.labelList.length - 1)) {
				this.refs[`topBar${index}`].measure((x, y, width, height, pageX, pageY) => {
					// console.log('width=' + width + ',x=' + x + ',pageX' + pageX)
					Animated.parallel([
						Animated.timing(this.state.position, {
							toValue: -Metrics.screenWidth * index,
							duration: ANIMATED_DURATION,
							isInteraction: true,
						}),
						Animated.timing(this.state.underline, {
							toValue: x + (width - UNDERLINE_WIDTH) / 2,
							duration: ANIMATED_DURATION,
							isInteraction: true,
						}),
					]).start(() => {
						this.setState({ index }, () => {
							this.checkTopBarPosition('forward');
						});
					});
				});
			}
		} else {
			// 往右滑动,渲染左侧界面
			if (this.state.index > 0) {
				this.refs[`topBar${index}`].measure((x, y, width, height, pageX, pageY) => {
					// console.log('width=' + width + ',x=' + x + ',pageX' + pageX)
					Animated.parallel([
						Animated.timing(this.state.position, {
							toValue: -Metrics.screenWidth * index,
							duration: ANIMATED_DURATION,
							isInteraction: true,
						}),
						Animated.timing(this.state.underline, {
							toValue: x + (width - UNDERLINE_WIDTH) / 2,
							duration: ANIMATED_DURATION,
							isInteraction: true,
						}),
					]).start(() => {
						this.setState({ index }, () => {
							this.checkTopBarPosition('back');
						});
					});
				});
			}
		}
	}

	/**
	 * 判断下一个TopBar下次滑动是否可视
	 */
	checkTopBarPosition(flag) {
		// 是否探明TopBar边界
		if (!this.topBarContentWidth) {
			this.refs[`topBar${this.props.labelList.length - 1}`].measure((x, y, width, height, pageX, pageY) => {
				// console.log('width=' + width + ',x=' + x + ',pageX' + pageX)
				// console.log(`TopBar的长度为=${width + x}`)
				this.topBarContentWidth = width + x;
				this.checkTopBarPosition(flag);
			});
			return;
		}

		// 如果topBar区域小于界面宽度，放弃边界检查
		if (this.topBarContentWidth <= Metrics.screenWidth) return;

		// 左边界情况处理
		if (this.state.index === 0 && this.state.topBar.__getValue() !== 0) {
			// console.log('左')
			// console.log(this.state.topBar.__getValue())
			Animated.timing(this.state.topBar, {
				toValue: 0,
				duration: ANIMATED_DURATION,
				isInteraction: true,
			}).start();
			return;
		}
		// 右边界情况处理
		if (this.state.index === (this.props.labelList.length - 1) && this.state.topBar.__getValue() !== -this.topBarContentWidth) {
			// console.log('右')
			// console.log(this.state.topBar.__getValue())
			Animated.timing(this.state.topBar, {
				toValue: -(this.topBarContentWidth - Metrics.screenWidth),
				duration: ANIMATED_DURATION,
				isInteraction: true,
			}).start();
			return;
		}

		if (flag === 'forward' && this.state.index < (this.props.labelList.length - 1)) {
			this.refs[`topBar${this.state.index + 1}`].measure((x, y, width, height, pageX, pageY) => {
				// console.log('width=' + width + ',x=' + x + ',pageX' + pageX)
				if (pageX + width > Metrics.screenWidth) {
					let translateX = x + Metrics.screenWidth / 2 - pageX;
					// 判断下次滑动是否触底
					if (this.topBarContentWidth && translateX > (this.topBarContentWidth - Metrics.screenWidth)) translateX = this.topBarContentWidth - Metrics.screenWidth;
					// console.log('translateX=' + translateX)
					Animated.timing(this.state.topBar, {
						toValue: -translateX,
						duration: ANIMATED_DURATION,
						isInteraction: true,
					}).start();
				}
			});
		} else if (flag === 'back' && this.state.index > 0) {
			this.refs[`topBar${this.state.index - 1}`].measure((x, y, width, height, pageX, pageY) => {
				// console.log('width=' + width + ',x=' + x + ',pageX' + pageX)
				if (pageX < 0) {
					let translateX = x - Metrics.screenWidth / 2 - pageX;
					// 判断下次滑动是否触底
					if (translateX < 0) translateX = 0;
					// console.log('translateX=' + translateX)
					Animated.timing(this.state.topBar, {
						toValue: -translateX,
						duration: ANIMATED_DURATION,
						isInteraction: true,
					}).start();
				}
			});
		}
	}

	/**
	 * 渲染列表内容
	 */
	renderContent() {
    	return (
			<Animated.View style={{
				flex: 1,
				flexDirection: 'row',
				width: Metrics.screenWidth * this.props.labelList.length,
				transform: [{ translateX: this.state.position }],
			}}
			>
				{React.Children.map(this.props.children, (child, index) => {
					const props = {
						...child.props,
						onMoveShouldSetResponder: e => true,
						// onResponderRelease: e => this.onPanResponderRelease({ dx: e.nativeEvent.locationX, dy: e.nativeEvent.locationY }),
						onTouchStart: e => this.onTouchMove('start', e.nativeEvent),
						onTouchEnd: e => this.onTouchMove('end', e.nativeEvent),
					};
					return this.clickHistory.indexOf(index) !== -1 
						? 	<View {...props} style={{ flex: 1 }}>{React.cloneElement(child, props)}</View>
						: 	<View {...props} style={{ width: Metrics.screenWidth, height: Metrics.screenHeight }} />
				})}
			</Animated.View>
    	);
	}

	/**
     * 渲染TopBar
     */
	renderTopBar() {
    	return (
			<Animated.View {...this._topBarPanResponder.panHandlers} style={{ minWidth: Metrics.screenWidth, backgroundColor: this.props.topBarBackgroundColor, transform: [{ translateX: this.state.topBar }] }}>
				<View style={{ flexDirection: 'row', aliginItems: 'center' }}>
					{ this.props.labelList.map((item, index) => {
						const check = this.state.index === index;
						const title = typeof item === 'object' ? item.title : item;
						return (
							<TouchableWithoutFeedback key={index} onPress={() => this.switchTopBar(index)} key={index}>
								<View
									ref={`topBar${index}`}
									style={{
										justifyContent: 'center', padding: ITEM_GRAP, paddingTop: Metrics.STATUSBAR_HEIGHT + px2dp(40), paddingBottom: px2dp(40), backgroundColor: this.props.topBarBackgroundColor,
									}}
								>
									<Text style={[{ color: this.props.topBarInactiveTextColor }, check && { color: this.props.topBarActiveTextColor }]}>{title}</Text>
								</View>
							</TouchableWithoutFeedback>
						);
					})}
				</View>
				{this.renderTopUnderline()}
			</Animated.View>
    	);
	}

	/**
	 * 渲染TopBar 的 UnderLine
	 */
	renderTopUnderline() {
		return (
			<Animated.View style={[{ transform: [{ translateX: this.state.underline }] }, this.props.topBarUnderlineStyle]} />
		);
	}

	render() {
    	return (
			<View style={Styles.container}>
				{this.renderTopBar()}
				{this.renderContent()}
			</View>
    	);
	}
}

const Styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: Colors.C7 },
});

export default ScrollTopBar;
