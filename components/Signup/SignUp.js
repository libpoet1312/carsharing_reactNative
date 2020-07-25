import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions} from "react-native";
import {Button, Icon} from "native-base";



const { width, height } = Dimensions.get('screen');

const Signup = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <View style={styles.container}>
            <Text>Signup</Text>
            <View>
                <TextInput style={styles.inputs} placeholder = "Email"/>
            </View>

            <View>
                <TextInput secureTextEntry={true}
                           style={styles.inputs} placeholder = "Password"
                />
            </View>


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


        </View>

    )

};

export default Signup;

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
