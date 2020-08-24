import React, {useState} from "react";
import {View, Text, Modal, StyleSheet, TextInput, TouchableOpacity} from "react-native";

import {Container, Icon,Header, Button} from "native-base";

import NumericInput from 'rn-numeric-input';

const JoinModal = (props) => {
    const [noOfSeats, setSeats] = useState(1);
    const [message, setMessage] = useState('');


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

                        <NumericInput
                            containerStyle={{marginTop: 50, marginBottom: 20}}
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
                            leftButtonBackgroundColor='#E56B70'
                            reachMaxIncIconStyle={{color: 'gray'}}
                            reachMinDecIconStyle={{color: 'gray'}}
                        />
                        <TextInput
                            style={styles.message}
                            value={message}
                            placeholder='Optional Message'
                            onChangeText={e=>setMessage(e.target.value)}
                            multiline={true}
                        />
                        <View>
                            <Button style={{alignSelf: 'center', justifyContent: 'center', marginTop: 50, width: 150}} info rounded large
                                    onPress={()=>props.joinHandler(noOfSeats, message)}>
                                <Text style={{fontWeight: 'bold'}}>Send Request</Text>
                            </Button>
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
    message: {
        marginTop: 20,
        width: 235,
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        color: 'black',
        textAlign: 'center',
        alignContent: 'center'
    }
});

export default JoinModal;
