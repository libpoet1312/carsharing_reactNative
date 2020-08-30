import React, {Component} from "react";
import {connect} from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Image,
    ActivityIndicator
} from "react-native";
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import * as myRidesActions from "../../store/actions/myRidesActions";
import {Icon, List, ListItem, Right, Left, Body, Button, Container, Content} from "native-base";
import car from "../../assets/images/carlist.jpeg";
import SearchBar from "../../components/SearchBar/SearchBar";


let query = new URLSearchParams();


class MyRides extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        rides: null,
        loading: true,
        origin: null,
        destination: null,
        date: null,
        time: null,
        passengers: null,
        pager: {},
        isLoadingMore: false,
    };

    componentDidMount() {
        // console.log(this.props.token);
        query.set('page', '1');
        this.props.fetchRides('', this.props.token);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.rides!==this.props.rides){
            this.props.fetchRides('', this.props.token);
        }

        if(!this.props.loading && prevProps.loading) {
            // console.log('asd');
            this.setState({isLoadingMore: false});
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate');
        // console.log(nextProps.rides.length, this.props.rides.length);
        if(nextProps.rides && this.props.rides) return nextProps.rides.length !== this.props.rides.length;
        return true;
    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20; // how far from the bottom
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    fetchMoreRides = () => {
        if(!this.props.rides) return;
        if(this.props.rides.length<this.props.pager.totalItems ){
            console.log('fetchMoreRides');
            query.set('page', this.props.pager.currentPage + 1);
            this.props.fetchMoreRides(query.toString());
        }
    };


    onRefresh = () => {
        query.delete('page');
        this.props.fetchRides('', this.props.token);
    };

    renderHeader = () => {
        return <SearchBar/>;
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
                    onPress={() => this.props.navigation.navigate('EditRide', {pk:data.item.pk})}
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

                    onScroll={({ nativeEvent }) => {
                        if (this.isCloseToBottom(nativeEvent)) {
                            // Dont forget to debounce or throttle this function.
                            console.log('END REACHED');
                            this.setState({isLoadingMore: true});
                            this.fetchMoreRides();
                        }
                    }}

                    ListFooterComponent={()=>{
                        return (
                            (this.props.loading && this.state.isLoadingMore) &&
                            <View style={{ flex: 1 }}>
                                <ActivityIndicator size="large" color={'black'} />
                            </View>
                        )
                    }}

                />
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
