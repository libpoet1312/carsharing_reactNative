import React, {Component} from 'react';
import t from 'tcomb-form-native';
import { Button, TextInput, View, Text, StyleSheet,TouchableHighlight } from "react-native";

let Form = t.form.Form;

let Car = t.struct({
    plate: t.String,              // a required string
    model: t.maybe(t.String),  // an optional string
    color: t.String,               // a required number
    brand: t.String,
    year: t.String,

});

let options = {};

class AddCar extends Component{

    someFunction = () => {
        alert('change')
    };

    state = {
        plate: ''
    };

    onPress = () => {
        // call getValue() to get the values of the form
        const value = this.form.getValue();
        if (value) { // if validation fails, value will be null
            console.log(value); // value here is an instance of Person
        }
    };

    render() {


        return (

            <View style={styles.container}>
                {/* display */}
                <Form
                    ref="form"
                    type={Car}
                    options={options}
                />
                <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Add Car</Text>
                </TouchableHighlight>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center"
//     },
//     InputContainer: {
//         width: 200,
//         marginTop: 30,
//         borderWidth: 1,
//         borderStyle: "solid",
//         borderColor: 'gray',
//         borderRadius: 15
//     },
//     body: {
//         height: 45,
//         paddingLeft: 20,
//         paddingRight: 20,
//         color: 'black',
//         textAlign: 'center'
//     },
// });

export default AddCar;
