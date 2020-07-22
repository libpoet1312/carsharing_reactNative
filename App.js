import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import axios from "axios";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import StartPage from './screens/startPage/startPage';
import Home from "./screens/Home/Home";
import Rides from "./screens/Rides/Rides";

import MyHeader from "./components/Header/Header";
import Loading from "./components/Loading/Loading";
import MainNavigation from "./MainNavigation";



class App extends Component{
    state = {
        isReady: false,
        loading: true,
        online: false,
        error: null
    };

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({ isReady: true });

        await axios.get('https://snf-876572.vm.okeanos.grnet.gr/')
            .then( res => {
                console.log(res.status);
                this.setState({
                    online: true,
                    loading: false
                });
            }).catch( error => {
            console.log(error);
            this.setState({
                online: false,
                error: error,
                loading: false
            });
        });
    }

    render() {
        if (!this.state.isReady && this.state.loading) {
            return <AppLoading />;
        }

        return(
            <>
                <StatusBar hidden/>
                <MainNavigation/>
            </>

      )
    }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
