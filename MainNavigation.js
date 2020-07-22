import React, {Component} from 'react';
import {Text, View, Button, Icon} from 'native-base';
import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, useIsDrawerOpen } from "@react-navigation/drawer";
import Home from "./screens/Home/Home";
import Rides from "./screens/Rides/Rides";
import { StyleSheet} from 'react-native';
import Ride from "./screens/Ride/Ride";
import FAQ from "./screens/FAQ/FAQ";
import {TouchableOpacity} from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const RideStackNav = createStackNavigator();



const RideStack = () => {
    return (
        <RideStackNav.Navigator initialRouteName="Rides">
            <RideStackNav.Screen name="Rides" component={Rides} />
            <RideStackNav.Screen name="Ride" component={Ride}/>
        </RideStackNav.Navigator>
    )
};

const MainNavigation = () => {
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
                            iconName="ios-log-in"
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
                <Tab.Screen name="Login" component={FAQ}/>
            </Tab.Navigator>

        </NavigationContainer>
    )

};




export default MainNavigation;
