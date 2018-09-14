/*
 * @Author: fantao.meng
 * @Date: 2018-09-05 17:47:13
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-11 19:18:40
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListView, { Item } from '../../Component/ListView';
import { ThemeStyles, px2dp, FontFamily, FontSize, Colors, Metrics } from '../../Theme'

class PersonalInfo extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        ...ThemeStyles.defaultHeaderStyle(navigation),
        headerTitle: '个人资料',
    });

    constructor (props) {
        super(props);
        this.state = {
        };
    }
    /**
     * display
     * function
     * siwtch
     */

    render() {
    	return (
            <ScrollView style={Styles.container}>
                <ListView>
                    <Item type='onPress' title='姓名' text='孟汉唐' onPress={() => alert('onPress')} />
                    <Item type='display' title='毕业院校' text='清华大学' />
                    <Item type='display' title='最高学历' text='硕士' />
                    <Item type='switch' title='是否汉族' />
                </ListView>
    		</ScrollView>
    	);
    }
}

const Styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.CBK },
})

export default connect()(PersonalInfo);
