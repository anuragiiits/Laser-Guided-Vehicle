/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as firebase from 'firebase';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Docks from './Components/docks';
import Allowed from './Components/allowed_vehicles';
import SplashScreen from './Components/splash_screen';

type Props = {};

var config = {
  apiKey: "AIzaSyBwzbvff8Hy2-5oE7kcdb1MGtK_pjtHiKc",
  authDomain: "vocshare-38d1f.firebaseapp.com",
  databaseURL: "https://vocshare-38d1f.firebaseio.com",
  projectId: "vocshare-38d1f",
  storageBucket: "vocshare-38d1f.appspot.com",
  messagingSenderId: "360319060203"
};
firebase.initializeApp(config);
export default class App extends Component<Props> {

  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="splash_screen" component={SplashScreen} initial hideNavBar />
          <Scene key="docks" component={Docks} hideNavBar />
          <Scene key="allowed" component={Allowed} hideNavBar />
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
