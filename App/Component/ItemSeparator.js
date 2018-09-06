/*
 * @Author: fantao.meng 
 * @Date: 2018-08-30 11:13:00 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-08-30 11:29:33
 */

import React from 'react';
import { View, StyleSheet } from 'react-native'
import { Colors, px2dp } from '../Theme'

export default class ItemSeparator extends React.Component {
    render () {
        return (
            <View style={Styles.container} />
        )
    }
}

const Styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.C7, height: StyleSheet.hairlineWidth * 2 }
})