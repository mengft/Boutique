/*
 * @Author: fantao.meng
 * @Date: 2018-08-26 18:22:30
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-17 18:37:04
 */

import React, { ReactDOM, ReactChildren, ReactElement } from 'react';
import {
	View, Image, Text, ScrollView, FlatList, RefreshControl, WebView, StyleSheet, TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { TOGGLE_TAR_BAR } from '../../Redux/ActionTypes'
import { ScrollTopBar} from '../../Component';
import { Colors, px2dp, Metrics, FontSize, FontFamily } from '../../Theme';
import { HEALTH_COURSE } from '../../Utils/Constant'
import ArticleList from './ArticleList';

class ArticlePage extends React.Component {
    static navigationOptions = ({ navigation }) => ({
    	header: null,
    });

    constructor(props) {
    	super(props);
    	this.state = {
		};
	}

	componentDidMount () {
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus',
			payload => {
				this.props.toggleTabBarAction(true)
			}
		);
		this.willBlurSubscription = this.props.navigation.addListener(
			'willBlur',
			payload => {
				this.props.toggleTabBarAction(false)
			}
		);
	}

	componentWillUnmount () {
		this.willFocusSubscription.remove();
		this.willBlurSubscription.remove();
	}
	
    render() {
    	return (
    		<View style={Styles.container}>
				<ScrollTopBar
					// topBarUnderlineStyle={{}}				// 下划线样式
					labelList={HEALTH_COURSE}					// 标题栏素材
					// topBarInactiveTextColor={Colors.C5}		// label 文字非选中颜色
					// topBarActiveTextColor={Colors.CB}		// label 文字选中颜色
					// topBarBackgroundColor={Colors.C8}		// 背景颜色
				>
					{HEALTH_COURSE.map((e, i) => {
						return (
							<ArticleList key={i} index={i} navigation={this.props.navigation} />
						)
					})}
				</ScrollTopBar>
			</View>
    	);
    }
}

const mapStateToProps = state => ({
	mainNavigatorReducer: state.mainNavigatorReducer
});

const mapDispatchToProps = dispatch => ({
	toggleTabBarAction: (tabBarVisible) => dispatch({ type: TOGGLE_TAR_BAR, payload: { tabBarVisible } }),
})

const Styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: Colors.C8 },
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
