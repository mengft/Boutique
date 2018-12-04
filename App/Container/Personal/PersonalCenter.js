/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:51:54
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-11-26 10:16:20
 */

import React from 'react';
import { View, Text, Image, ScrollView, Animated, StyleSheet, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, LoadImage, ScrollContainer } from '../../Component';
import { TOGGLE_TAR_BAR, TEST_SAGE } from '../../Redux/ActionTypes';
import { Colors, px2dp, FontSize, ThemeStyles, FontFamily, Metrics } from '../../Theme';

const PERSONAL_OPTIONS = [
	{ key: '0', title: '表单业务', iconName: 'address-book', iconColor: '#c03961', iconSize: px2dp(60), route: 'formScreen' },
	{ key: '1', title: 'SVG图表', iconName: 'android', iconColor: '#2f6b69', iconSize: px2dp(60), route: 'chartScreen' },
	{ key: '2', title: '动画特效', iconName: 'anchor', iconColor: '#5c27eb', iconSize: px2dp(60), route: 'randomBeat' },
	{ key: '3', title: '用户协议', iconName: 'amazon', iconColor: '#3366f7', iconSize: px2dp(60), route: 'formScreen' },
	{ key: '4', title: '人工智能', iconName: 'bug', iconColor: '#c03961', iconSize: px2dp(60), route: 'formScreen' },
	{ key: '5', title: '深度学习', iconName: 'bell', iconColor: '#2f6b69', iconSize: px2dp(60), route: 'formScreen' },
];

class PersonalCenter extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		...ThemeStyles.indexHeaderStyle,
		headerTitleStyle: {
			...ThemeStyles.indexHeaderStyle.headerTitleStyle,
			opacity: navigation.getParam('opacity', new Animated.Value(0)),
		},
		headerTitle: navigation.getParam('title', ''),
	});

	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {
		this.willFocusSubscription = this.props.navigation.addListener(
			'willFocus',
			() => {
				this.props.toggleTabBarAction(true);
				StatusBar.setBarStyle("default");
			},
		);
		this.willBlurSubscription = this.props.navigation.addListener(
			'willBlur',
			() => {
				this.props.toggleTabBarAction(false);
			},
		);
		// 初始化HeaderTitle 透明度
		this.props.navigation.setParams({ opacity: new Animated.Value(0) });
		// this.props.testSage()
	}

	componentWillUnmount() {
		this.willFocusSubscription.remove();
		this.willBlurSubscription.remove();
	}

	/**
	 * 进入个人信息界面
	 */
	toPersonalInfo () {
		if (this.props.isLogin) {
			this.props.navigation.navigate('personalInfo')
		} else {
			this.props.navigation.navigate('login', { transition: 'ModalSlideFromBottom' })
		}
	}

	/**
	 * 渲染UserInfo
	 */
	renderUserInfo() {
		let isLogin = this.props.isLogin;
		return (
			<TouchableWithoutFeedback onPress={() => this.toPersonalInfo()}>
				<LinearGradient colors={['#7a5cfe', '#37acfe']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[Styles.header, Styles.paddingView]}>
					<LoadImage source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536142226217&di=8fb361a37c1b023cf97c602505ee0589&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170831%2F999203916c074e9ea114bb0d029a8393.jpeg' }} style={Styles.avatar} />
					<View style={Styles.headerMiddle}>
						<Text style={Styles.nickname}>{isLogin ? '孟汉唐' : '立即登录'}</Text>
						<View>
							<Text style={Styles.score}>{isLogin ? '毕业院校：清华大学' : '解锁更多实用功能!'}</Text>
						</View>
					</View>
					<Icon name="angle-right" color={Colors.C8} size={28} style={Styles.inconRight} />
				</LinearGradient>
			</TouchableWithoutFeedback>
		);
	}

	/**
	 * 渲染功能按钮
	 */
	renderOptions () {
		return (
			<View style={Styles.optionContainer}>
				{PERSONAL_OPTIONS.map(item => {
					let { key, title, iconName, iconColor, iconSize, route } = item
					return (
						<TouchableWithoutFeedback key={key} onPress={() => this.props.navigation.navigate(route)}>
							<View style={Styles.optionItem}>
								<Icon name={iconName} size={iconSize} color={iconColor} />
								<Text style={Styles.optionTitle}>{title}</Text>
							</View>
						</TouchableWithoutFeedback>
					)
				})}
			</View>
		)
	}
	
	render() {
		return (
			<ScrollContainer title="个人中心" navigation={this.props.navigation} scrollOffset={this.state.scrollOffset}>
				<Header
					onLayout={(e) => { this.setState({ scrollOffset: e.nativeEvent.layout.height - px2dp(18) }) }}
					title="个人中心"
					iconName="cog"
					onPress={() => this.props.navigation.navigate('settings')}
				/>
				{this.renderUserInfo()}
				{this.renderOptions()}
			</ScrollContainer>
		);
	}
}

const mapStateToProps = state => ({
	isLogin: state.user.access_token,
});

const mapDispatchToProps = dispatch => ({
	toggleTabBarAction: tabBarVisible => dispatch({ type: TOGGLE_TAR_BAR, payload: { tabBarVisible } }),
	testSage: () => dispatch({ type: TEST_SAGE })
});

const Styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: Colors.CBK },
	paddingView: { paddingLeft: px2dp(50), paddingRight: px2dp(30) },
	header: {
		height: px2dp(200), backgroundColor: 'rgba(0,0,0,0)', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
	},
	avatar: { height: px2dp(140), width: px2dp(140), borderRadius: px2dp(70) },
	headerMiddle: { marginLeft: px2dp(40) },
	nickname: { fontSize: FontSize(36), color: Colors.C8 },
	score: { fontSize: FontSize(22), color: Colors.C8, marginTop: px2dp(16) },
	inconRight: { position: 'absolute', right: px2dp(30) },
	// Option
	optionContainer: { paddingTop: px2dp(35), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' },
	optionItem: { padding: px2dp(35), width: Metrics.screenWidth / 4, justifyContent: 'center', alignItems: 'center' },
	optionTitle: { marginTop: px2dp(10), color: Colors.C1, fontSize: FontSize(24), fontFamily: FontFamily.PF_R },
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonalCenter);
