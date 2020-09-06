import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native';
import {Button, Text, } from "native-base";
import logo from "../../assets/images/carsharing.jpg";


class Home extends Component {
    render() {


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



                <View style={{marginTop: 40}}>
                    <Button
                        onPress={()=> this.props.navigation.navigate('Rides')}
                    >
                        <Text>Go to Rides</Text>
                    </Button>


                </View>

            </View>
        )
  }
}


export default (Home);



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
