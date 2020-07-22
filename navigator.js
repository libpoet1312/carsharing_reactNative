import React, { Component } from 'react'
import {Text} from "react-native";

import { StackNavigator} from '@react-navigation/native'
import startPage from './screens/startPage/startPage'

export const Navigator = new StackNavigator({
    StartScreen: { screen: startPage},
    Home: { screen: Home}
}, {
    initialRouteName: 'StartScreen'
});

export default class navigator extends Component {
    render() {
        return (
            <Text>123</Text>
        );
    }
}
