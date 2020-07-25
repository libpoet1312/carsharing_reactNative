import React, {Component} from 'react';
import {ActivityIndicator, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions} from "react-native";
import {Button, Icon} from "native-base";

import {connect} from 'react-redux';
import * as actions from '../../store/actions/authActions';

const { width, height } = Dimensions.get('screen');



class Login extends Component{
    constructor(props) {
        super(props);
    }
    state={
        username: null,
        password: null
    };

    handleSubmit = () => {
        if(this.state.username && this.state.password){
            // console.log(this.state.username, this.state.password);
            this.props.onAuth(this.state.username, this.state.password);
        }else{
            alert('No credentials were given');
        }
    };

    render() {
        if(this.props.loading){
            return <ActivityIndicator size={'large'}/>
        }

        return(
            <View style={styles.container}>
                <View>
                    <TextInput
                        style={styles.inputs}
                        placeholder = "Username"
                        onChangeText={(username) => {
                            this.setState({username})
                        }}
                        value={this.state.username}
                    />
                </View>

                <View>
                    <TextInput secureTextEntry={true}
                               style={styles.inputs}
                               placeholder = "Password"
                               onChangeText={(password) => {
                                   this.setState({password})
                               }}
                               value={this.state.password}
                    />
                </View>


                <TouchableOpacity
                    style={styles.login}
                    onPress={()=>this.handleSubmit()}
                >
                    <Icon name="log-in" style={{fontSize: 50}} />
                </TouchableOpacity>


                <View style={{flexDirection:'row', justifyContent: 'space-evenly', width: width, marginTop: 50}}>
                    <Button iconLeft light
                            onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='arrow-back' />
                        <Text> Back    </Text>
                    </Button>

                    <Button warning
                            onPress={() => this.props.navigation.navigate('SignUp')}
                    >
                        <Text>    Sign Up    </Text>
                    </Button>
                </View>


            </View>

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
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
