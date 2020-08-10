import React, { Component } from 'react';
import {Dimensions, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Card, CardItem, Body, Left, Header, Button, Icon, Title, Text} from 'native-base';
import MapView from 'react-native-maps';

import {connect} from "react-redux";
import * as rideActions from '../../store/actions/rideActions';
import * as requestsActions from '../../store/actions/requestActions';

import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_KEY} from "../../config";
import JoinModal from "../../components/JoinModal/JoinModal";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 38.659778;
const LONGITUDE = 22.641075;
const LATITUDE_DELTA = 2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = GOOGLE_MAPS_KEY;


class Ride extends Component {

    constructor(props) {
        super(props);
        this.mapView = null;
    }

    state={
        distance: 0,
        duration: '',
        isModalVisible: false,
        isOwner: false,
        hasJoined: false,
        isAccepted: false
    };


    componentDidMount() {
        this.props.fetchRide(this.props.route.params.pk);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('[componentDidUpdate]');

        // console.log(this.props.isAuthenticated);
        if((prevProps.loading && !this.props.loading) || this.props.requests!==prevProps.requests){
            // console.log('edw');
            console.log(this.props.isAuthenticated);
            if(this.props.isAuthenticated){
                if(this.props.ride.uploader.username===this.props.user.username){
                    this.setState({isOwner: true});
                }
                // console.log(this.props.requests);


                // handle if user has already applied!
                const obj = this.props.requests.find( req => {
                    // console.log(req, this.props.ride.pk);
                    return req.ride.id === this.props.ride.pk
                });
                console.log(obj);
                if(obj){
                    if(obj.accepted){
                        this.setState({isAccepted: true})
                    }else{
                        this.setState(
                            {hasJoined: true}
                        )
                    }
                }else{
                    this.setState({hasJoined: false, isAccepted: false})
                }
            }
        }
    }

    toggleModal = () => {
        this.setState({
            isModalVisible: true
        })
    };

    onDismiss = () => {
        this.setState({
            isModalVisible: false
        })
    };

    onMapPress = (e) => {
        this.setState({
            coordinates: [
                ...this.state.coordinates,
                e.nativeEvent.coordinate,
            ],
        });
    };

    convertMinsToHrsMins =(mins) => {
        const hours = Math.trunc(mins / 60);
        const minutes = mins % 60;
        console.log(hours +":"+ minutes);
        return (hours +":"+ parseInt(minutes))
    };

    onReady = (result) => {
        console.log(`Distance: ${result.distance} km`);
        console.log(`Duration: ${result.duration/60} hours.`);

        this.setDistance(result.distance, this.convertMinsToHrsMins(result.duration));


        this.mapView.fitToCoordinates(result.coordinates, {
            edgePadding: {
                right: (width / 10),
                bottom: (height / 10),
                left: (width / 10),
                top: (height / 10),
            },
        });

    };

    onError = (errorMessage) => {
        console.log(errorMessage); // eslint-disable-line no-console
    };

    setDistance(distance, duration) {
        // console.log('setDistance');
        this.setState({
            distance: parseFloat(distance),
            duration: (duration)
        });
    }

    joinHandler = (seats, msg) => {
        this.onDismiss();
        const token = this.props.token;

        // console.log(this.props.ride.pk, user.token ,seats, msg);

        //send join request to server!


        this.props.joinRequest(this.props.ride.pk, token ,seats, msg);
        this.setState(
            {hasJoined: true}
        );
    };

    unJoinHandler = (ride) => {
        console.log('unJoinHandler');
        const token = this.props.token;
        const req = this.props.requests.find( el => {
            // console.log(el);
            return el.ride.id===ride.pk;
        });
        // console.log(req.pk);
        this.props.unJoin(req.pk, token, ride.pk);
        this.setState(
            {hasJoined: false, isAccepted: false}
        );

    };

    render() {
        if(this.props.loading || !this.props.ride ){
            return <ActivityIndicator size={'large'}/>
        }



        const ride = this.props.ride;


        let button = <Button large info
                        onPress={()=>this.toggleModal()}>
                    <Text>Join</Text>
                </Button>;

        if(this.state.isOwner) {
            button = <Button large warning
                             onPress={()=>alert('edit')}>
                <Text>Edit</Text>
            </Button>;
        }
        if(this.state.hasJoined) {

            console.log('joined');
            button = (
                <Button large danger
                        onPress={()=>this.unJoinHandler(ride)}>
                    <Text>Cancel Request</Text>
                </Button>
            )
        }
        if(this.state.isAccepted){
            console.log('accepted');
            button = (
                <Button large danger
                        onPress={()=>this.unJoinHandler(ride)}>
                    <Text>Unjoin</Text>
                </Button>
            )
        }


        return (
            <View style={styles.container}>
                <Card style={{width: Dimensions.get('window').width,}}>
                    <Header noShadow style={{backgroundColor: 'white'}}>
                        <Left/>
                        <Body>
                            <Title style={{color: 'black'}}>{ride.origin} to {ride.destination}</Title>
                        </Body>
                    </Header>

                    <CardItem style={{justifyContent: 'space-evenly', }}>
                        <Text note>Date: <Text>{ride.date}</Text></Text>
                        <Text note>Time: <Text>{ride.time}</Text></Text>
                    </CardItem>
                    <CardItem style={{justifyContent: 'space-evenly', }}>
                        <Text note>Vacant Seats: <Text>{ride.vacant_seats}</Text></Text>
                        {this.props.isAuthenticated ?
                            <Button transparent
                                    onPress={()=>alert(ride.uploader.username)}
                            >
                                <Text note>Driver: <Text>{ride.uploader.username}</Text></Text>
                            </Button>
                            :<Text note>Driver: <Text>{ride.uploader.username}</Text></Text>
                        }


                    </CardItem>
                    <CardItem style={{justifyContent: 'space-evenly', }}>
                        <Text note>Estimated Time: <Text>{this.state.duration}</Text></Text>
                        <Text note>Driving Distance: <Text>{this.state.distance}</Text></Text>
                    </CardItem>

                </Card>
                {this.props.isAuthenticated?
                    <Card transparent>
                        <CardItem transparent>
                            {button}
                        </CardItem>
                    </Card> : null
                }

                {/*<Card>*/}
                {/*    <CardItem>*/}
                {/*        <MapView*/}
                {/*            initialRegion={{*/}
                {/*                latitude: LATITUDE,*/}
                {/*                longitude: LONGITUDE,*/}
                {/*                latitudeDelta: LATITUDE_DELTA,*/}
                {/*                longitudeDelta: LONGITUDE_DELTA,*/}
                {/*            }}*/}
                {/*            style={styles.mapStyle}*/}
                {/*            ref={c => this.mapView = c} // eslint-disable-line react/jsx-no-bind*/}
                {/*            onPress={this.onMapPress}*/}
                {/*        >*/}
                {/*            <MapViewDirections*/}
                {/*                origin={this.props.ride.origin}*/}
                {/*                destination={this.props.ride.destination}*/}
                {/*                waypoints={[this.props.origin, this.props.destination].slice(1,-1)}*/}
                {/*                mode='DRIVING'*/}
                {/*                region='GR'*/}
                {/*                apikey={GOOGLE_MAPS_APIKEY}*/}
                {/*                language='en'*/}
                {/*                strokeWidth={4}*/}
                {/*                strokeColor="black"*/}
                {/*                onStart={(params) => {*/}
                {/*                    console.log(`Started routing between "${params.origin}" and "${params.destination}"${(params.waypoints.length ? " using waypoints: " + params.waypoints.join(', ') : "")}`);*/}
                {/*                }}*/}
                {/*                onReady={this.onReady}*/}
                {/*                onError={(errorMessage) => {*/}
                {/*                    console.log(errorMessage);*/}
                {/*                }}*/}
                {/*                resetOnChange={false}*/}
                {/*            />*/}
                {/*        </MapView>*/}
                {/*    </CardItem>*/}

                {/*</Card>*/}
                <JoinModal
                    visible={this.state.isModalVisible}
                    toggleModal={()=>this.toggleModal}
                    onDismiss={this.onDismiss}
                    vacant={ride.vacant_seats}
                    joinHandler={(seats, msg) => this.joinHandler(seats, msg)}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ride: state.ride.ride,
        token: state.auth.user ? state.auth.user.token:null,
        // coordinates: [state.ride.ride.origin, state.ride.ride.destination],
        error: state.ride.error,
        loading: state.ride.loading,
        user: state.auth.user,
        isAuthenticated: state.auth.user !== null,
        isOwner: state.auth.user,
        requests: state.auth.requests
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRide: (pk) => dispatch(rideActions.fetchSingleRide(pk)),
        joinRequest: (pk, token, seats, message) => dispatch(requestsActions.joinRequest(pk, token, seats, message)),
        unJoin: (pk, token, ridePK) => dispatch(requestsActions.unJoin(pk, token, ridePK)),
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        top:-5
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: 400,
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Ride);
