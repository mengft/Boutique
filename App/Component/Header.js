/*
 * @Author: fantao.meng
 * @Date: 2018-08-17 00:54:17
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-10-11 17:20:33
 */

import React from 'react';
import {
	View, Text, TouchableWithoutFeedback, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as PropTypes from 'prop-types';
import { Colors, px2dp, FontSize } from '../Theme';

class Header extends React.Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		iconName: PropTypes.string,
		iconColor: PropTypes.string,
		iconSize: PropTypes.number,
		onPress: PropTypes.func,
	};

	static defaultProps = {
		title: '',
		iconName: null,
		iconColor: Colors.C11,
		iconSize: 28,
		onPress: () => {},
	};

	render() {
		const {
			title, iconName, iconColor, iconSize, onPress,
		} = this.props;
		return (
			<View style={Styles.titleView} onLayout={this.props.onLayout}>
				<Text style={Styles.title}>{title}</Text>
				{ iconName
					&& (
						<TouchableWithoutFeedback onPress={onPress}>
							<Icon name={iconName} color={iconColor} size={iconSize} />
						</TouchableWithoutFeedback>
					)
				}
			</View>
		);
	}
}

const Styles = StyleSheet.create({
	titleView: {
		padding: px2dp(50), paddingTop: 0, paddingBottom: px2dp(18), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.C7,
	},
	title: {
		fontSize: FontSize(62), color: Colors.C11, fontFamily: 'PingFang-SC-Medium', textAlignVertical: 'bottom', includeFontPadding: true,
	},
});

export default Header;
