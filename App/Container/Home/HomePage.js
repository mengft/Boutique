/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:00:15
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-08-20 14:17:31
 */

import React from 'react';
import {
	View, Text, Image, ScrollView, FlatList, StyleSheet, TouchableWithoutFeedback, Animated, Easing,
} from 'react-native';
import {
	px2dp, Colors, ThemeStyles, FontSize, Metrics,
} from '../../Theme';

const FlatListSource = [
	{
		title: '时下热门', text: '沧海一声笑，滔滔两岸潮', sourceType: 'image', source: require('../../Assets/Images/Home/WechatIMG600.jpg'),
	},
	{
		title: 'APP 改变生活', text: '生活不止眼前的苟且，还有诗和远方', sourceType: 'image', source: require('../../Assets/Images/Home/WechatIMG602.jpg'),
	},
	// {
	// 	title: '今日主题', text: '能不忆江南', sourceType: 'image', source: require('../../Assets/Images/Home/WechatIMG603.jpg'),
	// },
	// {
	// 	title: '都市空间', text: '水泥、钢筋、车流、行人', sourceType: 'image', source: require('../../Assets/Images/Home/WechatIMG604.jpg'),
	// },
	{
		title: '夜景俯瞰', text: '中国香港的百万夜景', sourceType: 'image', source: require('../../Assets/Images/Home/WechatIMG605.jpg'),
	},
	{
		title: '美国漫威', text: '来啊来啊，你的蜘蛛侠玩具到了', sourceType: 'image', source: require('../../Assets/Images/Home/WechatIMG606.jpg'),
	},
	{
		title: '日本动画', text: '今天我是蜡笔小新，不是佩琦', sourceType: 'image', source: require('../../Assets/Images/Home/WechatIMG607.jpg'),
	},
	// {
	// 	title: '岛国动漫', text: '黑武士的心在跳', sourceType: 'image', source: require('../../Assets/Images/Home/WechatIMG608.jpg'),
	// },
	{
		title: '动漫推荐', text: '在梦里，我只记得你的名字', sourceType: 'image', source: require('../../Assets/Images/Home/WechatIMG609.jpg'),
	},
];

class HomePage extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		header: null,
	})

	constructor(props) {
		super(props);
		this.state = {
			index: null,
			scale: new Animated.Value(1),
		};
	}

	/**
	 * 列表Item PressIn
	 * @param {*} index
	 */
	onItemPressIn(index) {
		this.setState({ index }, () => {
			Animated.timing(
				this.state.scale,
				{
					toValue: 0.96,
					duration: 340,
					// easing: Easing.linear,
				},
			).start();
		});
	}

	/**
	 * 列表Item PressOut
	 */
	onItemPressOut() {
		Animated.timing(
			this.state.scale,
			{
				toValue: 1,
				duration: 340,
				// easing: Easing.ease,
			},
		).start();
	}

	/**
	 * 渲染列表Item
	 * @param {*} item
	 */
	renderItem({ item, index }) {
		const {
			title, text, sourceType, source,
		} = item;
		return (
			<TouchableWithoutFeedback delayPressIn={0} onPressIn={() => this.onItemPressIn(index)} onPressOut={() => this.onItemPressOut()}>
				<Animated.View style={[Styles.item, this.state.index === index && { transform: [{ scale: this.state.scale }] }]}>
					{ sourceType === 'image'
					&& <Image style={Styles.itemAvatar} source={source} />
					}
					<View style={Styles.itemAbsolute}>
						<Text style={Styles.itemText}>{title}</Text>
						<Text style={[Styles.itemText, { fontSize: FontSize(50) }]}>{text}</Text>
					</View>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}

	/**
	 * 渲染列表Header
	 */
	renderListHeader() {
		return (
			<View style={Styles.header}>
				<View style={Styles.headerLeft}>
					<Text style={Styles.date}>8月20日 星期一</Text>
					<Text style={Styles.day}>Today</Text>
				</View>
				<Image style={Styles.avatar} source={require('../../Assets/Images/Home/WechatIMG601.jpg')} />
			</View>
		);
	}

	render() {
		return (
			<View style={Styles.container}>
				<FlatList
					style={Styles.flat}
					data={FlatListSource}
					renderItem={this.renderItem.bind(this)}
					ListHeaderComponent={this.renderListHeader}
					ItemSeparatorComponent={() => <View style={Styles.itemSeparator} />}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		);
	}
}

const Styles = StyleSheet.create({
	container: {
		flex: 1, backgroundColor: Colors.C8,
	},
	flat: {
		marginTop: ThemeStyles.STATUSBAR_HEIGHT, paddingBottom: ThemeStyles.STATUSBAR_HEIGHT, paddingLeft: Metrics.mainPadding, paddingRight: Metrics.mainPadding,
	},
	date: { fontSize: FontSize(24), color: Colors.C3, fontFamily: 'PingFang-SC-Medium' },
	day: {
		fontSize: FontSize(40), color: Colors.C2, fontFamily: 'PingFang-SC-Medium', fontWeight: 'bold',
	},
	header: {
		flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Metrics.mainPadding, marginBottom: px2dp(20),
	},
	avatar: { width: px2dp(80), height: px2dp(80), borderRadius: px2dp(40) },
	item: { },
	itemAvatar: { width: Metrics.screenWidth - Metrics.mainPadding * 2, height: px2dp(860), borderRadius: px2dp(26) },
	itemAbsolute: {
		position: 'absolute', left: Metrics.mainPadding, right: Metrics.mainPadding, top: Metrics.mainPadding,
	},
	itemText: {
		fontSize: FontSize(26), color: Colors.C8, fontFamily: 'PingFang-SC-Medium', fontWeight: 'bold',
	},
	itemSeparator: { height: px2dp(50) },
});

export default HomePage;
