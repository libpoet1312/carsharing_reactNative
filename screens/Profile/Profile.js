import React, {Component} from 'react';
import { Container, Content, Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import { Image, ActivityIndicator, StyleSheet,View } from 'react-native';

import axios from 'axios';
import {API_HTTP} from "../../config";

class Profile extends Component {
    // alert('profile');
    state = {
        user: null,
        loading: true
    };

    fetchUserHandler = () => {
        // console.log(this.props.user.token);
        let pk = this.props.route.params.pk;
        console.log('pk:', pk);
        let config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'JWT ' + this.props.route.params.token,
            }
        };

        axios.get(API_HTTP + 'user/'+pk+'/', config)
            .then(res => {
                // console.log('rest auth', res.data);
                this.setState({
                    user: res.data,
                    loading: false
                });

            }).catch( err => {
            console.log(err);

        });
    };

    componentDidMount() {
        console.log('[componentDidMount]');
        // fetch the requested user only if current user is authenticated!
        this.fetchUserHandler();
    }

    render() {
        if(this.state.loading){
            return <ActivityIndicator size={'large'}/>
        }

        let gender = null;
        switch (this.state.user.gender) {
            case 'M': gender=<Text>Male</Text>;break;
            case 'F': gender=<Text>Female</Text>;break;
            case 'O': gender=<Text>Other</Text>;break;
            default: gender = <Text>Unknown</Text>;
        }

        let date = new Date(Date.parse(this.state.user.date_joined)).toDateString();

        return (
            <Container>
                <Content>
                    <Card >
                        <CardItem>
                            <Body style={{alignItems: 'center', justifyContent: 'center', }}>
                                <Thumbnail source={{uri: this.state.user.avatar}} style={styles.thumbnail}/>
                                <View style={{marginTop: 15, alignItems: 'center', justifyContent: 'center', }}>
                                    <Text style={styles.username}>{this.state.user.username}</Text>
                                    <Text style={styles.email}>{this.state.user.email}</Text>
                                </View>
                            </Body>
                        </CardItem>
                        <CardItem style={{justifyContent: 'center', }}>
                            <Left style={{flexDirection: 'column', alignItems: 'center'}}>
                                <Text style={styles.title}>Date of Birth:</Text>
                                <Text style={styles.info}>{this.state.user.dob}</Text>

                            </Left>
                            <Body style={{flexDirection: 'column', alignItems: 'center'}}>
                                <Text style={styles.title}>Phone:</Text>
                                <Text style={styles.info}>{this.state.user.phone}</Text>
                            </Body>
                            <Right style={{flexDirection: 'column', alignItems: 'center'}}>
                                <Text style={styles.title}>Gender:</Text>
                                <Text style={styles.info}>{gender}</Text>
                            </Right>
                        </CardItem>
                        <CardItem style={{justifyContent: 'center',}}>
                            <Left style={{flexDirection: 'column', alignItems: 'center'}}>
                                <Text style={styles.title}>Country:</Text>
                                <Text style={styles.info}>{this.state.user.country}</Text>

                            </Left>

                            <Right style={{flexDirection: 'column', alignItems: 'center'}}>
                                <Text style={styles.title}>Member Since:</Text>
                                <Text style={styles.info}>{date}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnail: {
        justifyContent: 'center',
        width: 150,
        height: 150,
        borderRadius: 100
    },
    username: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    email: {
        color: 'gray',
        fontSize: 15,
        marginTop: 5
    },
    title:{
        fontSize: 16,
        color: 'gray',
    },
    info: {
        fontSize: 15,
    }
});



export default (Profile);
