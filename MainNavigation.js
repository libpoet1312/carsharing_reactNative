import React, { Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from "@react-navigation/drawer";

import {Text, View, TouchableOpacity} from 'react-native';
import {Button, Icon, Badge} from "native-base";

import IconBadge from 'react-native-icon-badge';

import {connect} from 'react-redux';
import * as authActions from './store/actions/authActions';

import Home from "./screens/Home/Home";
import Rides from "./screens/Rides/Rides";

import Ride from "./screens/Ride/Ride";
import FAQ from "./screens/FAQ/FAQ";
import { Ionicons } from '@expo/vector-icons';


import Login from "./components/LoginForm/Login";
import Signup from "./components/Signup/SignUp";
import MyProfile from "./screens/MyProfile/MyProfile";
import Settings from "./screens/Settings/Settings";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const RideStackNav = createStackNavigator();
const AuthStackNav = createStackNavigator();


const RideStack = () => {
    return (
        <RideStackNav.Navigator initialRouteName="Rides">
            <RideStackNav.Screen name="Rides" component={Rides} options={{
                headerShown: false,
            }}/>
            <RideStackNav.Screen name="Ride" component={Ride} options={{
                headerShown: false,
            }}/>
        </RideStackNav.Navigator>
    )
};

const SideBar = () => {
    return <Drawer.Navigator
        drawerPosition="right"
    >
        <Drawer.Screen name={'Profile'} component={MyProfile} options={{
            title: 'My Profile',
        }}/>
        <Drawer.Screen name={'Settings'} component={Settings} options={{
            title: 'My Settings',
        }}/>
    </Drawer.Navigator>
};


const AuthStack = (props) => {
    return (
        <AuthStackNav.Navigator>
            {props.route.params.isAuthenticated ?
                <>
                    <AuthStackNav.Screen name="Profile" component={SideBar}
                        options={{
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

                                                Hidden={false}
                                            />
                                        </TouchableOpacity>

                                    </View>
                                    <View>
                                        <Button transparent
                                                onPress={()=>props.route.params.logout()}
                                                style={{marginRight: 10}}
                                        >
                                            <Icon name='log-out'/>
                                        </Button>
                                    </View>



                                </View>
                            ),
                        }}
                    />
                    {/*<AuthStackNav.Screen name="Settings" component={SettingsScreen} />*/}
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

    componentDidMount() {
        this.props.onTryAutoSignup(); // auto-signin
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
                    <Tab.Screen name="Rides" component={RideStack}/>
                    <Tab.Screen name="FAQ" component={FAQ}/>
                    <Tab.Screen name={!this.props.isAuthenticated ? "Login" : "Profile"} component={AuthStack} initialParams={{isAuthenticated: this.props.isAuthenticated, logout: this.props.logout}}/>
                </Tab.Navigator>

            </NavigationContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user !== null,
        user: state.auth.user,
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
