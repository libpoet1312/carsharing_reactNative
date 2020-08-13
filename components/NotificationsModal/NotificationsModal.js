import React, {useState} from "react";
import {FlatList, Modal,View, SafeAreaView, Text, TouchableOpacity, StyleSheet} from "react-native";
import {Container, Header, Icon} from "native-base";

const renderItem = ({item}) => {
    console.log(item);
    return (
        <Container>
            <Text>From {item.actor.username}</Text>
            <Text>To {item.recipient.username}</Text>
            <Text>
                Ride: {item.target.origin} to {item.target.destination}
            </Text>
        </Container>
    )
};

const NotificationsModal = (props) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={props.visible}
            onRequestClose={()=>props.toggleModal()}
        >
            <Header style={{flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: '#fff', padding: 5}}>
                <TouchableOpacity style={{alignItems: 'center'}}  onPress={()=>props.toggleModal()}>
                    <Icon name='close-circle-outline' style={{color: 'red'}} />
                    <Text>Cancel</Text>
                </TouchableOpacity>

            </Header>
            <View style={styles.container}>
                <FlatList
                    data={props.notifications}
                    keyExtractor={(item, index) => item.id}
                    renderItem={renderItem}

                />
            </View>


        </Modal>
    )
};

const styles = StyleSheet.create({
    container : {
        padding: 20
    },
    item: {
        marginBottom: 10
    }
});

export default NotificationsModal;
