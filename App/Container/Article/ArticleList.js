/*
 * @Author: fantao.meng 
 * @Date: 2018-09-17 16:54:17 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-12-04 11:08:39
 */

import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import { LoadImage, LoadView, ItemSeparator, FlatListRefresh } from '../../Component';
import { px2dp, Colors, Metrics, FontSize, FontFamily } from '../../Theme';
import { FLAST_SOURCE } from '../../Utils/Constant'

const ARTICLE_PICUTRE_WIDTH = (Metrics.screenWidth - px2dp(30) * 2 - px2dp(14) * 2) / 3;
const ARTICLE_PICUTRE_HEIGHT = ARTICLE_PICUTRE_WIDTH * 0.618;

class ArticleList extends ScrollView {
    constructor(props) {
        super(props);
        that = this;
        this.state = {
            refreshing: false,
            endReaching: false,
            source: FLAST_SOURCE,
        };
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
			<TouchableOpacity onPress={() => this.onClickArticleItem(item)} activeOpacity={0.8}>
				<View style={Styles.article}>
					<Text style={Styles.articleTitle} numberOfLines={2}>{title}</Text>
					<View style={Styles.imageContent}>
						{source.map((element, index) => 
							<LoadImage key={Number(index)} source={element} style={[Styles.articleAvatar, { width: ARTICLE_PICUTRE_WIDTH, height: ARTICLE_PICUTRE_HEIGHT }]} type='load' />
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

    render () {
        return (
            <FlatListRefresh
                style={Styles.flast}
                data={this.state.source}
                renderItem={({ item, index }) => this.renderArticleItem(item)}
                keyExtractor={(item, index) => String(index)}
                ItemSeparatorComponent={() => <ItemSeparator />}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                    this.setState({ refreshing: true }, () => {
                        setTimeout(() => {
                            that.setState({ refreshing: false })
                        }, 1000);
                    })
                }}
                onEndReachedThreshold={0.5}
                endReaching={this.state.endReaching}
                onEndReached={e => {
                    // 可加上数据源的校验
                    if (this.state.endReaching) return;
                    this.setState({ endReaching: true }, () => {
                        setTimeout(() => {
                            let temp = this.state.source;
                            temp.concat(FLAST_SOURCE);
                            that.setState({
                                source: temp.concat(FLAST_SOURCE)
                            }, () => {
                                that.setState({ endReaching: false })
                            })
                        }, 3000);
                    });
                }}
            />
        )
    }
}

const Styles = StyleSheet.create({
    flast: { flex: 1, paddingLeft: px2dp(30), paddingRight: px2dp(30), backgroundColor: Colors.C8 },
	article: { paddingTop: px2dp(20), paddingBottom: px2dp(20) },
	articleTitle: { color: Colors.C1, fontSize: FontSize(28), fontFamily: FontFamily.PF_M },
	imageContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: px2dp(20) },
	articleAvatar: { borderRadius: px2dp(6) },
	textContent: { flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: px2dp(10) },
	articleText: { color: Colors.C5, fontSize: FontSize(18), fontFamily: FontFamily.PF_L } 
});

export default ArticleList;