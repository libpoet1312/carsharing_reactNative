import React, { Component } from 'react'
import {View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput, RefreshControl} from "react-native";
import {ListItem, Right, Left, Body, Button, Icon} from "native-base";
import axios from 'axios';
import {AppLoading} from "expo";
import {DrawerActions} from "@react-navigation/native";
import car from '../../assets/images/carlist.jpeg';
import SearchBar from "../../components/SearchBar/SearchBar";
export default class Rides extends Component {


    constructor(props) {
        super(props);
    }

    state = {
        rides: null,
        loading: true
    };

    onRefresh() {
        this.setState({ loading: true }, function() { this.fetchData() });
    }

    fetchData = () => {
        axios.get('https://snf-876572.vm.okeanos.grnet.gr/api/').then(res => {
            this.setState( {
                rides: res.data.results,
                loading: false
            })
        }).catch( error => {
            console.log(error);
        })
    };

    componentDidMount() {
        this.fetchData();
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '5%'
                }}
            />
        )
    };

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Ride", {
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



    renderHeader = () => {
        return <SearchBar/>;
    };

    render() {
        if(this.state.loading){
            return <AppLoading />;
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.rides}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.origin}
                    ListHeaderComponent={this.renderHeader}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.loading}
                />

                <TouchableOpacity
                    style={{
                        borderWidth:1,
                        borderColor:'rgba(0,0,0,0.2)',
                        alignItems:'center',
                        justifyContent:'center',
                        width:50,
                        alignSelf: 'center',
                        bottom: 10,
                        height:50,
                        backgroundColor:'#fff',
                        borderRadius:100,
                    }}
                >
                    <Icon name="filter" type='AntDesign' size={30} />
                </TouchableOpacity>


            </View>

        )
    }
}

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
