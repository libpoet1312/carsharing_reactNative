import React, {Component} from "react";
import {View, Text, Modal, StyleSheet, TouchableHighlight, TouchableOpacity} from "react-native";
import t from "tcomb-form-native";
import {Container, Icon, Content} from 'native-base';

let Form = t.form.Form;

let Car = t.struct({
    plate: t.String,              // a required string
    model: t.maybe(t.String),  // an optional string
    color: t.String,               // a required number
    brand: t.String,
    year: t.Number,

});

class CarModal extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props!==prevProps && this.props.selectedItem!==null){
            this.setState({
                value: {
                    plate: this.props.selectedItem.plate,
                    model: this.props.selectedItem.model,
                    brand: this.props.selectedItem.brand,
                    color: this.props.selectedItem.color,
                    year: this.props.selectedItem.year,
                }
            });
        }
    }

    state = {
        value: {
            plate: this.props.selectedItem.plate,
            model: this.props.selectedItem.model,
            brand: this.props.selectedItem.brand,
            color: this.props.selectedItem.color,
            year: this.props.selectedItem.year,
        }
    };

    onChange = (value) => {
        this.setState({value});
    };

    onPressSave = () => {
        let value = this.refs.form.getValue();
        if (value) {
            console.log(value);
        }
        this.props.handleSave(this.props.selectedItem.key, value);
    };


    render() {
        if(this.props.selectedItem===null){
            return null
        }

        return (
            <Container>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => { this.props.onDismiss() }}
                >

                    <View style={styles.container}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <View>
                                <TouchableOpacity style={{alignItems: 'center'}}  onPress={()=>this.props.onDismiss()}>
                                    <Icon  name='close-circle-outline' style={{color: 'red'}} />
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{fontSize: 25, fontWeight: 'bold'}}>My Car</Text>
                            </View>
                            <View>
                                <TouchableOpacity  onPress={()=>this.onPressSave()} style={{alignItems: 'center'}}>
                                    <Icon name='ios-save' style={{color: '#227bd4'}}/>
                                    <Text>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.innerContainer}>
                            <Form
                                ref="form"
                                type={Car}
                                value={this.state.value}
                                onChange={this.onChange}
                            />
                        </View>
                    </View>
                </Modal>
            </Container>
        );
    }
}

export default CarModal;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'transparent',
    },
    innerContainer: {
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20
    },
    buttonContainer: {
        paddingVertical: 15,
        marginTop: 20,
        backgroundColor: '#2c3e50',
        borderRadius: 15
    },
    buttonText: {
        textAlign: 'center',
        color: 'gray',
        fontWeight: '700'
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
