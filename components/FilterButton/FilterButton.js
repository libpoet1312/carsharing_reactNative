import React from 'react';
import {Icon} from "native-base";
import {TouchableOpacity} from "react-native";


const FilterButton = () => {
    return (
        <TouchableOpacity
            style={{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:50,
                height:50,
                backgroundColor:'#fff',
                borderRadius:100,
            }}
        >
            <Icon name="filter" type='AntDesign' size={30} />
        </TouchableOpacity>
    )
};

export default FilterButton;
