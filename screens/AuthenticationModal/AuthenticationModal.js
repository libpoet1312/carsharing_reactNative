import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, Dimensions, TextInput} from "react-native";
import Login from "../../components/LoginForm/Login";
import Signup from "../../components/Signup/SignUp";

const { width, height } = Dimensions.get('screen');

class AuthenticationModal extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        signup: false,
        forgot: false
    };

    render() {
        let modal = <Login navigation={this.props.navigation}/>;
        if(this.state.signup===true){
            modal = <Signup/>
        }

        return (
            modal
        );
    }
}


export default AuthenticationModal;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 24,
        marginBottom: 10
    },
    loginButtonLabel: {
        fontSize: 22
    },
    navButtonText: {
        fontSize: 16
    }
});
