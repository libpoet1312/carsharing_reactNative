import React, {Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';

import logo from '../../assets/images/carsharing.jpg';
import axios from 'axios';

class StartPage extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: true,
        online: false,
        error: null
    };

    componentDidMount() {
        axios.get('https://snf-876572.vm.okeanos.grnet.gr/')
            .then( res => {
                console.log(res.status);
                this.setState({
                    online: true,
                    loading: false
                });
                this.props.navigation.navigate('Home');
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


        return (
            <View style={styles.container}>
                <Text style={styles.title}>CarSharing App</Text>
                <Image
                    source={logo}
                    style={styles.logo}
                />
                <Text>A sustainable way to travel</Text>
                {this.state.loading ?
                    <ActivityIndicator size="large" />
                    : this.state.error ?
                        <View>
                            <Text style={styles.error}>Error connecting to server!</Text>
                            <Text style={styles.error}>Try again later!</Text>
                        </View>

                        : <Text style={styles.error}>123</Text>
                }
            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    logo: {
        width: 250,
        height: 250,
        borderRadius: 300/ 2
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    error: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ff0000'
    }
});

export default StartPage;
