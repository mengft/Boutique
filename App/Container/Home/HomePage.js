/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:00:15
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-03 17:20:27
 */

import React from 'react';
import {
	View, Text, Image, FlatList, Modal, ScrollView, WebView, StyleSheet, TouchableWithoutFeedback, Animated, NativeModules,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadImage, LoadView } from '../../Component';
import { TOGGLE_TAR_BAR } from '../../Redux/ActionTypes';
import {
	px2dp, Colors, ThemeStyles, FontSize, Metrics,
} from '../../Theme';
import * as Config from '../../Config';

const FlatListSource = [
	{
		title: '时下热门', text: '沧海一声笑，滔滔两岸潮', sourceType: 'image', source: { uri: `${Config.Host}/Assets/Images/Home/WechatIMG600.jpg` },
	},
	{
		title: '对话开发者', text: '这里便是诗和远方', sourceType: 'video', source: { uri: `${Config.Host}/Assets/Images/Home/WechatIMG602.jpg` },
	},
	{
		title: '夜景俯瞰', text: '中国香港的百万夜景', sourceType: 'image', source: { uri: `${Config.Host}/Assets/Images/Home/WechatIMG605.jpg` },
	},
	{
		title: '美国漫威', text: 'I\'m Your Bat Man', sourceType: 'appsale', source: { uri: `${Config.Host}/Assets/Images/Home/WechatIMG606.jpg` },
	},
	{
		title: '日本动画', text: '蜡笔小新，不是佩琦', sourceType: 'image', source: { uri: `${Config.Host}/Assets/Images/Home/WechatIMG607.jpg` },
	},
	{
		title: '动漫推荐', text: '在梦里，我只记得你的名字', sourceType: 'image', source: { uri: `${Config.Host}/Assets/Images/Home/WechatIMG609.jpg` },
	},
];

const FlatListFooterSource = [
	{
		name: '抖音短视频-好玩的人', type: '摄影与录像', iconUri: 'https://www.apple.com/autopush/cn/itunes/charts/free-apps/images/2018/2/21d871d12d8e55991510b8b7c3b069fec3fbc9027735a66af7be787290429ac4.jpg', price: '¥12.00',
	},
	{
		name: '闲鱼-挂闲鱼，闲置能换dskflskflskflsdk', type: '购物', iconUri: 'https://www.apple.com/autopush/cn/itunes/charts/free-apps/images/2018/2/e5c8bebcb18d3b059e641b43344960494053125d3a631ce71d50ada6592671e6.jpg', price: false,
	},
	{
		name: '喜马拉雅FM', type: '图书', iconUri: 'https://www.apple.com/autopush/cn/itunes/charts/free-apps/images/2018/2/38095967cb4a65e1c0492d741912cdc5ba6c6a07fd02bf5f2224f20fd16791fd.jpg', price: '$14.00',
	},
	{
		name: '网易有道词典-7亿人都在用的外语学习翻译词典', type: '参考', iconUri: 'https://www.apple.com/autopush/cn/itunes/charts/free-apps/images/2018/2/df1e64c9679f76f66267cb0887d0aadbe16ff0a49b14ce861d684100585b69c1.jpg', price: false,
	},
];

class HomePage extends React.Component {
	static navigationOptions = ({ navigation, screenProps }) => ({
		header: null,
	})

	constructor(props) {
		super(props);
		this.state = {
			index: -1,							// 动画操作对象
			scale: new Animated.Value(1),		// 动画缩放Scale
			modalVisible: false,				// 动画弹框Modal
			position: new Animated.Value(0),
		};
		// 弹框大小
		this.position = {
			pageX: 0, pageY: 0, width: 0, height: 0,
		};
		// 弹框数据
		this.info = { title: '', text: '', source: '' };
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
	 * 列表Item PressIn
	 * @param {*} index
	 */
	onItemPressIn(e, index) {
		// console.log(e.target);
		if (this.state.modalVisible || undefined === e.target) return;
		// 获取四角坐标
		NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
		// pageY是组件在当前屏幕上的绝对位置
			// console.log(pageX, pageY, width, height);
			this.position = {
				pageX, pageY, width, height,
			};
			this.info = FlatListSource[index];
			this.setState({ index }, () => {
				Animated.timing(
					this.state.scale,
					{
						toValue: 0.96,
						duration: 80,
					},
				).start();
			});
		});
	}

	/**
	 * 列表Item PressOut
	 */
	onItemPressOut(e) {
		// console.log(e.target);
		if (this.state.modalVisible) return;
		if (undefined !== e.target) {
			// 用户点击了PressIn的Item点击
			this.setState({ modalVisible: true });
		} else {
			// 还原缩放效果（此时用户没有将PressIn的Item点击）
			Animated.timing(
				this.state.scale,
				{
					toValue: 1,
					duration: 80,
				},
			).start();
		}
	}

	/**
	 * 当弹框(LoadImage)已经渲染完毕
	 */
	onModalVisibele(flag) {
		if (flag) {
			Animated.sequence([
				Animated.timing(this.state.position, {
					toValue: 1,
					timing: 40,
				}),
				// 还原缩放效果
				Animated.timing(
					this.state.scale,
					{
						toValue: 1,
						duration: 80,
					},
				),
			]).start();
		} else {
			Animated.timing(this.state.position, {
				toValue: 2,
				timing: 40,
			}).start(() => this.setState({ modalVisible: false }));
		}
	}

	/**
	 * 渲染大图、上文字Item
	 * @param {*} item
	 */
	renderContentItem1(item) {
		const {
			title, text, source,
		} = item;
		return (
			<View>
				<LoadImage style={Styles.itemAvatar} source={source} />
				<View style={Styles.itemAbsolute}>
					<Text style={Styles.itemText} numberOfLines={1}>{title}</Text>
					<Text style={[Styles.itemText, { fontSize: FontSize(50) }]} numberOfLines={2}>{text}</Text>
				</View>
			</View>
		);
	}

	/**
	 * 渲染上图、下文字Item
	 * @param {*} item
	 */
	renderContentItem2(item) {
		const {
			title, text, source,
		} = item;
		return (
			<View>
				<LoadImage style={Styles.itemAvatar2} source={source} />
				<View style={Styles.item2TextContainer}>
					<Text style={Styles.item2Text} numberOfLines={1}>{title}</Text>
					<Text style={[Styles.item2Text, { fontSize: FontSize(50), color: Colors.C0 }]} numberOfLines={1}>{text}</Text>
				</View>
			</View>
		);
	}

	/**
	 * 渲染上图、下App Sale Item
	 * @param {*} item
	 */
	renderContentItem3(item) {
		const {
			title, text, source,
		} = item;
		return (
			<View>
				<LoadImage style={Styles.itemAvatar3} source={source} />
				<View style={{ position: 'absolute', left: px2dp(30), bottom: px2dp(190) }}>
					<Text style={[Styles.itemText, { fontSize: FontSize(80) }]}>今日游戏</Text>
				</View>
				<View style={Styles.item3BottomContainer}>
					<Image source={{ uri: 'https://www.apple.com/autopush/cn/itunes/charts/paid-apps/images/2018/2/802f4cf8ed905a953155c393c1ea45d97c5ad367e0a85b97c3caaf570437bd75.jpg' }} style={{ width: px2dp(100), height: px2dp(100), borderRadius: px2dp(16) }} />
					<View>
						<Text style={Styles.item3Text} numberOfLines={1}>{title}</Text>
						<Text style={[Styles.item3Text, { fontSize: FontSize(28) }]} numberOfLines={1}>{text}</Text>
					</View>
					<View style={Styles.saleContainer}>
						<Text style={Styles.saleText}>¥45.00</Text>
					</View>
				</View>
			</View>
		);
	}

	/**
	 * 按类型渲染Item 内容
	 * @param {*} item
	 */
	renderContent(item) {
		switch (item.sourceType) {
		case 'image':
			return this.renderContentItem1(item);
		case 'video':
			return this.renderContentItem2(item);
		case 'appsale':
			return this.renderContentItem3(item);
		default:
			return <View />;
		}
	}

	/**
	 * 渲染列表Item
	 * @param {*} item
	 */
	renderItem({ item, index }) {
		return (
			<TouchableWithoutFeedback delayPressIn={0} onPressIn={e => this.onItemPressIn(e, index)} onPressOut={e => this.onItemPressOut(e)}>
				<Animated.View style={[this.state.index === index && { transform: [{ scale: this.state.scale }] }]}>
					{this.renderContent(item)}
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

	/**
	 * 渲染列表Footer
	 */
	renderListFooter() {
		return (
			<View style={{
				marginTop: px2dp(50), borderRadius: px2dp(26), backgroundColor: Colors.C8, padding: px2dp(30),
			}}
			>
				<Text style={Styles.item4Text}>今日推荐</Text>
				<Text style={[Styles.item4Text, { color: Colors.C0, fontSize: FontSize(60) }]}>今日推荐</Text>
				<View style={{ }}>
					{FlatListFooterSource.map((item, index) => {
						const {
							name, type, iconUri, price,
						} = item;
						return (
							<View
								style={{
									flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: px2dp(50),
								}}
								key={index.toString()}
							>
								<LoadImage source={{ uri: iconUri }} style={{ width: px2dp(110), height: px2dp(110), borderRadius: px2dp(20) }} />
								<View style={{
									flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: px2dp(30),
								}}
								>
									<View style={{ flex: 1 }}>
										<Text style={[Styles.itemText, { color: Colors.C0 }]} numberOfLines={1}>{name}</Text>
										<Text style={[Styles.itemText, { color: Colors.C3 }]} numberOfLines={1}>{type}</Text>
									</View>
									<View>
										<View style={{
											width: px2dp(160), height: px2dp(76), backgroundColor: Colors.C7, borderRadius: px2dp(40), justifyContent: 'center', alignItems: 'center',
										}}
										>
											<Text style={Styles.saleText}>{price || '获取'}</Text>
										</View>
										<View style={{ width: px2dp(160), justifyContent: 'center', alignItems: 'center' }}>
											{!price && <Text style={[Styles.itemText, { color: Colors.C5, fontSize: FontSize(16), marginTop: px2dp(8) }]}>App内购买应用</Text>}
										</View>
									</View>
								</View>
							</View>
						);
					})}
				</View>
			</View>
		);
	}

	/**
	 * 渲染动画弹框
	 */
	renderAnimatedModal() {
		// 动画初始位置
		const {
			pageX, pageY, width, height,
		} = this.position;
		// 展示数据信息
		const {
			title, text, source,
		} = this.info;
		return (
			<Modal
				style={{
					flex: 1, width: Metrics.screenWidth, height: Metrics.screenHeight, justifyContent: 'center',
				}}
				visible={this.state.modalVisible}
				transparent
				animationType="fade"
				// onShow={() => this.onModalVisibele(true)}
				onDismiss={() => this.onModalVisibele(false)}
				onRequestClose={() => {}}
			>
				{ this.state.index >= 0
					&& (
						<Animated.ScrollView
							style={{
								transform: [
									{
										translateX: this.state.position.interpolate({
											inputRange: [0, 1, 2],
											outputRange: [(Metrics.screenWidth - width) / 2, 0, pageX],
										}),
									},
									{
										translateY: this.state.position.interpolate({
											inputRange: [0, 1, 2],
											outputRange: [pageY * 0.96, 0, pageY],
										}),
									},
								],
								width: this.state.position.interpolate({
									inputRange: [0, 1, 2],
									outputRange: [width * 0.96, Metrics.screenWidth, width],
								}),
								height: this.state.position.interpolate({
									inputRange: [0, 1, 2],
									outputRange: [height * 0.96, Metrics.screenHeight, height],
								}),
								flex: 1,
							}}
						>
							<Animated.Image
								source={source}
								style={{
									width: this.state.position.interpolate({
										inputRange: [0, 1, 2],
										outputRange: [width * 0.96, Metrics.screenWidth, width],
									}),
									height: this.state.position.interpolate({
										inputRange: [0, 1, 2],
										outputRange: [height * 0.96, height + 80, height],
									}),
								}}
								onLoad={() => this.onModalVisibele(true)}
							/>
							<Animated.View
								style={{
									width: this.state.position.interpolate({
										inputRange: [0, 1, 2],
										outputRange: [width * 0.96, Metrics.screenWidth, width],
									}),
									height: this.state.position.interpolate({
										inputRange: [0, 1, 2],
										outputRange: [0, Metrics.screenHeight * 2, 0],
									}),
									overflow: 'hidden',
								}}
							>
								<WebView
									style={{ height: Metrics.screenHeight * 2 }}
									source={{ uri: 'https://mp.weixin.qq.com/s?__biz=MzA3MzYzNjMyMA==&mid=2650179561&idx=1&sn=cf53d62bf08635b4972d3a5f435d5510' }}
									scrollEnabled={false}
									startInLoadingState
									renderLoading={() => <LoadView />}
								/>
							</Animated.View>
							<TouchableWithoutFeedback onPress={() => this.onModalVisibele(false)}>
								<Animated.View style={{
									position: 'absolute',
									top: px2dp(50),
									right: px2dp(50),
									opacity: this.state.position.interpolate({
										inputRange: [0, 1, 2],
										outputRange: [0, 1, 0],
									}),
								}}
								>
									<Icon name="md-close-circle" color={Colors.C3} size={34} />
								</Animated.View>
							</TouchableWithoutFeedback>
						</Animated.ScrollView>
					)
				}
			</Modal>
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
					ListFooterComponent={this.renderListFooter}
					ItemSeparatorComponent={() => <View style={Styles.itemSeparator} />}
					keyExtractor={(item, index) => index.toString()}
				/>
				{this.renderAnimatedModal()}
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
	container: {
		flex: 1, backgroundColor: Colors.C7,
	},
	flat: {
		marginTop: ThemeStyles.STATUSBAR_HEIGHT, paddingBottom: ThemeStyles.STATUSBAR_HEIGHT, paddingLeft: Metrics.mainPadding, paddingRight: Metrics.mainPadding,
	},
	date: { fontSize: FontSize(24), color: Colors.C3, fontFamily: 'PingFang-SC-Medium' },
	day: {
		fontSize: FontSize(40), color: Colors.C2, fontWeight: 'bold',
	},
	header: {
		flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Metrics.mainPadding, marginBottom: px2dp(20),
	},
	avatar: { width: px2dp(80), height: px2dp(80), borderRadius: px2dp(40) },
	/** Item === 1 */
	imageItem: {},
	itemAvatar: { width: Metrics.screenWidth - Metrics.mainPadding * 2, height: px2dp(800), borderRadius: px2dp(26) },
	itemAbsolute: {
		position: 'absolute', left: Metrics.mainPadding, right: Metrics.mainPadding, top: Metrics.mainPadding,
	},
	itemText: {
		fontSize: FontSize(26), color: Colors.C8, fontFamily: 'PingFang-SC-Medium', fontWeight: 'bold',
	},
	/** Item === 2 */
	videoItem: {},
	itemAvatar2: {
		width: Metrics.screenWidth - Metrics.mainPadding * 2, height: px2dp(520), borderTopLeftRadius: px2dp(26), borderTopRightRadius: px2dp(26),
	},
	item2TextContainer: {
		backgroundColor: Colors.C8, padding: px2dp(30), borderBottomLeftRadius: px2dp(26), borderBottomRightRadius: px2dp(26),
	},
	item2Text: {
		fontSize: FontSize(26), color: Colors.C3, fontFamily: 'PingFang-SC-Medium', fontWeight: 'bold',
	},
	/** Item === 3 */
	itemAvatar3: {
		width: Metrics.screenWidth - Metrics.mainPadding * 2, height: px2dp(640), borderTopLeftRadius: px2dp(26), borderTopRightRadius: px2dp(26),
	},
	item3BottomContainer: {
		backgroundColor: '#007774', height: px2dp(180), padding: px2dp(30), borderBottomLeftRadius: px2dp(26), borderBottomRightRadius: px2dp(26), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
	},
	item3Text: {
		fontSize: FontSize(30), color: Colors.C8, fontFamily: 'PingFang-SC-Medium', fontWeight: 'bold',
	},
	saleContainer: {
		justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.C8, width: px2dp(160), height: px2dp(70), borderRadius: px2dp(35),
	},
	saleText: { fontSize: FontSize(28), color: Colors.CB, fontWeight: 'bold' },
	/** Item === 4 */
	item4Text: {
		fontSize: FontSize(26), color: Colors.C3, fontFamily: 'PingFang-SC-Medium', fontWeight: 'bold',
	},

	itemSeparator: { height: px2dp(50) },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
