import React, {Component} from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Image, ActivityIndicator } from 'react-native';

import axios from 'axios';
import {API_HTTP} from "../../config";
import {connect} from 'react-redux';

class MyProfile extends Component {
    // alert('profile');
    state = {
        user: null,
        loading: true
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

        return (
            <Container>
                <Header/>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: this.props.user.avatar}} />
                                <Body>
                                    <Text>{this.state.user.username}</Text>
                                    <Text note>{this.state.user.email}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem cardBody>
                            <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>12 Likes</Text>
                                </Button>
                            </Left>
                            <Body>
                                <Button transparent>
                                    <Icon active name="chatbubbles" />
                                    <Text>4 Comments</Text>
                                </Button>
                            </Body>
                            <Right>
                                <Text>11h ago</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }


};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        loading: state.auth.loading
    }
};

export default connect(mapStateToProps)(MyProfile);
