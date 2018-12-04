/*
 * @Author: fantao.meng 
 * @Date: 2018-08-29 00:48:46 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-20 16:46:22
 */

import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import * as PropTypes from 'prop-types'

export default class LoadView extends React.Component {

    static propTypes = {
        style: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.number
        ]),
        iconSize: PropTypes.number,
        message: PropTypes.string,
        visible: PropTypes.bool,
        gif: PropTypes.oneOf(["spinner", "triangles"]),
    };

    static defaultProps = {
        style: {},
        iconSize: 40,
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
    container: { flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' },
    message: { color: '#54657e', fontSize: 11, fontWeight: 'bold', marginTop: 5 }
})
