/*
 * @Author: fantao.meng 
 * @Date: 2018-09-05 19:29:16 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-05 22:09:09
 */

import React from 'react';
import * as PropTypes from 'prop-types';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeStyles, px2dp, FontFamily, FontSize, Colors, Metrics } from '../Theme'

export default class ListView extends React.Component {
    render () {
        return (
            React.Children.map(this.props.children, child => {
                return child;
            })
        )
    }
};

export class Item extends React.Component {

    static propTypes = {
        type: PropTypes.oneOf([
            'display', 'onPress', 'switch',
        ]).isRequired,
    };

    /**
     * 渲染React.Child
     */
    renderElementByType () {
        switch (this.props.type) {
            case 'display':
                return (
                    <View style={Styles.listItem}>
                        <Text style={Styles.listTitle} numberOfLines={1}>{this.props.title}</Text>
                        <Text style={Styles.listText} numberOfLines={1}>{this.props.text}</Text>
                    </View>
                );
            case 'onPress':
                return (
                    <TouchableOpacity onPress={() => this.props.onPress()}>
                        <View style={Styles.listItem}>
                            <Text style={Styles.listTitle} numberOfLines={1}>{this.props.title}</Text>
                            <Text style={Styles.listText} numberOfLines={1}>{this.props.text}</Text>
                            <Icon name='angle-right' color={Colors.C1} size={px2dp(50)} style={{ marginLeft: px2dp(20) }} />
                        </View>
                    </TouchableOpacity>
                );
            case 'switch':
                return (
                    <View style={Styles.listItem}>
                        <Text style={Styles.listTitle} numberOfLines={1}>{this.props.title}</Text>
                        <Switch {...this.props} />
                    </View>
                )           
            default:
                return <View/>;
        }
    }

    render () {
        return (
            <View style={Styles.listView}>
                {this.renderElementByType()}
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    listView: { paddingLeft: px2dp(30) },
    listItem: { paddingRight: px2dp(30), height: px2dp(112), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.CBL },
    listTitle: { maxWidth: Metrics.screenWidth / 2, fontSize: FontSize(28), color: Colors.C1, fontFamily: FontFamily.PF_M },
    listText: { flex: 1, textAlign: 'right', marginLeft: px2dp(100), fontSize: FontSize(28), color: Colors.C1, fontFamily: FontFamily.PF_L },
})