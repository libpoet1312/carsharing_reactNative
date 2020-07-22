import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {DrawerActions} from "@react-navigation/native";
import {Button, Icon} from "native-base";

const Ride =({route, navigation}) => {
    const { pk } = route.params;

    return(
        <View>
            <Text>{pk}</Text>
        </View>
    )

};

export default Ride;
