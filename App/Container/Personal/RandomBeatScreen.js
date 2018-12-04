/*
 * @Author: fantao.meng 
 * @Date: 2018-11-24 23:39:22 
 * @Last Modified by: fantao.meng
 * @Last Modified time: 2018-11-27 13:45:03
 */

import React from 'react';
import { View, Text, Image, ImageBackground, Animated, InteractionManager, TouchableWithoutFeedback, Dimensions } from 'react-native';
const Metrics = {
	screenWidth: Dimensions.get('window').width
}

// 跳动Items，通过props传入
const beatProps = [
	{ key: 0, value: "item0" },
	{ key: 1, value: "item1" },
	{ key: 2, value: "item2" },
	{ key: 3, value: "item3" },
	{ key: 4, value: "item4" },
	{ key: 5, value: "item5" },
];

class RandomBeatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
    	// ...ThemeStyles.defaultHeaderStyle,
    	headerTitle: '随机跳动',
    });

    constructor(props) {
		super(props);
    	this.state = {
			beatProps: [],
			...this.initAnimatedValue(),
    	};
	}

	componentWillMount() {
		this.combineBaetProps();
	}
	
	componentDidMount() {
		// 依次触发动画
		this.state.beatProps.map((item, index) => {
			if (item) this.beatEffect(`marginTop${index}`);
		});
	}
	
	/**
	 * 拼凑九宫格数据
	 */
	combineBaetProps () {
		let beatPropsLength = beatProps.length;
		let temp = [...beatProps];
		if (temp.length < 9) {
			for (let i = 0; i < 9 - beatPropsLength; i++) {
				let randomPosition = Math.floor(Math.random() * (beatPropsLength + i - 1) + 1);
				temp.splice(randomPosition, 0, null);
			}
		} else {
			temp = temp.slice(0, 9);
		}
		this.setState({ beatProps: temp });
	}

	/**
	 * 初始化动画AnimtedValue
	 */
	initAnimatedValue () {
		let animatedValueoObject = {};
		"012345678".split("").map((item, index) => {
			animatedValueoObject[`marginTop${index}`] = new Animated.Value(0);
			animatedValueoObject[`opacity${index}`] = new Animated.Value(1);
		});
		return animatedValueoObject;
	}
	
	/**
	 * 动画周期递归
	 * @param {key of state} key 
	 */
	beatEffect (key) {
		if (this[`${key}start`] === undefined) {
			this[`${key}start`] = 
				Animated.timing(this.state[key], {
					toValue: 6,
					duration: 1000,
					isInteraction: true
				});
		}
		if (this[`${key}end`] === undefined) {
			this[`${key}end`] = 
				Animated.timing(this.state[key], {
					toValue: 0,
					duration: 1000,
					isInteraction: true
				});
		}
		this[`${key}start`].start((e) => {
			if (e.finished) {
				this[`${key}end`].start((f) => {
					if (f.finished) this.beatEffect(key);
				});
			}
		});
	}

	/**
	 * 点击随机跳动Item
	 * @param {*} item 
	 * @param {*} index 
	 */
	onPressBeatItem(item, index, e) {
		// 停止操作元素跳动效果
		this[`marginTop${index}start`].stop();
		this[`marginTop${index}end`].stop();
		// 开启操作元素上滑消失效果
		Animated.parallel([
			// 位置
			Animated.timing(this.state[`marginTop${index}`], {
				toValue: -50,
				duration: 800,
				isInteraction: true
			}).start(),
			// 透明度
			Animated.timing(this.state[`opacity${index}`], {
				toValue: 0,
				duration: 800,
				isInteraction: true
			}).start(() => {
				// 更新数据源
				let temp = this.state.beatProps;
				temp.splice(index, 1, null);
				this.setState({ beatProps: temp })
			})
		], { stopTogether: false });
	}

	/**
	 * 渲染动画区域(背景Image)
	 */
	renderBeatArea () {
		let mainWidth = Metrics.screenWidth * 0.7
		return (
			<ImageBackground style={{ height: 222, width: Metrics.screenWidth, alignItems: 'center', overflow: 'hidden' }} source={require('../../Assets/Images/Personal/back1.jpeg')}>
				<View style={{ flexDirection: 'row', flexWrap: 'wrap', width: mainWidth, marginTop: 30 }}>
					{ this.state.beatProps.map((item, index) => {
							return (
								item ?
								<TouchableWithoutFeedback onPress={e => this.onPressBeatItem(item, index, e)} key={index}>
									<Animated.View style={{ width: mainWidth / 3, height: 52, justifyContent: 'center', alignItems: 'center', marginTop: this.state[`marginTop${index}`], opacity: this.state[`opacity${index}`] }}>
										<Image style={{ height: 36, width: 36 }} source={require('../../Assets/Images/Personal/ic_launcher.png')} />
										<Text style={{ position: 'absolute', bottom: 2, color: '#FFFFFF', fontSize: 10 }}>随机0.25～5</Text>
									</Animated.View>
								</TouchableWithoutFeedback>
								:
								<View style={{ width: mainWidth / 3, height: 52 }} key={index}/>
							)
						})
					}
				</View>
			</ImageBackground>
		)
	}

    render() {
    	return (
    		<View style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
				{this.renderBeatArea()}
	        </View>
    	);
    }
}

export default RandomBeatScreen;
