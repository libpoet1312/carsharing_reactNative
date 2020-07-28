import React, {Component} from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity, TouchableHighlight, StyleSheet} from 'react-native';
import {Icon, Button} from 'native-base';

import {connect} from 'react-redux';
import axios from 'axios';
import {API_HTTP} from "../../config";

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

class Cars extends Component {

    state = {
        dataSource: [],
        count: 0,
        loading: true
    };

    fetchCars = () => {
        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.props.token
            }
        };
        axios.get(API_HTTP + 'cars/car/', config)
            .then( response => {
                console.log(response.data);
                const cars = [];
                for (let i = 0; i < response.data.length; i++) {
                    cars.push({
                        key: response.data[i].id,
                        plate: response.data[i].plate,
                        brand: response.data[i].brand,
                        model: response.data[i].model,
                        year: response.data[i].year,
                        color: response.data[i].color,
                    });
                }
                this.setState({
                    dataSource: cars,
                    count: response.data.length,
                    loading: false
                });
            }).catch(error=>{

            console.log(error);
        });
    };

    componentDidMount() {
        this.fetchCars();
    }

    renderItem = (data, rowMap) => {
        return(
            <SwipeRow
                // disableLeftSwipe={parseInt(data.item.key) % 2 === 0}
                disableRightSwipe={true}
                leftOpenValue={20 + Math.random() * 150}
                rightOpenValue={-150}
            >
                <View style={styles.rowBack}>
                    <Text>Left</Text>
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnLeft]}
                        onPress={() => this.closeRow(rowMap, data.item.key)}
                    >
                        <Text style={styles.backTextWhite}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnRight]}
                        onPress={() => this.deleteRow(rowMap, data.item.key)}
                    >
                        <Text style={styles.backTextWhite}>Delete</Text>
                    </TouchableOpacity>
                </View>
                <TouchableHighlight
                    onPress={() => console.log('You touched me')}
                    style={styles.rowFront}
                    underlayColor={'#AAA'}
                >
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <Icon name='car'/>
                        <Text> {data.item.plate}</Text>
                    </View>
                </TouchableHighlight>
            </SwipeRow>
    )};

    closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    handleDelete = key => {
        console.log(key);

        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.props.token
            }
        };
        axios.delete(API_HTTP + 'cars/car/'+key, config)
            .then( response => {
                console.log(response);
                this.setState({
                    dataSource: dataSource.filter(item => item.key !== key),
                });

            }).catch(error=>{
            console.log(error);
        });
    };

    handleAdd = newCar => {
        alert('add')
        console.log(newCar);
        const { count, dataSource } = this.state;
        const newData = {
            key: count+1,
            plate: newCar.plate,
            model: newCar.model,
            color: newCar.color,
            brand: newCar.brand,
            year: newCar.year,
        };
        console.log(this.props.token);

        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.props.token
            }
        };
        axios.post(API_HTTP + 'cars/car/', newCar, config)
            .then( response => {
                console.log(response);

            }).catch(error=>{

            console.log(error);
        });

        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    openAddModal = () => {


    };

    deleteRow = (rowMap, rowKey) => {
        this.closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        // setListData(newData);
    };

    render() {
        if(this.state.loading){
            return <ActivityIndicator size='large'/>
        }


        return (
            <View style={styles.container}>
                <SwipeListView data={this.state.dataSource} renderItem={this.renderItem} />
                <TouchableOpacity
                    style={{alignSelf: 'center', bottom: 10, position: 'absolute'}}
                    onPress={() => this.props.navigation.navigate('AddCar')}
                >
                    <Icon name='ios-add-circle-outline' style={{fontSize: 50, color: 'tomato'}}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 10
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
});

const mapStateToProps = (state) => {
    return{
        token: state.auth.user.token
    }
};

export default connect(mapStateToProps)(Cars);
