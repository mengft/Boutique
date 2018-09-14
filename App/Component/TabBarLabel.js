/*
 * @Author: fantao.meng
 * @Date: 2018-08-16 19:20:58
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-08-16 20:10:07
 */

import React from 'react';
// import * as PropTypes from 'prop-types';
import { Text } from 'react-native';

class TabBarLabel extends React.Component {
	// static propTypes = {
	// 	title: PropTypes.string,
	// 	tintColor: PropTypes.string,
	// };

    static defaultProps = {
    	title: '首页',
    	tintColor: '#3478f6',
    }

    constructor(props) {
    	super(props);
    	this.state = {};
    }

    render() {
    	const { title, tintColor } = this.props;
    	return (
    		<Text style={{ color: tintColor }}>{title}</Text>
    	);
    }
}

export default TabBarLabel;
