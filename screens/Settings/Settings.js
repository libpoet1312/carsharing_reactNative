import React, {Component} from 'react';
import {Container, Toast, Content, Tab, Tabs, Text} from 'native-base';
import {StyleSheet, TouchableHighlight, View} from "react-native";
import t from 'tcomb-form-native';
let Form = t.form.Form;
import axios from 'axios';
import {API_HTTP} from "../../config";





class Settings extends Component {
    constructor(props) {
        super(props);
        this.Pass = t.struct({
            password1: this.PasswordMinLength,              // a required string
            password2: this.ConfirmPasswordEquality,
        });

        this.options = {
            fields: {
                password1: {
                    label: 'Password',
                    password: true,
                    secureTextEntry: true,
                    error: (value) => {
                        // console.log(value, path, context);
                        if(!value)return 'Password length >= 6';
                    }

                },
                password2: {
                    label: 'Confirm Password',
                    password: true,
                    secureTextEntry: true,
                    error: 'Passwords dont match'
                }
            }
        };
    }
    state = {value: null};

    PasswordMinLength = t.refinement(t.String, value => {
        return value.length >= 6
    });

    ConfirmPasswordEquality = t.refinement(t.String, value => {
        console.log(this.refs.form.getComponent('password1').props.value);
        return value === this.refs.form.getComponent('password1').props.value
    });

    toastOpen = () => {
        Toast.show({text: 'Password Updated Successfully', type: "success", position: "top"})
    };


    onUpdatePass = () => {
        const value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            console.log(value); // value here is an instance of Pass
            this.setState({value});
            if(this.props.route.params.token){
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'JWT ' + this.props.route.params.token,
                    }
                };

                axios.patch(API_HTTP+'rest-auth/user/',{password1: value.password1, password2: value.password2}, config).then(() => (
                    this.toastOpen()
                )).catch(error=> {
                    console.log(error);
                })
            }else {
                console.log('skata');
            }

        }else {
            console.log(this.refs.form.validate());
        }
    };



    render() {


        return (
            <Container>
                <Tabs>
                    <Tab heading="Security Settings">
                        <Container style={styles.container}>
                            <Content>
                                <Form
                                    ref="form"
                                    type={this.Pass}
                                    options={this.options}
                                />

                                <TouchableHighlight style={styles.button} onPress={this.onUpdatePass} underlayColor='#99d9f4'>
                                    <Text style={styles.buttonText}>Update Password</Text>
                                </TouchableHighlight>
                            </Content>
                        </Container>
                    </Tab>
                    <Tab heading="Extra Settings">
                        <View>
                            <Text>Extra Settings</Text>
                        </View>
                    </Tab>

                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#ffffff',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    buttonCancel: {
        height: 36,
        backgroundColor: 'gray',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});

const mapStateToProps = state => {
    return {
        token: state.auth.user,
    }
};

export default (Settings);
