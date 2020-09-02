import React from "react";
import {View, Modal, Text, StyleSheet, PixelRatio} from "react-native";
import {H2} from "native-base";
import {GOOGLE_MAPS_KEY} from "../../config";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

const defaultStyles = {

    textInputContainer: {
        backgroundColor: '#C9C9CE',
        height: 50,
        borderTopColor: '#7e7e7e',
        borderBottomColor: '#b5b5b5',
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
        flexDirection: 'row',
        alignContent: "center"
    },
    textInput: {
        backgroundColor: '#FFFFFF',
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
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

const FilterModal = (props) => {
    return (
        <View>
            <View>
                <H2>Filters...</H2>

                <GooglePlacesAutocomplete
                    placeholder='Origin'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    onFail={(error) => console.error(error)}
                    query={{
                        key: GOOGLE_MAPS_KEY,
                        language: 'en',
                    }}
                    styles={defaultStyles}

                />




            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',

        margin: 10
    }
});



export default FilterModal;
