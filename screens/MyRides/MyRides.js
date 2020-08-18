import React, {Component} from "react";
import {connect} from 'react-redux';
import {View, FlatList, Text, TouchableOpacity, TouchableHighlight, StyleSheet, Image} from "react-native";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import * as myRidesActions from "../../store/actions/myRidesActions";
import {Icon, List, ListItem, Right, Left, Body, Button, Container, Content} from "native-base";
import car from "../../assets/images/carlist.jpeg";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterButton from "../../components/FilterButton/FilterButton";

class MyRides extends Component{
    componentDidMount() {
        // console.log(this.props.token);
        this.props.fetchRides('', this.props.token);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state!==prevState){
            console.log('here');
            this.props.fetchRides('', this.props.token);
            // query.toString()
        }
    }

    onRefresh = () => {
        this.props.fetchRides('', this.props.token);
    };

    renderHeader = () => {
        return <SearchBar/>;
    };

    setPage = (page) => {
        if(page===1){
            query.delete('page');
        }else{
            query.append('page', page);
        }
        this.props.fetchRides(query.toString());
    };

    closeRow = (rowMap, rowKey) => {
        // console.log(rowMap);
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    deleteRow = (rowMap, rowKey) => {
        this.closeRow(rowMap, rowKey);
        this.props.deleteRide(rowKey, this.props.token);
    };

    renderItem = data => {
        return(
        <TouchableHighlight
            style={styles.rowFront}
            underlayColor={'#FFF'}
        >
            <ListItem
                icon
                onPress={()=>this.props.navigation.navigate("Rides", {
                    screen: 'Ride',
                    params: {pk: data.item.pk}
                })}
            >
                <Left>
                    <Image
                        style={styles.car}
                        source={car}
                    />
                </Left>
                <Body>
                    <Text>From {data.item.origin} to {data.item.destination}</Text>
                    <Text style={{color: 'gray'}}>on {data.item.date}</Text>
                </Body>
                <Right>
                    <Text>Car: </Text>
                    <Text style={{color: 'gray'}}>{data.item.car.plate}</Text>
                </Right>
            </ListItem>

        </TouchableHighlight>
    )};

    renderHiddenItem = (data, rowMap) => {
        return(
            <View style={styles.rowBack}>
                <TouchableOpacity
                    style={styles.backLeftBtn}
                    onPress={() => this.closeRow(rowMap, data.item.pk)}
                >
                    <Text style={styles.backTextWhite}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={() => this.closeRow(rowMap, data.item.pk)}
                >
                    <Text style={styles.backTextWhite}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={() => this.deleteRow(rowMap, data.item.pk)}
                >
                    <Text style={styles.backTextWhite}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    };


    render() {
        return (
            <Container>

                <SwipeListView
                    useFlatList={true}
                    data={this.props.rides}
                    renderItem={this.renderItem}
                    renderHiddenItem={this.renderHiddenItem}
                    keyExtractor={item => item.pk.toString()}
                    ListHeaderComponent={this.renderHeader}
                    refreshing={this.props.loading}
                    onRefresh={() => this.onRefresh()}

                    leftOpenValue={75}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                />

                <View style={styles.buttons}>
                    {this.props.pager.prevPageUrl ?
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.setPage(this.props.pager.currentPage - 1)}

                        >
                            <Icon name="caretleft" type='AntDesign' size={30} />
                        </TouchableOpacity>: null
                    }

                    <FilterButton/>
                    { this.props.pager.nextPageUrl ?
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.setPage(this.props.pager.currentPage + 1)}
                        >
                            <Icon name="caretright" type='AntDesign' size={30} />
                        </TouchableOpacity>  : null
                    }

                </View>
            </Container>

        );
    }
}

const styles = StyleSheet.create({

    car: {
        height: 20,
        width: 25,
        borderWidth: 1
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {

        backgroundColor: '#ffffff',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'stretch',

        height: 70,
    },
    rowBack: {
        alignItems: 'center',
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
    backLeftBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        backgroundColor: 'orange',
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    button: {
        borderWidth: 1,
        borderColor:'rgba(0,0,0,0.2)',
        borderRadius:100,
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
    },
    buttons: {
        borderStyle: 'dashed',
        borderColor: 'rgba(0,0,0.2,0.1)',
        padding: 10,
        // bottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

const mapStateToProps = (state) => {
    return {
        rides: state.myrides.rides,
        error: state.myrides.error,
        loading: state.myrides.loading,
        pager: state.myrides.pager,
        token: state.auth.user ? state.auth.user.token : null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRides: (query, token) => dispatch(myRidesActions.fetchMyRides(query, token)),
        deleteRide: (pk, token) => dispatch(myRidesActions.deleteMyRide(pk,token)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyRides);
