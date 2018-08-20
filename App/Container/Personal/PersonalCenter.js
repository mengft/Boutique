/*
 * @Author: fantao.meng
 * @Date: 2018-08-15 17:51:54
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-08-20 10:35:35
 */

import React from 'react';
import {
	View, Text, ScrollView, StyleSheet,
} from 'react-native';
import { Header } from '../../Component';
import { Colors, ThemeStyles } from '../../Theme';

class PersonalCenter extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		...ThemeStyles.indexHeaderStyle,
	})

	render() {
		return (
			<ScrollView style={Styles.container}>
				<Header title="个人中心" iconName="md-hammer" />
			</ScrollView>
		);
	}
}

const Styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: Colors.C8 },
});

export default PersonalCenter;
