import React, {useState} from "react";
import {View, Text, Modal, StyleSheet, TextInput, TouchableOpacity} from "react-native";

import {Container, Icon,Header, Button} from "native-base";

import NumericInput from 'react-native-numeric-input'
import {color} from "react-native-reanimated";

const JoinModal = (props) => {
    const [noOfSeats, setSeats] = useState(1);



    return (
        <>
            <Modal
                animationType="slide"
                transparent={false}
                visible={props.visible}
                onRequestClose={()=>props.toggleModal()}
            >
                <>
                    <Header style={{flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '#fff', padding: 5}}>
                            <TouchableOpacity style={{alignItems: 'center'}}  onPress={()=>props.onDismiss()}>
                                <Icon name='close-circle-outline' style={{color: 'red'}} />
                                <Text>Cancel</Text>
                            </TouchableOpacity>

                    </Header>
                    <Container style={styles.container}>
                        <Text>Join</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>

                            <NumericInput
                                value={noOfSeats}
                                onChange={value => setSeats(value)}
                                onLimitReached={(isMax,msg) => console.log(`Max vacant seats are: ${props.vacant}`)}
                                minValue={1}
                                maxValue={props.vacant}
                                totalWidth={240}
                                totalHeight={50}
                                iconSize={25}
                                step={1}
                                valueType='integer'
                                rounded
                                textColor='#B0228C'
                                iconStyle={{ color: 'white' }}
                                rightButtonBackgroundColor='#EA3788'
                                leftButtonBackgroundColor='#E56B70'/>
                                reachMaxIncIconStyle={}

                        </View>
                    </Container>
                </>
            </Modal>
        </>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    seats: {
        width: 60,
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        fontWeight: 'bold',
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
        alignContent: 'center'
    }
});

export default JoinModal;
