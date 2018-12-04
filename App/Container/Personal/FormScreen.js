/*
 * @Author: fantao.meng 
 * @Date: 2018-09-06 10:26:04 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-18 09:16:31
 */

import React, { ReactNode } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, NativeModules, Keyboard, findNodeHandle, Animated } from 'react-native';
import { KeyboardAvoidingView } from '../../Component';
import { Colors, px2dp, ThemeStyles, FontSize, FontFamily } from '../../Theme';

export default class FormScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        ...ThemeStyles.defaultHeaderStyle(navigation),
        headerTitle: '表单界面',
    });

    constructor (props) {
        super (props);
        this.state = {
        }
    }

    render () {
        return (
            <KeyboardAvoidingView>
                <TextInput style={Styles.textInput} placeholder='课程标题' placeholderTextColor={Colors.C5} />
                <TextInput style={Styles.textInput} placeholder='简介' placeholderTextColor={Colors.C5} />
                <TextInput style={Styles.textInput} placeholder='人数上限' placeholderTextColor={Colors.C5} keyboardType='numeric' />
                <TextInput style={Styles.textInput} placeholder='课程标题' placeholderTextColor={Colors.C5} />
                <TextInput style={Styles.textInput} placeholder='简介' placeholderTextColor={Colors.C5} />
                <TextInput style={Styles.textInput} placeholder='活动地点' placeholderTextColor={Colors.C5} />
                <TextInput style={Styles.textInput} placeholder='活动地点1' placeholderTextColor={Colors.C5} />
                <TextInput style={Styles.textInput} placeholder='活动地点2' placeholderTextColor={Colors.C5} />
                <TextInput style={Styles.textInput} placeholder='活动地点3' placeholderTextColor={Colors.C5} />
            </KeyboardAvoidingView>
        )
    }
}

const Styles = StyleSheet.create({
    textInput: { color: Colors.C1, height: FontSize(110), borderBottomWidth: StyleSheet.hairlineWidth * 2, borderBottomColor: Colors.C7 },
    textarea: { color: Colors.C1, height: FontSize(250) }
});