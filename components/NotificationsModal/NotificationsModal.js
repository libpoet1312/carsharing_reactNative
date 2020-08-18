import React, {Component} from "react";
import {FlatList, Modal, Text, TouchableOpacity} from "react-native";
import {Header, Icon, Left, Right, } from "native-base";
import {ListItem, } from "react-native-elements";
import moment from "moment";



class NotificationsModal extends Component {
    state ={
        notifications: []
    };


    componentDidMount() {
        if(this.props.notifications){
            this.getNotData(this.props.notifications);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps.notifications!==this.props.notifications){
            console.log('notifications Update');
            this.getNotData(this.props.notifications)
        }
    }

    getNotData = (notifications) => {
        // console.log(notifications);
        if (notifications.length === 0) {
            return [];
        }

        const newNotifications = notifications.map( notification => {
            let newItem = {...notification};

            if(newItem.verb==='accepted'){
                newItem.title = <Text>You have been accepted to </Text>;
                newItem.subtitle =
                    newItem.target ? <Text>{newItem.target.origin} to {newItem.target.destination}</Text> : <Text>Ride Deleted</Text>;
                newItem.avatar= <Icon style={{fontSize: 32, textAlign: "center", color: '#52c41a'}} type={"AntDesign"} name="checkcircle"/>;
            }else if(newItem.verb==='request'){
                newItem.title = <Text>{newItem.actor.username}</Text>;
                newItem.subtitle =
                    newItem.target ? <Text>requested to join in {newItem.target.origin} to {newItem.target.destination}</Text> : <Text>requested to join in "Ride Deleted"</Text>;

                newItem.avatar= <Icon style={{fontSize: 32, textAlign: "center", color: 'orange'}} type={"AntDesign"} name="infocirlce"/>;
            }
            else if(newItem.verb==='declineRequest'){
                newItem.title = <Text>You have been denied to join</Text>;
                newItem.subtitle =newItem.target ? <Text>{newItem.target.origin} to {newItem.target.destination}</Text> : <Text>"Ride Deleted"</Text>;
                newItem.avatar= <Icon style={{fontSize: 32, textAlign: "center", color: 'red'}} type={"AntDesign"} name="closecircle"/>;
            }
            else if(newItem.verb==='cancelRequest'){
                newItem.title = <Text>{newItem.actor.username}</Text>;
                newItem.subtitle =
                    newItem.target ? <Text>canceled his/her request in {newItem.target.origin} to {newItem.target.destination}</Text> : <Text>canceled his/her request in "Ride Deleted"</Text>;
                newItem.avatar= <Icon style={{fontSize: 32, textAlign: "center", color: 'red'}} type={"AntDesign"} name="closecircle"/>;
            }else{
                newItem.title = <Text>{newItem.actor.username}</Text>;
                newItem.subtitle =
                    newItem.target ? <Text>canceled his/her request in {newItem.target.origin} to {newItem.target.destination}</Text> : <Text>canceled his/her request in "Ride Deleted"</Text>;
                newItem.avatar= <Icon style={{fontSize: 32, textAlign: "center", color: 'red'}} type={"AntDesign"} name="closecircle"/>;
            }


            newItem.datetime = moment(newItem.timestamp).fromNow();
            newItem.sort = moment(newItem.timestamp);

            if (newItem.id) {
                newItem.key = newItem.id;
            }

            return newItem;
        });

        newNotifications.sort( (a,b) => {
            // return a.sort.diff(b.sort)<=0
            return new Date(b.datetime) - new Date(a.datetime);
        });

        this.setState({notifications: newNotifications})
    };


    renderItem = ({item}) => {
        return (
            <ListItem
                title={item.title}
                subtitle={item.subtitle}
                leftAvatar={item.avatar}
                bottomDivider
                chevron
                checkmark={!item.unread}
                containerStyle={item.unread ? {backgroundColor: '#ff5503'} : null}
                onPress={() => this.onPress(item)}
            />
        )
    };

    onPress = item => {
        console.log(item);
        this.props.setNotificationAsRead(item.id);
    };

    render() {

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.visible}
                onRequestClose={()=>this.props.toggleModal()}
            >
                <FlatList
                    data={this.state.notifications}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={this.renderItem}
                    scrollEnabled={true}
                    ListHeaderComponent={
                        <Header style={{flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '#fff', padding: 5}}>
                            <Left>
                                <TouchableOpacity style={{alignItems: 'center'}}  onPress={()=>this.props.toggleModal()}>
                                    <Icon name='close-circle-outline' style={{color: 'red'}} />
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                            </Left>
                            <Right>
                                <TouchableOpacity style={{alignItems: 'center'}}  onPress={()=>this.props.setAllasRead()}>
                                    <Icon name='ios-checkmark-circle-outline' style={{color: 'green'}} />
                                    <Text>Mark all as Read</Text>
                                </TouchableOpacity>
                            </Right>
                        </Header>
                    }
                    stickyHeaderIndices={[0]}
                />
            </Modal>
        )
    }
}

export default NotificationsModal;
