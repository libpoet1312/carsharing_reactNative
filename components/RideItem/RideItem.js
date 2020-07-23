import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import car from "../../assets/images/carlist.jpeg";
import {Icon} from "native-base";

const RideItem = ({item}, p) => {

    return (
        <TouchableOpacity
            onPress={() => p.navigate("Ride", {
                pk: item.pk
            })}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 15,
                    marginBottom: 3,
                    alignItems: 'center',
                    borderWidth: 1,
                    justifyContent: 'space-between'
                }}>
                <Image
                    style={styles.car}
                    source={car}
                />

                <View style={{width: 250}}>
                    <Text style={{alignItems: 'center'}}>
                        <Text style={styles.city}>{item.origin} </Text>
                        <Icon name='arrow-forward' type={'Ionicons'} style={{fontSize: 18}}/>
                        <Text style={styles.city}> {item.destination} </Text>


                    </Text>
                    <Text style={styles.date}>Vacant Seats: {item.vacant_seats}</Text>
                </View>

                <Text style={styles.date}>{item.date}</Text>

            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    car: {
        height: 20,
        width: 20,
        borderWidth: 1
    },
    city: {
        fontWeight: 'bold',
        color: 'tomato',
        fontSize: 15
    },
    date: {
        fontWeight: 'normal',
        color: '#848484'
    }
});

export default RideItem;
