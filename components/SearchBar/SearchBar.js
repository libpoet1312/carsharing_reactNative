import React from 'react';
import {View, TextInput, StyleSheet, Image, PixelRatio} from "react-native";
import img from '../../assets/images/img_571322.png';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {GOOGLE_MAPS_KEY} from "../../config";

const defaultStyles = {

    textInputContainer: {
        height: 50,
        borderWidth: 1,
        flexDirection: 'row',
        alignContent: "center"
    },
    textInput: {
        color: '#C9C9CE',
        height: 35,
        borderRadius: 5,
        paddingTop: 4.5,
        paddingBottom: 4.5,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 7.5,
        marginLeft: 8,
        marginRight: 8,
        fontSize: 15,
        flex: 1,
        textAlign: "center",
    },
    poweredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 1
    },
    powered: {},
    listView: {},
    row: {
        padding: 13,
        height: 44,
        flexDirection: 'row',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#c8c7cc',
    },
    description: {},
    loader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 20,
    },
};

const SearchBar = () => (
    <View
        style={{
            backgroundColor: '#fff',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row'
        }}>



        <Image style={{width: 50, height: 50}} resizeMode={'contain'} source={img}/>
        {/*<TextInput*/}
        {/*    autoCapitalize='none'*/}
        {/*    onChangeText={() => console.log('sd')}*/}
        {/*    placeholder='Destination'*/}
        {/*    style={styles.searchbar}*/}
        {/*    textStyle={{ color: '#000' }}*/}
        {/*/>*/}

    </View>
);

const styles= StyleSheet.create({
    searchbar: {
        textAlign: 'center',
        borderWidth:1,
        padding: 5,
        borderRadius: 10,
        borderColor: '#333',
        backgroundColor: '#fff',
        width: 100}

});

export default SearchBar;
