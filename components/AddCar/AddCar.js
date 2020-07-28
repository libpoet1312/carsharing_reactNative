import React, {Component} from 'react';

import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import SignupFormComponent from 'rn-formly';


class AddCar extends Component{

    someFunction = () => {
        alert('change')
    };

    state = {
        plate: ''
    };

    render() {

        const inputFields = [
            {
                key: 'name',
                type: 'text',
                label: `Your Full Name`,
                required: true,
                helper: 'Using your real name would make it more likely for you to get a match',
                templateOptions: {
                    componentProps: {
                        placeholder: 'Frank Murphy'
                    }
                }
            },
            {
                key: 'otp',
                type: 'otp',
                label: 'Enter OTP',
                helper: '(optional) but try to enter incorrect date',
                templateOptions: {
                    noOfTextInput: 5,
                }
            }]

        const justLogDataFromForms = (index, key, currentValue,  payload) => {
            console.log('Logging from Parent log');
            console.log(index, key, currentValue, payload)
        };

        return (
            // <View style={styles.container}>
            //     <View style={styles.InputContainer}>
            //         <TextInput
            //             style={styles.body}
            //             placeholder="Plate"
            //             onChangeText={text => this.setState({ plate: text })}
            //             value={this.state.plate}
            //             placeholderTextColor={'gray'}
            //             underlineColorAndroid="transparent"
            //             clearButtonMode='always'
            //             autoCapitalize={'characters'}
            //         />
            //     </View>
            // </View>
            <SignupFormComponent
                inputFields={inputFields}
                globalButtonText={'Next'}
                onButtonClick={justLogDataFromForms}
                defaultColor={'green'}
                progressBarProps={{
                    blink: false
                }}
            />

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    InputContainer: {
        width: 200,
        marginTop: 30,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: 'gray',
        borderRadius: 15
    },
    body: {
        height: 45,
        paddingLeft: 20,
        paddingRight: 20,
        color: 'black',
        textAlign: 'center'
    },
});

export default AddCar;
