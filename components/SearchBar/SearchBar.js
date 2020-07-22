import React from 'react';
import {View, TextInput, StyleSheet, Image} from "react-native";
import img from '../../assets/images/img_571322.png';

const SearchBar = () => (
    <View
        style={{
            backgroundColor: '#fff',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row'
        }}>
        <TextInput
            autoCapitalize='none'
            onChangeText={() => console.log('sd')}
            placeholder='Origin'
            style={styles.searchbar}
            textStyle={{ color: '#000' }}
        />

        <Image style={{width: 50, height: 50}} resizeMode={'contain'} source={img}/>
        <TextInput
            autoCapitalize='none'
            onChangeText={() => console.log('sd')}
            placeholder='Destination'
            style={styles.searchbar}
            textStyle={{ color: '#000' }}
        />

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
