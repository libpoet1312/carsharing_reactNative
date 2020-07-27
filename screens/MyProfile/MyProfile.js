import React, {Component} from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ListItem } from 'native-base';
import { FlatList, ActivityIndicator, StyleSheet,View,SafeAreaView } from 'react-native';

import axios from 'axios';
import {API_HTTP} from "../../config";
import {connect} from 'react-redux';

class MyProfile extends Component {
    // alert('profile');
    state = {
        user: null,
        loading: true,
        data: [
            { name: "Movies", header: true },
            { name: "Interstellar", header: false },
            { name: "Dark Knight", header: false },
            { name: "Pop", header: false },
            { name: "Pulp Fiction", header: false },
            { name: "Burning Train", header: false },
            { name: "Music", header: true },
            { name: "Adams", header: false },
            { name: "Nirvana", header: false },
            { name: "Amrit Maan", header: false },
            { name: "Oye Hoye", header: false },
            { name: "Eminem", header: false },
            { name: "Places", header: true },
            { name: "Jordan", header: false },
            { name: "Punjab", header: false },
            { name: "Ludhiana", header: false },
            { name: "Jamshedpur", header: false },
            { name: "India", header: false },
            { name: "People", header: true },
            { name: "Jazzy", header: false },
            { name: "Appie", header: false },
            { name: "Baby", header: false },
            { name: "Sunil", header: false },
            { name: "Arrow", header: false },
            { name: "Things", header: true },
            { name: "table", header: false },
            { name: "chair", header: false },
            { name: "fan", header: false },
            { name: "cup", header: false },
            { name: "cube", header: false }
        ],
    };


    fetchUserHandler = () => {
        // console.log(this.props.user.token);

        let config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'JWT ' + this.props.user.token,
            }
        };

        axios.get(API_HTTP + 'rest-auth/user/', config)
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

    renderItem = ({item}) =>{
        return (
            <ListItem itemDivider>
                <Left />
                <Body style={{ marginRight: 40 }}>
                    <Text style={{ fontWeight: "bold" }}>
                        {item.name}
                    </Text>
                </Body>
                <Right />
            </ListItem>
        );
    };

    componentDidMount() {
        console.log('[componentDidMount]');
        // fetch the requested user only if current user is authenticated!
        if(this.props.user){
            this.fetchUserHandler();
        }
    }

    render() {
        if(this.props.loading || this.state.loading){
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
            <>
                <Container >
                    <Content>
                        <Card >
                            <CardItem>
                                <Body style={{alignItems: 'center', justifyContent: 'center', }}>
                                    <Thumbnail source={{uri: this.props.user.avatar}} style={styles.thumbnail}/>
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
                            <CardItem>
                                <Left>
                                    <Button danger iconLeft>
                                        <Icon name="car" type='MaterialCommunityIcons' />
                                        <Text>Cars</Text>
                                    </Button>
                                </Left>

                                <Right>
                                    <Button warning iconRight>
                                        <Text>Settings</Text>
                                        <Icon name="settings" />
                                    </Button>
                                </Right>
                            </CardItem>
                        </Card>
                    </Content>


                </Container>
            </>
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

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        loading: state.auth.loading
    }
};

export default connect(mapStateToProps)(MyProfile);
