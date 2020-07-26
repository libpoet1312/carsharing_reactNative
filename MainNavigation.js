import React, {useState, Component} from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from "@react-navigation/drawer";

import {Button, Icon} from "native-base";

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

const SideBar = () => {
    return <Drawer.Navigator
        drawerPosition="right"
    >
        <Drawer.Screen name={'Profile'} component={MyProfile}/>
    </Drawer.Navigator>
};


const AuthStack = (props) => {

    const [drawer, drawerToggle] = useState('false');
    console.log(drawer);
    return (
        <AuthStackNav.Navigator>
            {props.route.params.isAuthenticated ?
                <>
                    <AuthStackNav.Screen name="Profile" component={SideBar}
                        options={{
                            title: 'My Profile',
                            headerRight: () => (
                                <Button transparent
                                    onPress={() => {
                                        props.navigation.dispatch(DrawerActions.toggleDrawer());
                                        drawerToggle(!drawer);
                                    }}
                                        style={{marginRight: 10}}
                                >
                                    <Icon name={drawer? 'menu-unfold' : 'menu-fold'} type={'AntDesign'}/>
                                </Button>

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
                    <Tab.Screen name={!this.props.isAuthenticated ? "Login" : "Profile"} component={AuthStack} initialParams={{isAuthenticated: this.props.isAuthenticated}}/>
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
