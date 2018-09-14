/*
 * @Author: fantao.meng 
 * @Date: 2018-08-29 00:48:46 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-13 16:33:55
 */

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import * as PropTypes from 'prop-types'
import { Colors, px2dp, FontSize } from '../Theme'

export default class LoadView extends React.Component {

    static propTypes = {
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number
        ]),
        iconSize: PropTypes.number,
        message: PropTypes.string,
        visible: PropTypes.bool,
        gif: PropTypes.string,
    };

    static defaultProps = {
        style: {},
        iconSize: px2dp(80),
        visible: true,
        message: null,
        gif: 'spinner',
    };

    render () {
        let { style, iconSize, message, visible, gif } = this.props
        return (
            visible &&
            <View style={[Styles.container, style]}>
                { gif === 'triangles' ?
                    <Image style={{ width: iconSize, height: iconSize }} source={require(`../Assets/Images/Component/loading-triangles.gif`)} />
                    :
                    <Image style={{ width: iconSize, height: iconSize }} source={require(`../Assets/Images/Component/loading-spinner.gif`)} />
                }
                { message && <Text style={Styles.message}>载入中</Text> }
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.C8, justifyContent: 'center', alignItems: 'center' },
    message: { color: Colors.C3, fontSize: FontSize(22), fontWeight: 'bold', marginTop: px2dp(10) }
})
