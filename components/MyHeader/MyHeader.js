import React, {Component} from "react";
import {Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

import {Tooltip} from "react-native-elements";
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import NotificationsModal from "../NotificationsModal/NotificationsModal";
import IconBadge from "react-native-icon-badge";
import * as authActions from "../../store/actions/authActions";
import * as notifActions from "../../store/actions/notificationsActions";


class MyHeader extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        isModalVisible: false,
        notifications: [],
        unreadNotificationsCount: 0
    };

    componentDidMount() {
        const newArray = this.props.notifications.filter( notif => {
            // console.log(notif);
            return notif.unread===true
        });
        this.setState({ unreadNotificationsCount: newArray.length});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // when user logs in update notifications!
        if(prevProps.notifications!==this.props.notifications){
            console.log('edw edw edw');
            const newArray = this.props.notifications.filter( notif => {
                // console.log(notif);
                return notif.unread===true
            });
            this.setState({ unreadNotificationsCount: newArray.length});
        }
    }

    toggle = () => {
        console.log('toogle');
        this.setState({isModalVisible: !this.state.isModalVisible})
    };

    logoutHandler = () => {
        console.log(this.props);
        this.props.navigation.navigate('Home');
        this.props.logout();
    };

    setNotificationAsRead = (id) => {
        console.log('asREAD: ',id);
        const token = this.props.token;
        this.props.setRead(id, token);
    };

    setAllasRead = () => {
        const token = this.props.token;
        this.props.setAllAsRead(token);
    };

    render() {
        if(!this.props.isAuthenticated || this.props.loading){
            return null
        }

        return (
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
                <NotificationsModal
                    visible={this.state.isModalVisible}
                    toggleModal={()=>this.toggle()}
                    // onDismiss={onDismiss}
                    notifications={this.props.notifications}
                    setAllasRead={()=> this.setAllasRead()}
                    setNotificationAsRead={(id)=> this.setNotificationAsRead(id)}
                />
                <View style={{marginRight: 20}}>
                    <TouchableOpacity
                        onPress={()=>this.toggle()}
                    >
                        <IconBadge
                            MainElement={
                                <Icon name='notifications'/>
                            }
                            BadgeElement={
                                <Text style={{color:'#FFFFFF'}}>{this.state.unreadNotificationsCount}</Text>
                            }
                            IconBadgeStyle={
                                {
                                    width:10,
                                    height:15,
                                    backgroundColor: '#ff001b',
                                    marginRight: -10
                                }
                            }
                            Hidden={!(this.state.unreadNotificationsCount>0)}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <Button transparent
                            onPress={()=>this.logoutHandler()}
                            style={{marginRight: 10}}
                    >
                        <Icon name='log-out'/>
                    </Button>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user !== null,
        user: state.auth.user,
        notifications: state.auth.notifications,
        loading: state.auth.loading,
        token: state.auth.user ? state.auth.user.token : null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authActions.logout()),
        onTryAutoSignup: () => dispatch(authActions.authCheckState()),
        setAllAsRead: (token) => dispatch(notifActions.setAllNotificationsRead(token)),
        setRead: (id, token) => dispatch(notifActions.setNotificationRead(id, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyHeader);
