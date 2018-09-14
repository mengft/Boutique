/*
 * @Author: fantao.meng 
 * @Date: 2018-09-07 14:54:59 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-09-08 12:41:59
 */

import React from 'react';
import { View, ScrollView } from 'react-native';
import {
    Svg,
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    TSpan,
    TextPath,
    Use,
    Defs,
    Stop,
} from 'react-native-svg';
import { px2dp, ThemeStyles, Colors, Metrics } from '../../Theme';

 export default class ChartScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        ...ThemeStyles.defaultHeaderStyle(navigation),
        headerTitle: '图表界面',
    });

    render () {
        return (
            <ScrollView style={ThemeStyles.container}>
                <Svg
                    width={`${Metrics.screenWidth}`}
                    height={`${Metrics.screenHeight}`}
                >
                    <Rect
                        x="15" 
                        y="15" 
                        width="100" 
                        height="200" 
                        fill="green"
                        fillOpacity="1"
                        fillRule=""
                        stroke="red"
                        strokeWidth="2"
                    />
                </Svg>
            </ScrollView>
        )
    }
}

