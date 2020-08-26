import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import React, {Component} from 'react';

import { Provider, } from 'react-redux';
import { StatusBar} from 'react-native';
import axios from "axios";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import {store} from './store/store';

import MainNavigation from "./MainNavigation";


class App extends Component{
    state = {
        isReady: false,
        loading: true,
        online: false,
        error: null
    };

    render() {
        if (!this.state.isReady) {
            return <AppLoading
                startAsync={this._cacheResourcesAsync}
                onFinish={()=>this.setState({isReady: true})}
                onError={console.warn}
            />;
        }

        return(

            <Provider store={store}>
                <StatusBar hidden/>
                <MainNavigation/>
            </Provider>
        )
    }

    async _cacheResourcesAsync() {

        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });

        await axios.get('https://snf-876572.vm.okeanos.grnet.gr/')
            .then( () => {
                // console.log(res.status);
            }).catch( error => {
                console.log(error);
            });

        // return new Promise;
    }
}

export default (App);
