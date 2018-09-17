/*
 * @Author: fantao.meng 
 * @Date: 2018-09-17 14:25:54 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-17 16:01:13
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { LOGOUT } from '../../Redux/ActionTypes';
import { ScrollContainer } from '../../Component';
import { ThemeStyles, px2dp, Colors, Metrics, FontSize, FontFamily } from '../../Theme';

class Settings extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        ...ThemeStyles.defaultHeaderStyle(navigation),
        headerTitle: '设置',
    })

    /**
     * 渲染退出登录
     */
    renderLogout () {
        return (
            this.props.isLogin &&
            <TouchableOpacity onPress={() => this.props.logout() }>
                <View style={{ marginTop: px2dp(40), padding: px2dp(34), backgroundColor: Colors.C8, alignItems: 'center' }}>
                    <Text style={{ color: 'red', fontSize: FontSize(28), fontFamily: FontFamily.PF_R }}>退出登录</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render () {
        return (
            <ScrollContainer>
                {this.renderLogout()}
            </ScrollContainer>
        )
    }
}

const Styles = StyleSheet.create({

});


const mapStateToProps = state => ({
    isLogin: state.user.access_token,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({ type: LOGOUT }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
