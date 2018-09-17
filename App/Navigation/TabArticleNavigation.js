/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:19:00
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-17 16:37:50
 */

import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import Icon from 'react-native-vector-icons/Ionicons';
import { TabBarLabel } from '../Component';
import { Colors, ThemeStyles } from '../Theme';
import { TransitionConfiguration } from '../Utils/Function';

// 界面引入
import ArticlePage from '../Container/Article/ArticlePage';
import WebViewScreen from '../Container/Common/WebViewScreen';

// 路由配置
const routeConfiguration = {
	articlePage: { screen: ArticlePage },
	webViewForm: { screen: WebViewScreen }
};

// 导航配置
const navigatorConfiguration = {
	// 路由选项
	initialRouteName: 'articlePage',
	// 视觉选项
	mode: 'card',
	headerMode: 'screen',
	// 统一为IOS 兼容Android的Header flex-start排列方式
	headerLayoutPreset: 'center',
	// 转场动画
	transitionConfig: TransitionConfiguration,

	navigationOptions: {
		...ThemeStyles.navigationOptions,
	},
};

export const TabArticleNavigator = createStackNavigator(routeConfiguration, navigatorConfiguration);
export const middlewareTabArticle = createReactNavigationReduxMiddleware('article', state => state.tabArticleNavigatorReducer);
const TabArticleNavigationReduxify = reduxifyNavigator(TabArticleNavigator, 'article');

class TabArticleNavigation extends React.Component {

	static navigationOptions = ({ navigation, screenProps }) => {
		return {
			tabBarIcon: ({ focused, tintColor }) => <Icon name="logo-twitter" size={24} color={tintColor} />,
			tabBarLabel: '表单',
			tabBarVisible: navigation.getParam('tabBarVisible', true)
		}
	}

	render() {
		const { navigationState, dispatch } = this.props
		return (
			<TabArticleNavigationReduxify 
				state={navigationState}
				dispatch={dispatch}
			/>
		);
	}
}

const mapStateToProps = state => ({
	navigationState: state.tabArticleNavigatorReducer,
});

export default connect(mapStateToProps)(TabArticleNavigation);
