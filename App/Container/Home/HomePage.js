/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:00:15
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-11-26 10:15:31
 */

import React from 'react';
import {
	View, Text, Image, FlatList, Modal, WebView, StyleSheet, TouchableWithoutFeedback, Animated, NativeModules, Platform, StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadImage, LoadView } from '../../Component';
import { TOGGLE_TAR_BAR } from '../../Redux/ActionTypes';
import {
	px2dp, Colors, ThemeStyles, FontSize, Metrics,
} from '../../Theme';
import { FlatListSource, FlatListFooterSource } from '../../Utils/Constant';

const AnimatedWebView = Animated.createAnimatedComponent(WebView);

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
		this.index = -1;
	}

	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus',
			(payload) => {
				this.props.toggleTabBarAction(true);
				StatusBar.setBarStyle("default");
			},
		);
		this.willBlurSubscription = this.props.navigation.addListener(
			'willBlur',
			(payload) => {
				this.props.toggleTabBarAction(false);
			},
		);
	}

	componentWillUnmount() {
		this.willFocusSubscription.remove();
		this.willBlurSubscription.remove();
	}

	/**
	 * 列表Item PressIn
	 * @param {*} index
	 */
	onItemPressIn(e, index) {
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
				this.index = index;
				Animated.timing(
					this.state.scale,
					{
						toValue: 0.96,
						duration: 40,
						isInteraction: true,
						useNativeDriver: true,
					},
				).start();
			});
		});
	}

	/**
	 * 列表Item PressOut for ios
	 */
	onItemPressOut(e) {
		if (Platform.OS === 'android' || this.state.modalVisible) return;
		if (undefined !== e.target) {
			// 用户点击了PressIn的Item点击
			this.setState({ modalVisible: true });
		} else {
			// 还原缩放效果（此时用户没有将PressIn的Item点击）
			Animated.timing(
				this.state.scale,
				{
					toValue: 1,
					duration: 40,
					isInteraction: true,
					useNativeDriver: true,
				},
			).start();
		}
	}

	/**
	 * onTouchCancel for android
	 */
	onTouchCancel() {
		if (this.index === -1) return;
		this.index = -1;
		// 还原缩放效果（此时用户没有将PressIn的Item点击）
		Animated.timing(
			this.state.scale,
			{
				toValue: 1,
				duration: 40,
				isInteraction: true,
				useNativeDriver: true,
			},
		).start();
	}

	/**
	 * onTouchEndCapture for android
	 */
	onTouchEndCapture() {
		if (Platform.OS === 'ios' || this.index === -1 || this.state.modalVisible) return;
		this.index = -1;
		if (this.state.modalVisible) return;
		this.setState({ modalVisible: true });
	}

	/**
	 * 当弹框(LoadImage)已经渲染完毕
	 */
	onModalVisibele(flag) {
		if (flag) {
			Animated.sequence([
				Animated.timing(this.state.position, {
					toValue: 1,
					timing: 20,
					isInteraction: true,
				}),
				// 还原缩放效果
				Animated.timing(
					this.state.scale,
					{
						toValue: 1,
						duration: 20,
						isInteraction: true,
						useNativeDriver: true,
					},
				),
			]).start();
		} else {
			Animated.timing(this.state.position, {
				toValue: 2,
				timing: 40,
				isInteraction: true,
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
		console.log(this.props);
		return (
			<View style={Styles.header}>
				<View style={Styles.headerLeft}>
					<Text style={Styles.date}>8月20日 星期一</Text>
					<Text style={Styles.day}>Today</Text>
				</View>
				<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('chanelScreen')}>
					<Image style={Styles.avatar} source={require('../../Assets/Images/Home/WechatIMG601.jpg')} />
				</TouchableWithoutFeedback>
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
							bounces={false}
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
							<WebView source />
							<AnimatedWebView
								style={{
									width: this.state.position.interpolate({
										inputRange: [0, 1, 2],
										outputRange: [width * 0.96, Metrics.screenWidth, width],
									}),
									height: this.state.position.interpolate({
										inputRange: [0, 1, 2],
										outputRange: [0, Metrics.screenHeight * 1, 0],
									}),
									overflow: 'hidden',
								}}
								// source={require("../../Assets/Html/article.html")}
								source={{ 
									uri: 'https://mp.weixin.qq.com/s?__biz=MzA3MzYzNjMyMA==&mid=2650179561&idx=1&sn=cf53d62bf08635b4972d3a5f435d5510',
									headers: { 'Cache-Control': 'public' }
								}}
								scrollEnabled={false}
								startInLoadingState
								// renderLoading={() => <LoadView />}
							/>
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
					ListHeaderComponent={() => this.renderListHeader()}
					ListFooterComponent={this.renderListFooter}
					ItemSeparatorComponent={() => <View style={Styles.itemSeparator} />}
					keyExtractor={(item, index) => index.toString()}
					onTouchCancel={e => this.onTouchCancel()}
					onTouchEndCapture={e => this.onTouchEndCapture()}
				/>
				{this.renderAnimatedModal()}
			</View>
		);
	}
}

const mapStateToProps = state => ({
	mainNavigatorReducer: state.mainNavigatorReducer,
});

const mapDispatchToProps = dispatch => ({
	toggleTabBarAction: tabBarVisible => dispatch({ type: TOGGLE_TAR_BAR, payload: { tabBarVisible } }),
});

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