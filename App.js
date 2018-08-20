/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import RootNavigation from './App/Navigation/RootNavigation';

// 黄盒警告
YellowBox.ignoreWarnings([
	'You should only render one navigator explicitly in your app',
	// 'Functions are not valid as a React child',
]);

type Props = {};
export default class App extends Component<Props> {
	render() {
		return (
			<RootNavigation />
		);
	}
}
