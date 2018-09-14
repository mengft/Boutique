/*
 * @Author: fantao.meng 
 * @Date: 2018-09-12 17:09:49 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-12 19:38:15
 */

import * as PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, px2dp, Metrics, FontSize, FontFamily } from '../Theme';

export default class SubmitButton extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        titleStyle: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number,
        ]),
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number,
        ]),
        onPress: PropTypes.func.isRequired,
        valid: PropTypes.bool,
    };

    static defaultProps = {
        title: '提交',
        onPress: () => {},
        valid: true,
    };

    render () {
        let { title, titleStyle, style, onPress, valid } = this.props;
        return (
            <TouchableOpacity onPress={typeof onPress === 'function' && onPress} disabled={!valid}>
                <View style={[Styles.container, style, !valid && { opacity: 0.4 } ]}>
                    <Text style={[Styles.title, titleStyle]}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const Styles = StyleSheet.create({
    container: { height: px2dp(90), borderRadius: px2dp(45), backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' },
    title: { color: Colors.C8, fontSize: FontSize(28), }
});

{/* <SubmitButton 
    title='登录'
    valid={username.trim() && password.trim() && true || false}
    onPress={() => alert('登录')}
    style={{ marginTop: px2dp(60) }}
/> */}