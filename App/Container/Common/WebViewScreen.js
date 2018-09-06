/*
 * @Author: fantao.meng 
 * @Date: 2018-08-30 13:39:18 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-05 17:55:49
 */

import React from 'react';
import { WebView, View, Text } from 'react-native';
import * as PropTypes from 'prop-types'
import { HeaderLeft, HeaderRight, LoadView } from '../../Component';
import { Colors, ThemeStyles } from '../../Theme';

export default class WebViewScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        ...ThemeStyles.defaultHeaderStyle,
        headerTitle: navigation.getParam('title', '加载中...'),
        headerLeft: <HeaderLeft navigation={navigation} />,
    });

    /**
     * webview加载过滤器
     * @param {*} e 
     */
    onShouldStartLoadWithRequest (e) {
        console.debug(e)
        return true
    }

    /**
     * 加载失败
     * @param {*} e 
     */
    onError (e) {
        this.props.navigation.setParams({ title: '加载失败' });
    }

    /**
     * 导航状态发生变更
     * @param {*} e 
     */
    onNavigationStateChange (e) {
        let navigation = this.props.navigation
        let { title, canGoBack } = e
        if (title !== navigation.getParam('title', '')) navigation.setParams({ title })
        if (canGoBack !== navigation.getParam('canGoBack', false)) navigation.setParams({ canGoBack })
    }

    /**
     * 渲染Error界面
     */
    renderError() {
        return (
            <View>
                <Text>Error</Text>
            </View>
        )
    }

    render () {
        let url = this.props.navigation.getParam('url', '');
        return (
            <WebView
                source={{ uri: url }}
                onShouldStartLoadWithRequest={e => this.onShouldStartLoadWithRequest(e)}
                startInLoadingState
                onError={e => this.onError(e)}
                renderLoading={() => <LoadView/>}
                renderError={() => this.renderError()}
                onNavigationStateChange={e => this.onNavigationStateChange(e)}
            />
        )
    }
}