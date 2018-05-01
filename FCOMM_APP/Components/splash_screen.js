
import React, { Component } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight,
    Image,
    ImageBackground,
    WebView,
    Linking
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SplashScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flag: 0,
        }
    }
    renderLoading() {
        return (
            <ActivityIndicator size="large" color="#23074d" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }} />
        )
    }
    render() {
        console.log(this.state.flag);
        if (this.state.flag == 0) {
            return (
                <ImageBackground style={styles.container} source={require("../assets/images/splash.jpg")}>
                    <Text style={styles.welcome}>
                        Dockhy
                    </Text>
                    <Text style={styles.bestApp}>
                        The best Warehouse Managing System.
        </Text>
                    <TouchableHighlight style={styles.button} onPress={() => { Actions.docks({ type: 'reset' }) }}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Text style={styles.buttonText}>
                                Let me in
          </Text>
                        </View>
                    </TouchableHighlight>
                </ImageBackground>
            );
        }
        // else {
        //   return (
        //     // <WebView source={{ uri: this.state.uri }} renderLoading={() => this.renderLoading()} startInLoadingState={true} />
        //     Linking.openURL(this.state.uri)
        //   )
        // }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: "relative"
    },
    welcome: {
        fontSize: 48,
        textAlign: "center",
        top: "15%",
        fontFamily: "JosefinSansSemiBold",
        color: "#FFFFFF",
        position: "absolute"
    },
    bestApp: {
        fontSize: 18,
        fontFamily: "JosefinSansSemiBold",
        position: "absolute",
        color: "#FFFFFF",
        top: "32%"
    },
    button: {
        borderColor: "#56CCF2",
        // boxSizing: "border-box",
        borderRadius: 100,
        borderWidth: 2.5,
        // fontFamily: "JosefinSansSemiBold",
        top: "67%",
        position: "absolute",
        width: "75%",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 15,
        fontFamily: "JosefinSansSemiBold",
        color: "#FFFFFF",
        margin: 10
    },
    google: {
        width: 30,
        height: 30,
        margin: 5
    }
});
