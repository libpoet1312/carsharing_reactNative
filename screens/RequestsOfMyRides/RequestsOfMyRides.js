import React, {Component} from "react";
import {connect} from 'react-redux';

import {ActivityIndicator, FlatList, TouchableOpacity} from "react-native";
import {Body, Button, Icon, Left, Right, Text, ListItem, H3} from "native-base";
import {Divider, Tooltip} from "react-native-elements";

import * as requestsActions from "../../store/actions/requestActions";



class RequestsOfMyRides extends Component{

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('UPDATE');
    }

    handleAccept = (item) => {
        const token = this.props.token;
        this.props.acceptJoin(item.pk, item.ride.id, token, item.fromuser.pk)
    };

    handleDecline = (item) => {
        const token = this.props.token;
        this.props.declineJoin(item.pk, item.ride.id, token, item.fromuser.pk)
    };

    renderItem = ({item}) => {

        let icon;
        if(item.accepted){
            icon = <Icon style={{ textAlign: "center", color: '#52c41a'}} type={"AntDesign"} name="checkcircle"/>;
        }else{
            icon = <Icon style={{ textAlign: "center", color: 'orange'}} type={"AntDesign"} name="infocirlce"/>;
        }

        return (
            <ListItem thumbnail

            >
                <Left>
                    {icon}
                </Left>
                <Body>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate("Rides", {
                            screen: 'Ride',
                            params: {pk: item.ride.id}
                        })}
                    >
                        <H3>From {item.ride.origin} to {item.ride.destination}</H3>
                    </TouchableOpacity>

                    <Text note numberOfLines={1}>on {item.ride.date} for {item.seats} seat(s)</Text>
                    <Text>from {item.fromuser.username}</Text>
                </Body>
                <Right style={{alignItems: 'center'}}>
                    {item.accepted ?
                        <Button danger
                                onPress={() => this.handleDecline(item)}
                        >
                            <Text >Delete</Text>
                        </Button>

                    :
                        <>
                            <Button success
                                    onPress={()=> this.handleAccept(item)}
                            >
                                <Text>Accept</Text>
                            </Button>
                            <Divider style={{height: 20}}/>
                            <Button danger
                                    onPress={()=> this.handleDecline(item)}
                            >
                                <Text>Decline</Text>
                            </Button>
                        </>
                    }


                </Right>
            </ListItem>
        )
    };

    render() {
        if(this.props.loading){
            return <ActivityIndicator size={'large'}/>
        }
        return (
            <FlatList
                data={this.props.requestsOfMyRides}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.pk.toString()}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user !== null,
        user: state.auth.user,
        requestsOfMyRides: state.auth.requestsOfMyRides,
        loading: state.auth.loading,
        token: state.auth.user ? state.auth.user.token : null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        declineJoin: (pk, ridePK, token, userID) => dispatch(requestsActions.declineJoin(pk, ridePK, token, userID)),
        acceptJoin: (pk, ridePK, token, userID) => dispatch(requestsActions.acceptJoin(pk, ridePK, token, userID)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestsOfMyRides);


