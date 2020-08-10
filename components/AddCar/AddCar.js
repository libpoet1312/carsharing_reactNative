import React, {Component} from 'react';
import t from 'tcomb-form-native';
import { Text, StyleSheet, TouchableHighlight, } from "react-native";

import {connect} from 'react-redux';

import {Container, Content} from "native-base";

let Form = t.form.Form;

let Car = t.struct({
    plate: t.String,              // a required string
    model: t.maybe(t.String),  // an optional string
    color: t.String,               // a required number
    brand: t.String,
    year: t.Number,

});

let options = {};

class AddCar extends Component{

    onPress = () => {
        // call getValue() to get the values of the form
        const value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            console.log(value); // value here is an instance of Person
            // this.handleAdd(value, this.props.navigation);
            this.props.route.params.addCar(value);
        }
    };

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Form
                        ref="form"
                        type={Car}
                        options={options}
                    />
                    <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Add Car</Text>
                    </TouchableHighlight>
                </Content>
            </Container>

        )
    }
}

const styles = StyleSheet.create({
    container: {
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

const mapStateToProps = (state) => {
    return{
        token: state.auth.user.token
    }
};

export default connect(mapStateToProps)(AddCar);
