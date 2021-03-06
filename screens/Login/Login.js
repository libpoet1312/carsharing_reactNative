import React, {Component} from 'react';
import {ActivityIndicator, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, Image} from "react-native";
import {Divider} from "react-native-elements";
import {H1, Button} from 'native-base';
import logo from '../../assets/images/sustain.jpeg'
import {connect} from 'react-redux';
import * as Facebook from 'expo-facebook';
import * as actions from '../../store/actions/authActions';
import {FACEBOOK_APP_ID} from "../../config";

const { width,  } = Dimensions.get('screen');



class Login extends Component{
    constructor(props) {
        super(props);
    }
    state={
        username: null,
        password: null
    };

    facebookLogIn = async () => {
        try {
            await Facebook.initializeAsync(FACEBOOK_APP_ID);

            const {
                type,
                token,
            } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                this.props.facebookAuth(token);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
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

                <Image source={logo} style={styles.logo}/>
                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="username..."
                        placeholderTextColor="#003f5c"
                        onChangeText={(username) => {
                            this.setState({username})
                        }}
                        value={this.state.username}
                    />
                </View>
                <View style={styles.inputView} >
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password..."
                        placeholderTextColor="#003f5c"
                        onChangeText={(password) => {
                            this.setState({password})
                        }}
                        value={this.state.password}
                    />
                </View>

                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}
                                  onPress={()=>this.handleSubmit()}
                >
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignUp')}
                >
                    <Text style={styles.loginText}>Signup</Text>
                </TouchableOpacity>

                <Divider style={{marginTop: 20 , backgroundColor: '#fff', height: 3, width: width-20}}/>
                <Button style={styles.fbBtn} full onPress={this.facebookLogIn}>
                    <H1 style={{ color: "#fff", textAlign: 'center' }}>FACEBOOK LOGIN</H1>
                </Button>

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
        onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
        facebookAuth: (token) => dispatch(actions.facebookAuth(token))
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#f5f5f5',
        backgroundColor: '#003f5c',
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

    // new styles
    inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"white"
    },
    forgot:{
        color:"white",
        fontSize:11
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color:"white"
    },
    logo: {
        width: width-50,
        height: 150,
        borderRadius: 200/5,
        marginBottom: 100

    },
    fbBtn: {
        height:50,
        marginTop: 20,
        backgroundColor: '#4267b2',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'center',
        alignContent: 'center'
    }
});
