/*
 * @Author: fantao.meng 
 * @Date: 2018-08-30 16:31:25 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-08-30 16:35:05
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as PropTypes from 'prop-types';
import { px2dp, Colors, FontFamily, FontSize } from '../Theme';

export default class HeaderRight extends React.Component {
    
    static propTypes = {
        // icon props
        color: PropTypes.string,
        size: PropTypes.number,
        name: PropTypes.string,
        // text props
        text: PropTypes.string,
        textStyle: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number
        ]),
        // common props
        onPress: PropTypes.func,
        navigation: PropTypes.object.isRequired
    };

    static defaultProps = {
        color: Colors.C1,
        size: 26,
        name: 'md-add',
        text: null,
        textStyle: {},
    };

    render () {
        let { name, color, size, text, textStyle, onPress, navigation } = this.props
        return (
            <TouchableWithoutFeedback onPress={typeof onPress === 'function' ? onPress : () => navigation.goBack()}>
                <View style={Styles.container}>
                    { text ?
                        <Text style={[Styles.text, textStyle]}>{text}</Text>
                        :
                        <Icon name={name} color={color} size={size} />
                    }
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const Styles = StyleSheet.create({
    container: { paddingLeft: px2dp(30), paddingRight: px2dp(30) },
    text: { color: Colors.C1, fontSize: Platform.OS === 'ios' ? 17 : 20, },
})
