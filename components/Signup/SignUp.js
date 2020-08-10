import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import {Button, Icon} from "native-base";
let _ = require('lodash');

import t from 'tcomb-form-native';
let Form = t.form.Form;

let Gender = t.enums({
    M: 'Male',
    F: 'Female',
    O: 'Other',
});

let User = t.struct({
    email: t.String,
    username: t.String,
    password1: t.String,
    password2: t.String,
    phone_number: t.String,
    dob: t.Date,
    gender: Gender,
    terms: t.Boolean

});

// clone the default stylesheet
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
// stylesheet.textbox.normal.color = '#00FF00';

// stylesheet.textbox.normal.color = '#fff';
stylesheet.helpBlock.normal.color = '#fff';
stylesheet.formGroup.normal.color = '#fff';
stylesheet.fieldset.color= '#fff';

const options = {
    stylesheet: stylesheet,
    fields: {
        terms: {
            label: 'Agree to Terms',

        },
        password1: {
            label: "Password",
            password: true,
            secureTextEntry: true,
        },
        password2: {
            label: 'Confirm Password',
            password: true,
            secureTextEntry: true,
        },
        phone_number: {
            label: 'Phone Number'
        },
        dob: {
            mode: 'date', // display the Date field as a DatePickerAndroid,
            label: 'Date of Birth',
            maximumDate: Date.now()
        }
    },
};

const { width, height } = Dimensions.get('screen');

class Signup extends Component{

    state = {
        username: '',
        email: '',
        password1: '',
        password2: '',
        phone_number: '',
        avatar: null,
        gender: '',
        country: '',
        has_whatsup: '',
        has_viber: '',
        dob: ''

    };



    handleSubmit = () => {
        const value = this._form.getValue(); // use that ref to get the form value
        console.log('value: ', value);
    };

    render() {
        return(
            <ScrollView style={styles.container}>
                <Text>Signup</Text>
                <Form
                    ref={c => this._form = c} // assign a ref
                    type={User}
                    options={options}
                />


                <TouchableOpacity
                    style={styles.login}
                >

                    <Icon name="log-in" style={{fontSize: 50}} />
                </TouchableOpacity>


                <View style={{flexDirection:'row', justifyContent: 'space-evenly', width: width, marginTop: 50}}>
                    <Button iconLeft light
                            onPress={() => navigation.goBack()}
                    >
                        <Icon name='arrow-back' />
                        <Text> Back    </Text>
                    </Button>

                    <Button warning
                            onPress={() => navigation.goBack()}
                    >
                        <Text>    Sign Up    </Text>
                    </Button>
                </View>


            </ScrollView>

        )
    }



}

export default Signup;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        // backgroundColor: '#003f5c',
        padding: 20,
        // justifyContent: 'center',
        // alignItems: 'center'
    },

    login: {
        marginTop: 50,
        borderWidth: 1,
        borderColor:'rgba(0,0,0,0.2)',
        borderRadius:100,
        width:70,
        height:70,
        justifyContent:'center',
        alignItems:'center',
    },
    inputs: {
        marginTop:10,
        color:'black',
        fontSize:20,
        marginLeft:10,
        marginRight:10,
        borderColor:'black',
        width: 250,
        height: 33,
        textAlign: 'center',
        borderWidth:1,
        backgroundColor: '#fafdff'
    },
});
