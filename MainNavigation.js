import React, { Component, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


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
import MyHeader from "./components/MyHeader/MyHeader";
import MyRequests from "./screens/MyRequests/MyRequests";
import RequestsOfMyRides from "./screens/RequestsOfMyRides/RequestsOfMyRides";
import MyRides from "./screens/MyRides/MyRides";
import AddRide from "./screens/AddRide/AddRide";

const Tab = createBottomTabNavigator();
const RideStackNav = createStackNavigator();
const AuthStackNav = createStackNavigator();


const RideStack = (props) => {
    return (
        <RideStackNav.Navigator
            initialRouteName="Rides"
            screenOptions={
                {headerRight: () => (<MyHeader />)}
            }
        >
            <RideStackNav.Screen name="Rides" component={Rides} options={{
            }}/>
            <RideStackNav.Screen name="Ride" component={Ride} options={{
                headerTitle: '',

            }}/>
        </RideStackNav.Navigator>
    )
};


const AuthStack = (props) => {

    return (
        <AuthStackNav.Navigator
            screenOptions={
                {headerRight: () => (<MyHeader navigation={props.navigation}/>)}
            }
        >
            {props.route.params.isAuthenticated ?
                <>
                    <AuthStackNav.Screen name="Profile" component={MyProfile}/>
                    <AuthStackNav.Screen name="Settings" component={Settings} />
                    <AuthStackNav.Screen name="MyRides" component={MyRides}
                                         options={{headerTitle: 'My Rides'}}
                    />
                    <AuthStackNav.Screen name="AddRide" component={AddRide}
                                         options={{headerTitle: 'Add a ride'}}
                    />
                    <AuthStackNav.Screen name="MyRequests" component={MyRequests}
                        options={{headerTitle: 'My Requests'}}
                    />
                    <AuthStackNav.Screen name="RequestsOfMyRides" component={RequestsOfMyRides}
                                         options={{headerTitle: 'Requests of my rides'}}
                    />
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
                    />
                    <Tab.Screen name="FAQ" component={FAQ}/>
                    <Tab.Screen name={!this.props.isAuthenticated ? "Login" : "Profile"} component={AuthStack}
                                initialParams={{isAuthenticated: this.props.isAuthenticated}}
                                options={this.state.unreadNotificationsCount ?
                                    { tabBarBadge: this.state.unreadNotificationsCount }
                                : { tabBarBadge: null }
                                }
                    />
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

// connect(mapStateToProps, mapDispatchToProps)(AuthStack);
export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);
