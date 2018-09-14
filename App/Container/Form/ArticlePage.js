/*
 * @Author: fantao.meng
 * @Date: 2018-08-26 18:22:30
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-10 15:25:48
 */

import React, { ReactDOM, ReactChildren, ReactElement } from 'react';
import {
	View, Image, Text, ScrollView, FlatList, RefreshControl, WebView, StyleSheet, TouchableWithoutFeedback, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { TOGGLE_TAR_BAR } from '../../Redux/ActionTypes'
import { LoadImage, LoadView, ScrollTopBar, ItemSeparator, FlatListRefresh } from '../../Component';
import { Colors, px2dp, Metrics, FontSize, FontFamily } from '../../Theme';
import { FLAST_SOURCE, HEALTH_COURSE } from '../../Utils/Constant'

const ARTICLE_PICUTRE_WIDTH = (Metrics.screenWidth - px2dp(30) * 2 - px2dp(14) * 2) / 3;
const ARTICLE_PICUTRE_HEIGHT = ARTICLE_PICUTRE_WIDTH * 0.618;

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

	/**
	 * 文章模版点击事件
	 * @param {*} item 
	 */
	onClickArticleItem(item) {
        let url = 'https://mp.weixin.qq.com/s?__biz=MzA3MjIzMzg0Mw==&mid=2649973550&idx=1&sn=86bb07916bfa7d9d918e8fd4a5242c10'
		this.props.navigation.navigate('webViewForm', { url })
	}

	/**
	 * 渲染文章模版
	 * @param {*} item 
	 */
	renderArticleItem(item) {
		let { title, author, pageViews, source } = item
		return (
			<TouchableOpacity onPress={() => this.onClickArticleItem(item)}>
				<View style={Styles.article}>
					<Text style={Styles.articleTitle} numberOfLines={2}>{title}</Text>
					<View style={Styles.imageContent}>
						{source.map((element, index) => 
							<LoadImage key={Number(index)} source={element} style={[Styles.articleAvatar, { width: ARTICLE_PICUTRE_WIDTH, height: ARTICLE_PICUTRE_HEIGHT }]} />
						)}
					</View>
					<View style={Styles.textContent}>
						<Text style={[Styles.articleText, { maxWidth: Metrics.screenWidth * 2 / 3 }]} numberOfLines={1}>{author}</Text>
						<Text style={[Styles.articleText, { marginLeft: px2dp(20) }]} numberOfLines={1}>{`${pageViews}浏览`}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
	
	/**
	 * 渲染TopBar
	 */
	renderScrollTopBar () {
		return (
			<ScrollTopBar
				// topBarUnderlineStyle={{}}				// 下划线样式
				labelList={HEALTH_COURSE}					// 标题栏素材
				// topBarInactiveTextColor={Colors.C5}		// label 文字非选中颜色
				// topBarActiveTextColor={Colors.CB}		// label 文字选中颜色
				// topBarBackgroundColor={Colors.C8}		// 背景颜色
			>
				{HEALTH_COURSE.map((e, i) => {
					return (
						<FlatListRefresh
							key={i}
							style={Styles.flast}
							data={i === 0 ? FLAST_SOURCE : []}
							renderItem={({ item, index }) => this.renderArticleItem(item)}
							keyExtractor={(item, index) => String(index)}
							ItemSeparatorComponent={() => <ItemSeparator />}
							refreshing={this.state.refreshing}
							onRefresh={() => {
								this.setState({ refreshing: true }, () => {
									const that = this;
									setTimeout(() => {
										that.setState({ refreshing: false })
									}, 500);
								})
							}}
							endReaching={i === 0 ? this.state.endReaching : false}
							onEndReached={() => {
								// this.setState({ endReaching: true }, () => {
								// 	const that = this;
								// 	setTimeout(() => {
								// 		that.setState({ endReaching: false })
								// 	}, 3000);
								// })
							}}
						/>
					)
				})}
			</ScrollTopBar>
		)
	}

    render() {
    	return (
    		<View style={Styles.container}>
				{this.renderScrollTopBar()}
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
	flast: { flex: 1, paddingLeft: px2dp(30), paddingRight: px2dp(30), backgroundColor: Colors.C8 },
	article: { paddingTop: px2dp(20), paddingBottom: px2dp(20) },
	articleTitle: { color: Colors.C1, fontSize: FontSize(28), fontFamily: FontFamily.PF_M },
	imageContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: px2dp(20) },
	articleAvatar: { borderRadius: px2dp(6) },
	textContent: { flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: px2dp(10) },
	articleText: { color: Colors.C5, fontSize: FontSize(18), fontFamily: FontFamily.PF_L } 
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
