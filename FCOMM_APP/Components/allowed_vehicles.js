import React, { Component } from 'react';
import { View, ActivityIndicator, TextInput } from 'react-native';
import { Header, List, ListItem, Button, Text } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';

export default class Allowed extends Component {

    constructor(props) {
        super(props);
        this.state = { allVehicles: null, loading: true, newVehicle: "" }
    }
    componentDidMount() {
        var allVehicles = firebase.database().ref(`docks/${this.props.key_name}/allowed`);
        allVehicles.on('value', (snapshot) => {
            console.log("vehicles snap", snapshot.val());
            this.setState({ allVehicles: snapshot.val(), loading: false, newVehicle: "" });
        });
    }
    addVehicle() {
        if (this.state.newVehicle == "" || this.state.newVehicle == undefined || this.state.newVehicle == null)
            return;
        // var newDockKey = firebase.database().ref('docks/' + this.props.key).push().key;
        var allVehicles;
        if (this.state.allVehicles == null)
            allVehicles = [this.state.newVehicle];
        else {
            allVehicles = [...this.state.allVehicles, this.state.newVehicle];
        }
        // newDock[newDockKey] = dockData;
        return firebase.database().ref(`docks/${this.props.key_name}/allowed/`).update(allVehicles);
    }
    deleteVehicle(item) {
        var updated_vehicles = [...this.state.allVehicles];
        var index = updated_vehicles.indexOf(item);
        if (index > -1) {
            updated_vehicles.splice(index, 1);
        }
        return firebase.database().ref(`docks/${this.props.key_name}/allowed`).set(updated_vehicles);

    }
    renderItems() {
        console.log(this.props);
        if (this.state.loading == true)
            return (<ActivityIndicator size="large" color="#0000ff" style={{ alignSelf: "center" }} />)
        if (this.state.allVehicles == null)
            return
        if (this.props.key_name)
            return (
                <View style={{ marginTop: 40 }}>

                    <Text fontFamily="JosefinSansSemiBold" style={{ marginLeft: 15, fontSize: 20 }}>Allowed Vehicles</Text>

                    <List>
                        {this.state.allVehicles.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item}
                                rightIcon={{ type: "ionicon", name: "ios-close-outline" }}
                                fontFamily='JosefinSansSemiBold'
                                onPressRightIcon={() => this.deleteVehicle(item)}
                            />
                        ))}
                    </List>
                </View>
            )
    }
    render() {
        console.log(this.state);
        return (
            <View>
                <Header
                    centerComponent={{ text: 'Allowed Vehicles', style: { color: '#fff', fontSize: 25, fontFamily: 'JosefinSansSemiBold' } }}
                    backgroundColor='#23074d'
                />
                <TextInput
                    onChangeText={(text) => this.setState({ newVehicle: text })}
                    value={this.state.newVehicle}
                    style={{ height: 50, borderColor: '#23074d', borderWidth: 2, margin: 15, marginTop: 20, borderRadius: 5 }}
                    underlineColorAndroid="transparent"
                    placeholder="Enter number plate of Vehicle"
                    placeholderTextColor="#23074d"
                    fontFamily='JosefinSansSemiBold'
                    autoCapitalize='characters'
                />
                <Button
                    icon={{ name: 'add' }}
                    title='Allow a new Vehicle'
                    onPress={() => this.addVehicle()}
                    buttonStyle={{ backgroundColor: '#cc5333', borderRadius: 5, marginTop: 10 }}
                    fontFamily='JosefinSansSemiBold'
                />
                {
                    this.renderItems()
                }
            </View>)
    }
}
