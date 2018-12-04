/*
 * @Author: fantao.meng
 * @Date: 2018-08-26 18:22:30
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-11-26 13:42:33
 */

import React, { ReactDOM, ReactChildren, ReactElement } from 'react';
import {
	View, Image, Text, ScrollView, FlatList, RefreshControl, WebView, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, StatusBar, Platform
} from 'react-native';
import { connect } from 'react-redux';
import { TOGGLE_TAR_BAR } from '../../Redux/ActionTypes'
import { ScrollTopBar} from '../../Component';
import { Colors, px2dp, Metrics, FontSize, FontFamily, ThemeStyles } from '../../Theme';
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
				this.props.toggleTabBarAction(true);
				StatusBar.setBarStyle("light-content");
			}
		);
		this.willBlurSubscription = this.props.navigation.addListener(
			'willBlur',
			payload => {
				this.props.toggleTabBarAction(false);
				StatusBar.setBarStyle("default");
			}
		);
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.isTabFocus && !this.props.isTabFocus) {
			StatusBar.setBarStyle("light-content");
		}
		if (!nextProps.isTabFocus && this.props.isTabFocus) {
			StatusBar.setBarStyle("default");
		}
	}

	componentWillUnmount () {
		this.willFocusSubscription.remove();
		this.willBlurSubscription.remove();
	}
	
    render() {
    	return (
    		<View style={ThemeStyles.container}>
				{/* <StatusBar barStyle='light-content' backgroundColor="#54657e" /> */}
				<ScrollTopBar
					// topBarUnderlineStyle={{}}				// 下划线样式
					labelList={['推荐', '军事', '政治', '财经', '娱乐', '社会', '生活', '美食', '旅行']}					// 标题栏素材
					// topBarInactiveTextColor={Colors.C5}		// label 文字非选中颜色
					// topBarActiveTextColor={Colors.CB}		// label 文字选中颜色
					// topBarBackgroundColor={Colors.C8}		// 背景颜色
				>
					{['推荐', '军事', '政治', '财经', '娱乐', '社会', '生活', '美食', '旅行'].map((e, i) => {
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
	mainNavigatorReducer: state.mainNavigatorReducer,
	isTabFocus: state.mainNavigatorReducer.index === 1,
});

const mapDispatchToProps = dispatch => ({
	toggleTabBarAction: (tabBarVisible) => dispatch({ type: TOGGLE_TAR_BAR, payload: { tabBarVisible } }),
})

const Styles = StyleSheet.create({
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
