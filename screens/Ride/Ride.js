import React, { Component } from 'react';
import {Dimensions, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Card, CardItem, Body, Left, Header, Button, Icon, Title, Text} from 'native-base';
import MapView from 'react-native-maps';

import {connect} from "react-redux";
import * as rideActions from '../../store/actions/rideActions';

import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_KEY} from "../../config";

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
        duration: ''
    };


    componentDidMount() {
        this.props.fetchRide(this.props.route.params.pk);
    }

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

    render() {
        if(this.props.loading || !this.props.ride ){
            return <ActivityIndicator size={'large'}/>
        }

        const ride = this.props.ride;
        return (
            <View style={styles.container}>
                <Card style={{width: Dimensions.get('window').width,}}>
                    <Header noShadow style={{backgroundColor: 'white'}}>
                        <Left>
                            <Button transparent
                                onPress={()=>this.props.navigation.goBack()}
                            >
                                <Icon name='arrow-back' style={{color: 'black'}} />
                            </Button>
                        </Left>
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
                            <Button large info>
                                <Text>Join</Text>
                            </Button>
                        </CardItem>
                    </Card> : null
                }

                <Card>
                    <CardItem>
                        <MapView
                            initialRegion={{
                                latitude: LATITUDE,
                                longitude: LONGITUDE,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            }}
                            style={styles.mapStyle}
                            ref={c => this.mapView = c} // eslint-disable-line react/jsx-no-bind
                            onPress={this.onMapPress}
                        >
                            <MapViewDirections
                                origin={this.props.ride.origin}
                                destination={this.props.ride.destination}
                                waypoints={[this.props.origin, this.props.destination].slice(1,-1)}
                                mode='DRIVING'
                                region='GR'
                                apikey={GOOGLE_MAPS_APIKEY}
                                language='en'
                                strokeWidth={4}
                                strokeColor="black"
                                onStart={(params) => {
                                    console.log(`Started routing between "${params.origin}" and "${params.destination}"${(params.waypoints.length ? " using waypoints: " + params.waypoints.join(', ') : "")}`);
                                }}
                                onReady={this.onReady}
                                onError={(errorMessage) => {
                                    console.log(errorMessage);
                                }}
                                resetOnChange={false}
                            />
                        </MapView>
                    </CardItem>

                </Card>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ride: state.ride.ride,
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
        // joinRequest: (pk, token, seats, message) => dispatch(requestsActions.joinRequest(pk, token, seats, message)),
        // unJoin: (pk, token, ridePK) => dispatch(requestsActions.unJoin(pk, token, ridePK)),
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
