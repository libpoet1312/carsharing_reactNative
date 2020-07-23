import React from 'react';
import {Icon} from "native-base";
import {TouchableOpacity} from "react-native";


const PaginationButton = (name) => {
    return (
        <TouchableOpacity
            style={{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'right',
                justifyContent:'center',
                width:50,
                alignSelf: 'center',
                bottom: 10,
                height:50,
                backgroundColor:'#fff',
                borderRadius:100,
            }}
        >
            <Icon name="caretright" type='AntDesign' size={30} />
        </TouchableOpacity>
    )
};

export default PaginationButton;
