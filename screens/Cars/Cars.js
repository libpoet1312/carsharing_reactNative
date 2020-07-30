import React, {Component} from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity, TouchableHighlight, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Icon, Container} from 'native-base';

import {connect} from 'react-redux';
import axios from 'axios';
import {API_HTTP} from "../../config";

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import CarModal from "../../components/CarModal/CarModal";

class Cars extends Component {

    state = {
        dataSource: [],
        count: 0,
        loading: true,
        isModalVisible: false,
        selectedItem: null
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
                // console.log(response.data);
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
                    loading: false,
                    selectedItem: cars[0] // preload the first to modal
                });
                // console.log(response);
            }).catch(error=>{

            console.log(error);
        });
    };

    componentDidMount() {
        this.fetchCars();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.count!==this.state.count){
            console.log('update');
            this.fetchCars();
        }
    }

    renderItem = (data, rowMap) => {
        return(
            <SwipeRow
                // disableLeftSwipe={parseInt(data.item.key) % 2 === 0}
                disableRightSwipe={true}
                leftOpenValue={20 + Math.random() * 150}
                rightOpenValue={-150}
                keyExtractor={(data) => data.item.plate}
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
                    onPress={() => this.onPress(data.item)}
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
        const dataSource = [...this.state.dataSource];
        // console.log(dataSource);

        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.props.token
            }
        };
        axios.delete(API_HTTP + 'cars/car/'+key+'/', config)
            .then( response => {
                // console.log(response);
                this.setState({
                    dataSource: dataSource.filter(item => item.key !== key),
                });
                // console.log(this.state.dataSource);

            }).catch(error=>{
                console.log(error.response);
        });
    };

    handleAdd = newCar => {
        console.log(newCar);
        const { dataSource,  count} = this.state;
        const newData = {
            key: dataSource[dataSource.length-1]+1,
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
                this.props.navigation.goBack();

            }).catch(error=>{

            console.log(error.response);
        });

        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    handleSave = (key, Car) => {
        console.log(key, Car);

        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => key === item.key);
        const item = newData[index];

        console.log(item);
        newData.splice(index, 1, { ...item, ...Car });

        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.props.token
            }
        };
        axios.patch(API_HTTP + 'cars/car/'+item.key+'/', {
            plate: newData[index].plate,
            brand: newData[index].brand,
            model: newData[index].model,
            year: newData[index].year,
            color: newData[index].color
        }, config)
            .then( response => {
                console.log(response);

                this.setState({
                    dataSource: newData,
                });
                this.onDismiss();

            }).catch(error=>{
            console.log(error);
        });
    };

    onPress = async (selectedItem) => {
        // console.log(selectedItem);
        await this.setState({ selectedItem: selectedItem });
        await console.log(this.state.selectedItem);
        await this.setState({ isModalVisible: true });


    };

    onDismiss = () => {
        this.setState({isModalVisible: false})
    };

    deleteRow = (rowMap, rowKey) => {
        console.log('rowKey',rowKey);
        this.closeRow(rowMap, rowKey);
        const prevIndex = this.state.dataSource.findIndex(item => item.key === rowKey);
        console.log(prevIndex+1);
        // setListData(newData);
        this.handleDelete(rowKey);
    };

    render() {
        if(this.state.loading){
            return <ActivityIndicator size='large'/>
        }


        return (
            <>

                <View style={styles.container}>


                    <SwipeListView
                        useFlatList={true}
                        data={this.state.dataSource}
                        keyExtractor={(item, index) => item.plate}
                        renderItem={this.renderItem}
                        refreshing={this.state.loading}
                        onRefresh={() => this.fetchCars()}

                    />
                    <TouchableOpacity
                        style={{alignSelf: 'center', bottom: 0, position: 'absolute'}}
                        onPress={() => this.props.navigation.navigate('AddCar', {
                            addCar: newCar => this.handleAdd(newCar)
                        })}
                    >
                        <Icon name='ios-add-circle-outline' style={{fontSize: 50, color: 'tomato'}}/>
                    </TouchableOpacity>


                </View>
                <CarModal
                    modalVisible={this.state.isModalVisible}
                    selectedItem={this.state.selectedItem}
                    onDismiss={()=>this.onDismiss()}
                    handleSave={(key, Car)=>this.handleSave(key, Car)}
                />


            </>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 10,
        flex: 1
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
