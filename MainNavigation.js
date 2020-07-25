import React from 'react';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, useIsDrawerOpen } from "@react-navigation/drawer";

import {connect} from 'react-redux';
import * as authActions from './store/actions/authActions';

import Home from "./screens/Home/Home";
import Rides from "./screens/Rides/Rides";

import Ride from "./screens/Ride/Ride";
import FAQ from "./screens/FAQ/FAQ";
import { Ionicons } from '@expo/vector-icons';


import Login from "./components/LoginForm/Login";
import Signup from "./components/Signup/SignUp";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const RideStackNav = createStackNavigator();
const AuthStackNav = createStackNavigator();


const RideStack = () => {
    return (
        <RideStackNav.Navigator initialRouteName="Rides">
            <RideStackNav.Screen name="Rides" component={Rides} />
            <RideStackNav.Screen name="Ride" component={Ride}/>
        </RideStackNav.Navigator>
    )
};


const AuthStack = () => (
    <AuthStackNav.Navigator initialRouteName={'Login'}>
        <AuthStackNav.Screen name="SignIn" component={Login} />
        <AuthStackNav.Screen name="SignUp" component={Signup} />
        {/*<AuthStackNav.Screen name="ResetPassword" component={ResetPassword} />*/}
    </AuthStackNav.Navigator>
);

const MainNavigation = (props) => {
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
                            if(props.isAuthenticated){
                                iconName="ios-person"
                            }else{
                                iconName="ios-log-in"
                            }

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
                <Tab.Screen name="Rides" component={RideStack}/>
                <Tab.Screen name="FAQ" component={FAQ}/>
                <Tab.Screen name="Login" component={AuthStack}/>
            </Tab.Navigator>

        </NavigationContainer>
    )

};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user !== null,
        user: state.auth.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authActions.logout()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(MainNavigation);
