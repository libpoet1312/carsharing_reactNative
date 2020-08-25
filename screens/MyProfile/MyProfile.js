import React, {Component, useRef} from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, ListItem } from 'native-base';
import {FlatList, ActivityIndicator, StyleSheet, View, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import { Divider, Badge } from 'react-native-elements';
import RBSheet from "react-native-raw-bottom-sheet";


import axios from 'axios';
import {API_HTTP} from "../../config";
import {connect} from 'react-redux';
import UpdateProfileModal from "../../components/UpdateProfileModal/UpdateProfileModal";




class MyProfile extends Component {
    state = {
        user: null,
        loading: true,
        isModalVisible: false,
        modal: 'username'
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
                console.log('rest auth', res.data);
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps!==this.props){
            console.log('[componentDidUpdate]');
            this.fetchUserHandler();
        }
    }


    openModal = (modal) => {
        console.log('openModal');
        this.setState({isModalVisible: true, modal: modal})
    };

    closeModal = (modal) => {
        this.setState({isModalVisible: false, modal: 'username'})
    };

    onOpen = e => {
        console.log(e);
        this.setState({modal: e})
    };

    onUpdate = (newValue, to) => {
        console.log(newValue, to);
        let user = {};
        user[to]=newValue;
        console.log(user);
        console.log(this.props.user.token);

        let config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'JWT ' + this.props.user.token,
            }
        };

        axios.patch(API_HTTP+'rest-auth/user/',user, config).then(res => {
            console.log('updated');
            console.log(res.data);
            this.setState({user: res.data});
            this.RBSheet.close();

        }).catch(error=> {
            console.log('error');
            console.log(error);
            this.RBSheet.close();
        })
    };

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
            <ScrollView style={this.state.isModalVisible ? {backgroundColor: 'rgba(0, 0, 0, 0.5)'} : ''} >
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={150}
                    openDuration={100}
                    closeDuration={50}
                    animationType={'fade'}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            // alignItems: "center",
                            backgroundColor: '#003f5c',
                        }
                    }}
                    closeOnDragDown={true}
                    onOpen = {e => this.onOpen(e)}
                    mode = {this.state.modal}
                >
                    <UpdateProfileModal updateValue={(value, mode)=> this.onUpdate(value, mode)}
                                        user={this.state.user}
                                        mode = {this.state.modal}
                                        isModalVisible={this.state.isModalVisible}
                                        closeModal={()=> this.RBSheet.close()}
                    />
                </RBSheet>


                <Container>

                    <Content >
                        <Card>
                            <CardItem>
                                <Body style={{alignItems: 'center', justifyContent: 'center', }}>
                                    <Thumbnail source={{uri: this.props.user.avatar}} style={styles.thumbnail}/>
                                    <View style={{marginTop: 15, alignItems: 'center', justifyContent: 'center', }}>
                                        <TouchableOpacity onPress={() => this.RBSheet.open('username')} ><Text style={styles.username} >{this.state.user.username}</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.RBSheet.open('email')} ><Text style={styles.email}>{this.state.user.email}</Text></TouchableOpacity>
                                    </View>
                                </Body>
                            </CardItem>
                            <CardItem style={{justifyContent: 'center', }}>
                                <Left style={{flexDirection: 'column', alignItems: 'center'}}>
                                    <Text style={styles.title}>Date of Birth:</Text>
                                    <Text style={styles.info}>{this.state.user.dob}</Text>

                                </Left>
                                <Body style={{flexDirection: 'column', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => this.RBSheet.open('phone_number')} ><Text style={styles.title}>Phone:</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.RBSheet.open('phone_number')} ><Text style={styles.info}>{this.state.user.phone_number}</Text></TouchableOpacity>
                                </Body>
                                <Right style={{flexDirection: 'column', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => this.RBSheet.open('gender')} ><Text style={styles.title}>Gender:</Text></TouchableOpacity>
                                        <TouchableOpacity onPress={() => this.RBSheet.open('gender')} ><Text style={styles.info}>{gender}</Text></TouchableOpacity>
                                </Right>
                            </CardItem>
                            <CardItem style={{justifyContent: 'center',}}>
                                <Left style={{flexDirection: 'column', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => this.RBSheet.open('country')} ><Text style={styles.title}>Country:</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.RBSheet.open('country')} ><Text style={styles.info}>{this.state.user.country}</Text></TouchableOpacity>
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
            </ScrollView>
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
