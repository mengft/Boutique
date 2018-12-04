import React from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableWithoutFeedback, Animated } from "react-native";
import { ScrollTable } from "../../Component";
import { ThemeStyles, px2dp, Metrics, FontSize } from "../../Theme";

class ChanelScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    renderChanelHeader () {
        return (
            <View style={Styles.header}>
                <ScrollTable
                    initialIndex={1}
                    labels={[{ key: 0, title: "精选" },{ key: 1, title: "推荐" },{ key: 2, title: "热门" }]}
                    onChange={e => console.log(e)}
                />
            </View>
        )
    }

    render () {
        return (
            <View style={ThemeStyles.container}>
                {this.renderChanelHeader()}
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    header: { backgroundColor: "#12cdb0", paddingTop: Metrics.STATUSBAR_HEIGHT, alignItems: "center" },
});

export default ChanelScreen;