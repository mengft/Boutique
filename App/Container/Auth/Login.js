/*
 * @Author: fantao.meng 
 * @Date: 2018-09-10 15:47:27 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-13 17:33:21
 */

import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { LOGIN } from '../../Redux/ActionTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollContainer, SubmitButton } from '../../Component';
import { px2dp, FontSize, FontFamily, Colors, Metrics } from '../../Theme';

class Login extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    };

    componentWillReceiveProps(nextProps) {
        // 登录成功
        if (nextProps.access_token && !this.props.access_token) {
            this.props.navigation.goBack();
        }
    }

    /**
     * 登录
     * @param {*} username 
     * @param {*} password 
     */
    onLogin (username, password) {
        if (username.trim() && password.trim()) {
            this.props.login(username.trim(), password.trim())
        }
    }
    
    /**
     * 渲染Form表单
     */
    renderForm () {
        let { username, password } = this.state;
        return (
            <View style={{ marginTop: px2dp(40), paddingLeft: Metrics.mainPadding, paddingRight: Metrics.mainPadding }}>
                <View style={Styles.formTextContainer}>
                    <TextInput 
                        style={Styles.formText}
                        placeholder='网易邮箱'
                        placeholderTextColor={Colors.C5} 
                        underlineColorAndroid='transparent'
                        value={username}
                        onChangeText={username => this.setState({ username })}
                        textContentType='username' 
                        returnKeyType='next'
                        onSubmitEditing={e => this.password.focus()}
                    />
                </View>
                <View style={Styles.formTextContainer}>
                    <TextInput
                        ref={e => { if (e) this.password = e }}
                        style={Styles.formText} 
                        placeholder='密码'
                        placeholderTextColor={Colors.C5} 
                        underlineColorAndroid='transparent'
                        value={password} 
                        onChangeText={password => this.setState({ password })} 
                        textContentType='password' 
                        secureTextEntry
                        returnKeyType={username.trim() && password.trim() && 'done' || 'send'}
                        onSubmitEditing={() => this.onLogin(username, password)}
                    />
                </View>
                <SubmitButton
                    title='登录'
                    valid={username.trim() && password.trim() && true || false}
                    onPress={() => this.onLogin(username, password)}
                    style={{ marginTop: px2dp(60) }}
                />
            </View>
        )
    }

    /**
     * 渲染其他登录方式
     */
    renderOtherWay () {
        return (
            <View style={Styles.otherWay}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={Styles.line} />
                    <Text style={Styles.otherWayText}>其他登录方式</Text>
                    <View style={Styles.line} />
                </View>
            </View>
        )
    }
    
    render () {
        return (
            <ScrollContainer>
                <View style={Styles.header}>
                    <TouchableOpacity style={Styles.headerItem} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="md-close" color={Colors.C1} size={px2dp(54)} />
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.headerItem} onPress={() => alert('暂不开放注册通道，敬请期待')}>
                        <Text style={Styles.registerText}>注册</Text>
                    </TouchableOpacity>
                </View>
                <Image source={require('../../Assets/Images/Personal/ic_launcher.png')} style={Styles.iconLauncher} />
                {this.renderForm()}
                {this.renderOtherWay()}
            </ScrollContainer>
        )
    }
}

const Styles = StyleSheet.create({
    header: { marginTop: Metrics.STATUSBAR_HEIGHT + px2dp(30), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    headerItem: { paddingLeft: Metrics.mainPadding, paddingRight: Metrics.mainPadding },
    registerText: { color: Colors.C1, fontSize: FontSize(28), fontFamily: FontFamily.PF_R },
    iconLauncher: { alignSelf: 'center', marginTop: px2dp(60), width: px2dp(140), height: px2dp(140), borderRadius: px2dp(20) },
    formTextContainer: { paddingTop: px2dp(34), paddingBottom: px2dp(34), borderBottomColor: Colors.C7, borderBottomWidth: 1 },
    formText: { padding: 0, color: Colors.C3, fontSize: FontSize(28), fontFamily: FontFamily.PF_R },
    otherWay: { position: 'absolute', top: Metrics.screenHeight - px2dp(200), left: 0, right: 0 },
    otherWayText: { color: Colors.C5, fontSize: FontSize(24), fontFamily: FontFamily.PF_R },
    line: { width: px2dp(200), height: 1, backgroundColor: Colors.C7, margin: px2dp(16) },
});

const mapStateToProps = state => ({
    access_token: state.user.access_token,
});

const mapDispatchToProps = dispatch => ({
    login: (username, password) => dispatch({ type: LOGIN , payload: { username, password } })
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)