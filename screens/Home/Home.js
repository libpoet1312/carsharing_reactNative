import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator, Image, TextInput } from 'react-native';
import axios from "axios";
import {Button, Text, } from "native-base";
import logo from "../../assets/images/carsharing.jpg";
import * as authActions from "../../store/actions/authActions";
import {connect} from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';

class Home extends Component {
    render() {
        let value;
        // try{
        //     let jsonValue = (AsyncStorage.getItem('user'));
        //     value = jsonValue != null ? JSON.parse(jsonValue):null;
        // }catch (e) {
        //     console.log(e);
        // }

        try{
            let lala = (AsyncStorage.getItem('lala'));
            value = lala != null ? lala:null;
        }catch (e) {
            console.log(e);
        }


        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    CarSharing
                </Text>
                <Image
                    source={logo}
                    style={styles.logo}
                />
                <Text style={styles.subtitle}>a sustainable way to travel</Text>



                <View>
                    <Button
                        onPress={()=> this.props.navigation.navigate('Rides')}
                    >
                        <Text>Go to Rides</Text>
                    </Button>
                    <Button danger
                        onPress={()=> this.props.logout()}
                    >
                        <Text>Logout</Text>
                    </Button>
                    <Text>
                        123{value}
                    </Text>

                </View>

            </View>
        )
  }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authActions.logout()),
    }
};

export default connect(null, mapDispatchToProps)(Home);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 300/ 2
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: 'bold'
    },
    search: {
        flex:1,
        borderColor: '#000',
        borderWidth: 1,

    },
    textInput: {
        textAlign: 'center',
        borderRadius: 1,
        margin: 15,
        height: 40,
        width: 150,
        borderColor: '#ff0a00',
        borderWidth: 1
    }

});
