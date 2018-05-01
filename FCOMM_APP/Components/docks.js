import React, { Component } from 'react';
import { KeyboardAvoidingView, ActivityIndicator, TextInput, View } from 'react-native';
import { Header, List, ListItem, Button, Icon, Text } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';

export default class Docks extends Component {

    constructor(props) {
        super(props);
        this.state = { docks: null, loading: true, newDock: "" }
    }
    componentDidMount() {
        var allDocks = firebase.database().ref('docks/');
        allDocks.on('value', (snapshot) => {
            this.setState({ docks: snapshot.val(), loading: false, newDock: "" });
        });
    }
    deleteDock(key) {
        return firebase.database().ref(`docks/${key}`).remove();
    }
    renderItems() {
        if (this.state.loading == true)
            return (<ActivityIndicator size="large" color="#0000ff" style={{ alignSelf: "center", margin: 40 }} />)

        if (this.state.docks == null)
            return;
        return (
            <View style={{ marginTop: 40 }}>
                <Text fontFamily="JosefinSansSemiBold" style={{ marginLeft: 15, fontSize: 20 }}>All Warehouses</Text>
                <List>
                    {
                        Object.keys(this.state.docks).map((key, index) => {
                            // myObject[key] *= 2;
                            return (<ListItem
                                key={index}
                                title={this.state.docks[key].name}
                                onPress={() => Actions.allowed({ "allowed": this.state.docks[key].allowed, key_name: key })}
                                onPressRightIcon={() => this.deleteDock(key)}
                                rightIcon={{ type: "ionicon", name: "ios-trash" }}
                                fontFamily='JosefinSansSemiBold'
                                leftIcon={{ type: 'ionicon', name: 'ios-home' }}
                            />)
                        })
                    }
                </List>
            </View>
        )
    }
    addDock() {
        if (this.state.newDock == "" || this.state.newDock == undefined || this.state.newDock == null)
            return;
        const dockData = {
            name: this.state.newDock,
            allowed: []
        }
        var newDockKey = firebase.database().ref('docks/').push().key;
        var newDock = {};
        newDock[newDockKey] = dockData;
        return firebase.database().ref('docks/').update(newDock);
    }
    render() {
        const list = [
            {
                title: 'Appointments',
                icon: 'av-timer'
            },
            {
                title: 'Trips',
                icon: 'flight-takeoff'
            },
        ]
        console.log(this.state);
        return (
            <KeyboardAvoidingView>
                <Header
                    centerComponent={{ text: 'All Docks', style: { color: '#fff', fontSize: 25, fontFamily: 'JosefinSansSemiBold' } }}
                    backgroundColor='#23074d'
                />
                <TextInput
                    style={{ height: 50, borderColor: '#23074d', borderWidth: 2, margin: 15, marginTop: 20, borderRadius: 5 }}
                    onChangeText={(text) => this.setState({ newDock: text })}
                    value={this.state.newDock}
                    underlineColorAndroid="transparent"
                    placeholder="Enter name of Dock"
                    placeholderTextColor="#23074d"
                    fontFamily='JosefinSansSemiBold'

                />
                <Button
                    icon={{ name: 'add' }}
                    title='Add a new Dock'
                    onPress={() => this.addDock()}
                    buttonStyle={{ backgroundColor: '#cc5333', borderRadius: 5, marginTop: 10 }}
                    fontFamily='JosefinSansSemiBold'

                />
                {
                    this.renderItems()
                }
            </KeyboardAvoidingView>)
    }
}
