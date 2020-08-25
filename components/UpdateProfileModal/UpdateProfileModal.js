import React, {useState, useRef} from "react";
import {View, StyleSheet, TextInput, ScrollView} from "react-native";
import {Button, Text, Icon, Picker} from "native-base";
import PhoneInput from 'react-native-phone-input';
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal';

const sports = [
    {
        label: 'Football',
        value: 'football',
    },
    {
        label: 'Baseball',
        value: 'baseball',
    },
    {
        label: 'Hockey',
        value: 'hockey',
    },
];

const UpdateProfileModal = (props) => {
    const [value, setValue] = useState(props.value);

    const phoneRef = useRef('');

    let label = 'Enter new username';
    let out = <View style={styles.inputView}>
        <TextInput
            style={styles.inputText}
            placeholder={label}
            placeholderTextColor="#003f5c"
            value={value} onChangeText={text=>setValue(text)}
        />
    </View>;
    if(props.mode==='email'){
        label = 'Enter new email';
    }else if(props.mode === 'phone_number'){
        label = 'enter new phone';
        out = <PhoneInput ref={phoneRef}
                          onChangePhoneNumber={(la)=>{
                              console.log(la);
                              console.log(phoneRef.current.getValue());
                              setValue(phoneRef.current.getValue());
                          }}
                          style={styles.inputView}
                          initialCountry={'gr'}
        />;
    }else if(props.mode === 'country'){
        label = 'enter country';
        out = <View style={{marginLeft: 50, borderWidth: 1, borderRadius: 15, borderColor: 'yellow', padding: 5, width: 150}}>
            <CountryPicker
                withFlag withCountryNameButton withAlphaFilter withCallingCode
                           countryCode={value} withFilter theme={{...DARK_THEME, flagSizeButton: 27,}}
                onSelect={(c)=>{
                    console.log(c);
                    setValue(c.cca2);
                }}

            />
        </View>;
    }else if(props.mode === 'gender'){
        out = <Picker
            mode="dropdown"

            textStyle={{borderWidth: 1, padding: 5, borderRadius: 15}}
            style={{ width: 150, marginLeft: 50, marginRight: 20, borderWidth: 1, padding: 5, borderRadius: 15 }}
            selectedValue={value}
            onValueChange={(c)=> setValue(c)}
        >
            <Picker.Item label="Male" value="M" />
            <Picker.Item label="Female" value="F" />
            <Picker.Item label="Other/Unknown" value="O" />

        </Picker>
    }



    return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                {out}
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
