import React, {Component} from "react";
import {connect} from 'react-redux';
import {FlatList, ActivityIndicator} from "react-native";
import { Container, Button, Thumbnail, Card, Icon, Body, Left, Right, Text, ListItem } from 'native-base';

// import {ListItem} from "react-native-elements";
import * as requestsActions from "../../store/actions/requestActions";


class MyRequests extends Component{

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('UPDATE');
    }

    handleDelete = (item) => {
        const token = this.props.token;
        this.props.unjoin(item.pk, token, item.ride.id);
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
            onPress={()=>this.props.navigation.navigate("Rides", {
                screen: 'Ride',
                params: {pk: item.ride.id}
            })}
            >
                <Left>
                    {icon}
                </Left>
                <Body>
                    <Text>From {item.ride.origin} to {item.ride.destination}</Text>
                    <Text note numberOfLines={1}>on {item.ride.date} for {item.seats} seat(s)</Text>
                </Body>
                <Right>
                    <Button danger
                    onPress={()=> this.handleDelete(item)}
                    >
                        {item.accepted ?
                            <Text>Unjoin</Text>
                            : <Text>Cancel</Text>
                        }
                    </Button>

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
                data={this.props.requests}
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
        requests: state.auth.requests,
        loading: state.auth.loading,
        token: state.auth.user ? state.auth.user.token : null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        unjoin: (pk, token, ridePK) => dispatch(requestsActions.unJoin(pk, token, ridePK)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyRequests);


