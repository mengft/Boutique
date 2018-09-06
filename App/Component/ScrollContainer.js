/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:51:54
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-06 10:05:42
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import { ScrollView, Animated, StyleSheet } from 'react-native';
import { Colors } from '../Theme';

export default class ScrollContainer extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        scrollOffset: PropTypes.number.isRequired,
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number,
        ]),
    };

    static defaultProps = {
        title: '标题',
        scrollOffset: 0,
        style: {}
    };

	constructor(props) {
		super(props);
		this.state = {
		};
		this.contentOffsetY = 0;
	};

	/**
	 * 监听ScrollView滑动
	 * @param {*} contentOffsetY
	 */
	onScroll(contentOffsetY) {
        let scrollOffset = this.props.scrollOffset;
		// 屏蔽下拉、Header组件测量失败
		if (contentOffsetY === this.contentOffsetY || contentOffsetY < 0 || !scrollOffset) return;

		if (this.contentOffsetY < scrollOffset && contentOffsetY >= scrollOffset) {
			this.props.navigation.setParams({ title: this.props.title });
			// 上滑
			Animated.timing(this.props.navigation.state.params.opacity, {
				toValue: 1,
				duration: 500,
			}).start();
		} else if (this.contentOffsetY >= scrollOffset && contentOffsetY < scrollOffset) {
			// 下滑
			Animated.timing(this.props.navigation.state.params.opacity, {
				toValue: 0,
				duration: 500,
			}).start(() => {
				this.props.navigation.setParams({ title: '' });
			});
		}
		this.contentOffsetY = contentOffsetY;
	}

	render() {
		return (
			<ScrollView style={[Styles.container, this.props.style]} scrollEventThrottle={16} onScroll={e => this.onScroll(e.nativeEvent.contentOffset.y)}>
                {this.props.children}
			</ScrollView>
		);
	}
}


const Styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: Colors.CBK },
});

/**
 * ScrollContainer 可滑动的Container，可实现navigation的
 * 
 * headerTitle: navigation.getParam('title', ''),
 * headerTitleStyle: {
 *     ...style,
 *     opacity: navigation.getParam('opacity', new Animated.Value(0)),
 * }
 */