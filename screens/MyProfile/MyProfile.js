import React, {Component} from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ListItem } from 'native-base';
import {FlatList, ActivityIndicator, StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import { Divider, Badge } from 'react-native-elements';
import axios from 'axios';
import {API_HTTP} from "../../config";
import {connect} from 'react-redux';

class MyProfile extends Component {
    state = {
        user: null,
        loading: true,
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
            // console.log(this.props.notifications);
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
                <Container>
                    <Content>
                        <Card>
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
                                    <Button danger iconLeft
                                    onPress={()=>this.props.navigation.navigate('Cars')}
                                    >
                                        <Icon name="car" type='MaterialCommunityIcons' />
                                        <Text>Cars</Text>
                                    </Button>
                                </Left>

                                <Right>
                                    <Button warning iconRight
                                            onPress={()=>this.props.navigation.navigate('Settings')}
                                    >
                                        <Text>Settings</Text>
                                        <Icon name="settings" />
                                    </Button>
                                </Right>
                            </CardItem>
                        </Card>


                        <Divider style={{marginTop: 15 ,backgroundColor: 'black', height: 3}} />

                        <Card style={{marginTop: 15}}>
                            <CardItem>
                                <Left>
                                    <Text style={{fontWeight: 'bold'}}>My Rides</Text>
                                </Left>



                                <Right style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Button primary icon
                                            onPress={()=>this.props.navigation.navigate('AddRide')}
                                    >
                                        <Icon name="ios-add-circle" />
                                    </Button>

                                    <Button info icon
                                            onPress={()=>this.props.navigation.navigate('MyRides')}
                                    >
                                        <Icon name="ios-arrow-forward" />
                                    </Button>
                                </Right>
                            </CardItem>
                        </Card>

                        <Card>
                            <CardItem>
                                <Left>
                                    <Text style={{fontWeight: 'bold'}}>Requests of my Rides</Text>
                                    <Badge
                                        status="warning"
                                        value={this.props.requestsOfMyRides.length}
                                        containerStyle={{marginLeft: 5}}
                                    />
                                </Left>

                                <Right>
                                    <Button dark icon
                                            onPress={()=>this.props.navigation.navigate('RequestsOfMyRides')}
                                    >
                                        <Icon name="ios-arrow-forward" />
                                    </Button>
                                </Right>
                            </CardItem>
                        </Card>


                        <Card>
                            <CardItem>
                                <Left>
                                    <Text style={{fontWeight: 'bold'}}>My requests</Text>
                                    <Badge
                                        status="success"
                                        value={this.props.requests.length}
                                        containerStyle={{marginLeft: 5}}
                                    />
                                </Left>

                                <Right>
                                    <Button primary icon
                                            onPress={()=>this.props.navigation.navigate('MyRequests')}
                                    >
                                        <Icon name="ios-arrow-forward" />
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
        width: 100,
        height: 100,
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
        loading: state.auth.loading,
        notifications: state.auth.notifications,
        requests: state.auth.requests,
        requestsOfMyRides: state.auth.requestsOfMyRides,
    }
};

export default connect(mapStateToProps)(MyProfile);
