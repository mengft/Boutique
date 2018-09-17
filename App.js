/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux'
import configureStore from './App/Redux/CreateStore'
import RootNavigation from './App/Navigation/RootNavigation';
import { PersistGate } from 'redux-persist/integration//react';		// persist 持久化数据恢复分发过程
import { LoadView } from './App//Component/';

// 黄盒警告
YellowBox.ignoreWarnings([
	'You should only render one navigator explicitly in your app',
	// 'Functions are not valid as a React child',
]);

type Props = {};
export default class App extends Component<Props> {
	render() {
		let { store, persistor } = configureStore();
		return (
			<Provider store={store}>
				<PersistGate loading={<LoadView gif='triangles' />} persistor={persistor}>
					<RootNavigation />
				</PersistGate>
			</Provider>
		);
	}
}
