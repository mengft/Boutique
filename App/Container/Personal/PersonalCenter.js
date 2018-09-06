/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:51:54
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-06 10:05:58
 */

import React from 'react';
import { View, Text, ScrollView, Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, LoadImage, ScrollContainer } from '../../Component';
import { TOGGLE_TAR_BAR } from '../../Redux/ActionTypes';
import { Colors, px2dp, FontSize, ThemeStyles } from '../../Theme';

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
	}

	componentWillUnmount() {
		this.willFocusSubscription.remove();
		this.willBlurSubscription.remove();
	}

	/**
	 * 渲染UserInfo
	 */
	renderUserInfo() {
		return (
			<TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('personalInfo')}>
				<LinearGradient colors={['#7a5cfe', '#37acfe']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[Styles.header, Styles.paddingView]}>
					<LoadImage source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536142226217&di=8fb361a37c1b023cf97c602505ee0589&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170831%2F999203916c074e9ea114bb0d029a8393.jpeg' }} style={Styles.avatar} />
					<View style={Styles.headerMiddle}>
						<Text style={Styles.nickname}>孟汉唐</Text>
						<View>
							<Text style={Styles.score}>毕业院校：清华大学</Text>
						</View>
					</View>
					<Icon name="angle-right" color={Colors.C8} size={28} style={Styles.inconRight} />
				</LinearGradient>
			</TouchableWithoutFeedback>
		);
	}

	render() {
		return (
			<ScrollContainer title="个人中心" navigation={this.props.navigation} scrollOffset={this.state.scrollOffset}>
				<Header
					onLayout={(e) => { this.setState({ scrollOffset: e.nativeEvent.layout.height - px2dp(18) }) }}
					title="个人中心"
					iconName="cog"
				/>
				{this.renderUserInfo()}
				{'1,2,3,4,5,6,7,8,9'.split(',').map(item => <Text key={item} style={{ fontSize: FontSize(90) }}>{item}</Text>)}
			</ScrollContainer>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	toggleTabBarAction: tabBarVisible => dispatch({ type: TOGGLE_TAR_BAR, payload: { tabBarVisible } }),
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
});

export default connect(null, mapDispatchToProps)(PersonalCenter);
