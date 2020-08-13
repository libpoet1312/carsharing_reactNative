import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView} from "react-native";
import {Button, Icon} from "native-base";
let _ = require('lodash');
import {connect} from "react-redux";
import * as authActions from '../../store/actions/authActions';

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
//
// stylesheet.helpBlock.normal.color = '#fff';
// stylesheet.formGroup.normal.color = '#fff';
// stylesheet.fieldset.color= '#fff';

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

const { width, } = Dimensions.get('screen');

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
        if(value.password1!==value.password2){
            alert('Passwords must match!');
            return 0;
        }
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


                <TouchableOpacity style={styles.singUpBtn}
                                  onPress={()=>this.handleSubmit()}
                >
                    <Text style={styles.singUpText}>SIGNUP</Text>
                </TouchableOpacity>


                {/*<View style={{flexDirection:'row', justifyContent: 'space-evenly', width: width,}}>*/}
                {/*    <Button iconLeft light*/}
                {/*            onPress={() => navigation.goBack()}*/}
                {/*    >*/}
                {/*        <Icon name='arrow-back' />*/}
                {/*        <Text> Back    </Text>*/}
                {/*    </Button>*/}
                {/*</View>*/}
            </ScrollView>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2,
                 phone_number, avatar, gender, country,
                 has_whatsup, has_viber, dob) => dispatch(authActions.authSignup(username, email, password1, password2,
            phone_number, avatar, gender, country, has_whatsup, has_viber, dob))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

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
    singUpBtn:{
        // width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        // marginBottom:10
    },
    singUpText:{
        color:"white"
    },
});
