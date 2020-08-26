import React, {Component,} from 'react';
import {Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Toast} from 'native-base';
import {ActivityIndicator, StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import { Divider, Badge } from 'react-native-elements';
import RBSheet from "react-native-raw-bottom-sheet";

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';



import axios from 'axios';
import {API_HTTP} from "../../config";
import {connect} from 'react-redux';
import * as authActions from '../../store/actions/authActions';
import UpdateProfileModal from "../../components/UpdateProfileModal/UpdateProfileModal";




class MyProfile extends Component {
    state = {
        user: null,
        loading: true,
        isModalVisible: false,
        modal: 'username',
        newAvatar: null,
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

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                // this.setState({ newAvatar: result.uri });
                console.log(result);
                let localUri = result.uri;
                let filename = localUri.split('/').pop();

                // Infer the type of the image
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;
                console.log(localUri, filename, type);

                const data = new FormData();
                data.append('avatar', {type:type, uri:localUri, name:filename});
                const config= {
                    "headers": {
                        "Content-Type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s',
                        "Authorization": 'JWT ' + this.props.user.token,
                    }
                };

                axios.patch(API_HTTP+'rest-auth/user/', data, config).then(res=>{
                    // console.log(res.data);
                    this.props.updateProfile(res.data);
                    this.setState({ newAvatar: result.uri });
                }).catch(error=> {
                    console.log(error);
                });

            }

            // console.log(result);
        } catch (E) {
            console.log(E);
        }
    };



    componentDidMount() {

        // fetch the requested user only if current user is authenticated!
        if(this.props.user){
            console.log('[componentDidMount]');
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
            Toast.show({text: `${to} Updated Successfully`, type: "success", position: "top"})

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

        let gender;
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
                                    <TouchableOpacity onPress={this._pickImage} ><Thumbnail source={{uri: this.state.user.avatar}} style={styles.thumbnail}/></TouchableOpacity>
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
                                            onPress={()=>this.props.navigation.navigate('Settings',{token: this.props.user.token})}
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

const mapDispatchToProps = dispatch => {
    return {
        updateProfile : (user) => dispatch(authActions.updateProfile(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
