import React, {useState} from "react";
import {View, Dimensions, StyleSheet,TextInput} from "react-native";
import {Button, Text} from "native-base";
import RBSheet from "react-native-raw-bottom-sheet";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const UpdateProfileModal = (props) => {

    let label = 'Enter new username';
    if(props.mode==='email'){
        label = 'Enter new email';
    }
    const [value, setValue] = useState(props.value);


    return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder={label}
                        placeholderTextColor="#003f5c"
                        value={value} onChangeText={text=>setValue(text)}
                    />
                </View>

                {/*<Button onPress={()=> props.closeModal('user')}>*/}
                {/*    <Text>close</Text>*/}
                {/*</Button>*/}
                <Button rounded warning style={{marginRight: 5}} onPress={()=> props.updateValue(value, props.mode)}>
                    <Text>Update</Text>
                </Button>

            </View>
    )
};

const styles = StyleSheet.create({
    modalContent: {
        // backgroundColor: '#fff',
        height: 300,
        width: 300,
        borderWidth: 2
    },
    inputText:{
        height:50,
        color:"white"
    },
    inputView:{
        width: 250,
        marginLeft: 5,
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        justifyContent:"center",
        padding:20
    },
});

export default UpdateProfileModal;
