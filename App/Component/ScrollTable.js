import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StatusBar, StyleSheet, TouchableWithoutFeedback, Animated, Easing, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

class ScrollTable extends React.Component {

    static propTypes = {
        initialIndex: PropTypes.number,
        labels: PropTypes.array,
        onChange: PropTypes.func,
        labelStyle: PropTypes.object,
        tintColor: PropTypes.string,
        style: PropTypes.object,
    }

    static defaultProps = {
        initialIndex: 0,
        labels: [{ key: 0, title: "精选" }, { key: 2, title: "热门" }],
        onChange: () => {},
        style: {},
        labelStyle: { color: "#FFFFFF", fontSize: 14 },
        tintColor: "#12cdb0",
    }

    constructor(props) {
        super(props);
        this.headerWidth = screenWidth * 0.4 * (props.labels.length / 2);
        this.headerHeight = 40;
        this.state = {
            index: props.initialIndex,
            translateX: new Animated.Value(props.initialIndex * this.headerWidth / props.labels.length)
        }
    }

    onHeaderClick (item, index) {
        if (this.state.index === index) return
            
        let diff = index - this.state.index;
        Animated.timing(this.state.translateX, {
            toValue: this.state.translateX["_value"] + diff * this.headerWidth / this.props.labels.length,
            duration: 200,
            // easing: Easing.ease,
            useNativeDriver: false,
        }).start(() => this.setState({ index }, () => this.props.onChange({ item, index })))
    }

    render () {
        const { labels, labelStyle, tintColor, style } = this.props;
        if (style.hasOwnProperty("width")) this.headerWidth = style["width"];
        if (style.hasOwnProperty("height")) this.headerHeight = style["height"];

        return (
            <View style={{ width: this.headerWidth, height: this.headerHeight, borderRadius: this.headerHeight, marginTop: 12, marginBottom: 12, backgroundColor: "#0fb299", ...style }}>
                <Animated.View ref="chanelAnimated" style={[Styles.chanelAnimated, { width: this.headerWidth / labels.length, height: this.headerHeight, borderRadius: this.headerHeight, transform: [{ translateX: this.state.translateX }] }]}/>
                <View style={[Styles.chanel, { width: this.headerWidth, height: this.headerHeight }]}>
                    {labels.map((item, index) => {
                        const checked = index === this.state.index
                        return (
                            <TouchableWithoutFeedback onPress={() => this.onHeaderClick(item, index)} key={item['key']}>
                                <View style={Styles.chanelItem}>
                                    <Text style={[Styles.chanelTitle, labelStyle, checked && { color: tintColor } ]}>{item['title']}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })}
                </View>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    chanel: { position: "absolute", flex: 1, flexDirection: 'row', alignItems: 'center' },
    chanelItem: { flex: 1, justifyContent: "center", alignItems: "center" },
    chanelAnimated: { backgroundColor: "#FFFFFF" }
});

export default ScrollTable;