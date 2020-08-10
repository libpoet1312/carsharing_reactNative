import React, { Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {Text, View, TouchableOpacity} from 'react-native';
import {Button, Icon} from "native-base";

import IconBadge from 'react-native-icon-badge';

import {connect} from 'react-redux';
import * as authActions from './store/actions/authActions';

import Home from "./screens/Home/Home";
import Rides from "./screens/Rides/Rides";

import Ride from "./screens/Ride/Ride";
import FAQ from "./screens/FAQ/FAQ";
import { Ionicons } from '@expo/vector-icons';


import Signup from "./components/Signup/SignUp";
import Login from "./screens/Login/Login";
import MyProfile from "./screens/MyProfile/MyProfile";
import Settings from "./screens/Settings/Settings";
import Cars from "./screens/Cars/Cars";
import AddCar from "./components/AddCar/AddCar";

const Tab = createBottomTabNavigator();
const RideStackNav = createStackNavigator();
const AuthStackNav = createStackNavigator();


const RideStack = (props) => {
    return (
        <RideStackNav.Navigator
            initialRouteName="Rides"
            screenOptions={props.route.params.isAuthenticated ? {
                headerRight: () => (
                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
                        <View style={{marginRight: 20}}>
                            <TouchableOpacity
                                onPress={()=>alert('eee')}
                            >
                                <IconBadge
                                    MainElement={
                                        <Icon name='notifications'/>
                                    }
                                    BadgeElement={
                                        <Text style={{color:'#FFFFFF'}}>
                                            {props.route.params.unreadNotificationsCount}
                                        </Text>
                                    }
                                    IconBadgeStyle={
                                        {
                                            width:10,
                                            height:15,
                                            backgroundColor: '#ff001b',
                                            marginRight: -10
                                        }
                                    }
                                    Hidden={!(props.route.params.unreadNotificationsCount>0)}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Button transparent
                                    onPress={()=>logoutHandler(props)}
                                    style={{marginRight: 10}}
                            >
                                <Icon name='log-out'/>
                            </Button>
                        </View>
                    </View>
                ),
            }:null}
        >
            <RideStackNav.Screen name="Rides" component={Rides} options={{
            }}/>
            <RideStackNav.Screen name="Ride" component={Ride} options={{
                headerTitle: '',
            }}/>
        </RideStackNav.Navigator>
    )
};

const logoutHandler = (props) => {
    props.route.params.logout();
    props.navigation.navigate('Home');
};


const AuthStack = (props) => {
    return (
        <AuthStackNav.Navigator
            screenOptions={props.route.params.isAuthenticated ?
                {
                    headerRight: () => (
                        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',}}>
                            <View style={{marginRight: 20}}>
                                <TouchableOpacity
                                    onPress={()=>alert('eee')}
                                >
                                    <IconBadge
                                        MainElement={
                                            <Icon name='notifications'/>
                                        }
                                        BadgeElement={
                                            <Text style={{color:'#FFFFFF'}}>2</Text>
                                        }
                                        IconBadgeStyle={
                                            {
                                                width:10,
                                                height:15,
                                                backgroundColor: '#ff001b',
                                                marginRight: -10
                                            }
                                        }
                                        Hidden={!(props.route.params.unreadNotificationsCount>0)}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Button transparent
                                        onPress={()=>logoutHandler(props)}
                                        style={{marginRight: 10}}
                                >
                                    <Icon name='log-out'/>
                                </Button>
                            </View>
                        </View>
                    ),
                }:null

            }
        >
            {props.route.params.isAuthenticated ?
                <>
                    <AuthStackNav.Screen name="Profile" component={MyProfile}/>
                    <AuthStackNav.Screen name="Settings" component={Settings} />
                    <AuthStackNav.Screen name="Cars" component={Cars} />
                    <AuthStackNav.Screen name="AddCar" component={AddCar} options={{
                        headerTitle: 'Add Car'
                    }}/>
                </>
                :
                <>
                    <AuthStackNav.Screen name="SignIn" component={Login}
                                         options={{
                                             title: 'Sign in',
                                             // When logging out, a pop animation feels intuitive
                                             // You can remove this if you want the default 'push' animation
                                             animationTypeForReplace: !props.route.params.isAuthenticated ? 'pop' : 'push',
                                         }}/>
                    <AuthStackNav.Screen name="SignUp" component={Signup} />

                    {/*<AuthStackNav.Screen name="ResetPassword" component={ResetPassword} />*/}
                </>
            }

        </AuthStackNav.Navigator>
    );
};

class MainNavigation extends  Component{
    constructor(props) {
        super(props);
    }

    state={
        notifications: [],
        unreadNotificationsCount: 0
    };

    componentDidMount() {
        this.props.onTryAutoSignup(); // auto-signin
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevState.width!==this.state.width){
            this.updateWindowDimensions();
        }
        // when user logs in update notifications!
        if(prevProps.notifications!==this.props.notifications){
            const newArray = this.props.notifications.filter( notif => {
                // console.log(notif);
                return notif.unread===true
            });
            this.setState({ unreadNotificationsCount: newArray.length})
        }
    }

    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'FAQ') {
                                iconName = focused
                                    ? 'ios-information-circle'
                                    : 'ios-information-circle-outline';
                            } else if (route.name === 'Rides') {
                                iconName = focused ? 'ios-list-box' : 'ios-list';
                            }else if (route.name === 'Home'){
                                iconName = focused ? 'ios-home' : 'md-home';
                            }else if (route.name === 'Login'){
                                if(this.props.isAuthenticated){
                                    iconName="ios-person"
                                }else{
                                    iconName="ios-log-in"
                                }
                            }else if(route.name === 'Profile'){
                                iconName="ios-person"
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="Home" component={Home}/>
                    <Tab.Screen name="Rides" component={RideStack}
                                initialParams={{isAuthenticated: this.props.isAuthenticated, unreadNotificationsCount:this.state.unreadNotificationsCount, notifications: this.props.notifications, logout: ()=>this.props.logout()}}/>
                    <Tab.Screen name="FAQ" component={FAQ}/>
                    <Tab.Screen name={!this.props.isAuthenticated ? "Login" : "Profile"} component={AuthStack}
                                initialParams={{isAuthenticated: this.props.isAuthenticated, unreadNotificationsCount:this.state.unreadNotificationsCount, notifications: this.props.notifications, logout: ()=>this.props.logout()}}/>
                </Tab.Navigator>

            </NavigationContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user !== null,
        user: state.auth.user,
        notifications: state.auth.notifications
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authActions.logout()),
        onTryAutoSignup: () => dispatch(authActions.authCheckState())
    }
};

connect(mapStateToProps, mapDispatchToProps)(AuthStack);
export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);
