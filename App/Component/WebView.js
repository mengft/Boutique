/*
 * @Author: fantao.meng
 * @Date: 2018-08-24 17:12:34
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-08-24 17:19:40
 */

import React, { Component } from 'react';
import {
	View, Text, WebView, TouchableWithoutFeedback, StyleSheet, BackHandler,
} from 'react-native';
import { Colors, ApplicationStyles } from '../Theme';

export default class ComponentWebView extends Component {
    static navigationOptions = ({ navigation }) => ({
    	heaerTitle: undefined !== navigation.state.params && undefined !== navigation.state.params.title ? navigation.state.params.title : '正在加载',
    	...ApplicationStyles.defaultHeaderStyle,
    	headerLeft:
	<TouchableWithoutFeedback onPress={() => navigation.goBack()}>
		<View>
			<Text>返回</Text>
		</View>
	</TouchableWithoutFeedback>,
    })

    constructor(props) {
    	super(props);
    	this.isFirstPage = true;
    	// 导航信息变更
    	this.injectedJavaScript = this.injectedJavaScript.bind(this);
    	this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    }

    componentDidMount() {
    	BackHandler.addEventListener('backPress', () => {
    		console.log('Android返回键监听');
    		this.navigationGoBack();
    		return true;
    	});
    	this.props.navigation.setParams({
    		goBack: () => this.navigationGoBack(),
    	});
    }

    componentWillUnmount() {
  	    BackHandler.removeEventListener('backPress');
    }

    /**
   * 网页加载之前注入的一段JS代码
   */
    injectedJavaScript() {
  	// const appVersion = Config.version;
  	// const devicePlatform = Platform.OS === 'android' ? 'android' : 'ios';
  	// const jpushRegistrationId = '';
  	// const clientId = Config.clientId;
  	// const { access_token: token, username } = this.props;
  	// const dateStr = Date.parse(new Date());
  	// const tokenDate = token + dateStr;
  	// return `localStorage.setItem("access_token_date", "${tokenDate}");
  	//         localStorage.setItem("access_token", "${token}");
  	//         localStorage.setItem("username", "${username}");
  	//         localStorage.setItem("appVersion", "${appVersion}");
  	//         localStorage.setItem("devicePlatform", "${devicePlatform}");
  	//         localStorage.setItem("jpushRegistrationId", "${jpushRegistrationId}");
  	//         localStorage.setItem("clientId", "${clientId}");`;
    }

    /**
     * 获取H5 通过window.postMessage 传递过来的参数
     * @param {*} e
     */
    onMessage(e) {
    	/** 消息格式
        {
        "source": "hmpapp_h5",
        "data": {
            type: "kidneys"
        }
        }
        */
    	try {
    		const message = JSON.parse(e.nativeEvent.data);
    		if (message.source === 'hmpdoctor_h5') {
    			if (message.data.type === 'isFirstPage') {
    				this.isFirstPage = true;
    			}
    			if (message.data.type === 'isNotFirstPage') {
    				this.isFirstPage = false;
    			}
    		}
    	} catch (e) {
    		console.log(e);
    	}
    }

    /**
     * 导航变更
     * @param {} event
     */
    onNavigationStateChange(event) {
    	const { navigation } = this.props;
    	const { title } = event;
    	// title
    	if ((undefined !== navigation.state.params && undefined !== navigation.state.params.title && title !== navigation.state.params.title)
        || !(undefined !== navigation.state.params && undefined !== navigation.state.params.title)) {
    		if (title) { navigation.setParams({ title }); }
    	}
    }

    /**
     * 导航跳转返回
     */
    navigationGoBack() {
    	if (this.isFirstPage) {
    		// 需要区分与headerLeft中的goBack()
    		this.props.navigation.goBack();
    	} else {
    		this.webview.goBack();
    	}
    }

    render() {
    	return (
	        <View style={Styles.container}>
		<WebView
	ref={(e) => { if (e) { this.webview = e; } }}
    				source={{ uri: `${Config.h5Host}/ScreeningList`, method: 'GET', headers: { 'Cache-Control': 'no-cache' } }}
    				bounces
    				startInLoadingState
    				injectedJavaScript={this.injectedJavaScript()} // 在网页加载之前注入的一段JS代码
    				injectJavaScript={() => this.injectJavaScript()} // 在网页加载完成之后主动调用
	onShouldStartLoadWithRequest={() => {
    					console.log('新加载');
    					return true;
    				}}
	onLoadStart={() => console.log('onLoadStart')}
	onLoad={() => console.log('onLoad')}
	onLoadEnd={() => console.log('onLoadEnd')}
	onError={() => console.log('error')}
	onMessage={e => this.onMessage(e)}
	onNavigationStateChange={this.onNavigationStateChange}
    			/>
    		</View>
    	);
    }
}


const Styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: Colors.C8 },
});
