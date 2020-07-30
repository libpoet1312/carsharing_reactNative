import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import React, {Component} from 'react';

import { connect } from 'react-redux';
import * as actions from './store/actions/authActions';

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
            <Provider store={store}>
                <StatusBar hidden/>
                <MainNavigation/>
            </Provider>

      )
    }
}

export default (App);
