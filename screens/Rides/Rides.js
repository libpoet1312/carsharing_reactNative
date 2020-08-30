import React, { Component } from 'react'
import {View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions} from "react-native";

import {connect} from 'react-redux';
import * as ridesActions from '../../store/actions/ridesActions';

import {AppLoading} from "expo";

import SearchBar from "../../components/SearchBar/SearchBar";
import RideItem from "../../components/RideItem/RideItem";
import {Icon} from "native-base";

const height = Dimensions.get('window').height - 100;

let query = new URLSearchParams();


class Rides extends Component {
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

    onRefresh() {
        this.setState({ loading: true }, () => {
            query.delete('page');
            this.props.fetchRides(query.toString()) });
    }





    componentDidMount() {
        query.append('page', '1');
        this.props.fetchRides(query.toString());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('componentDidUpdate');
        if(!this.props.loading && prevProps.loading) {
            // console.log('asd');
            this.setState({isLoadingMore: false});
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate');
        // console.log(nextProps.rides.length, this.props.rides.length);
        return nextProps.rides.length !== this.props.rides.length
    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20; // how far from the bottom
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };






    renderHeader = () => {
        return <SearchBar/>;
    };

    fetchMoreRides = () => {
        if(this.props.rides){
            if(this.props.rides.length<this.props.pager.totalItems ){
                console.log('fetchMoreRides');
                query.set('page', this.props.pager.currentPage + 1);
                this.props.fetchMoreRides(query.toString());
            }
        }

    };


    render() {
        if(this.props.loading){
            return <AppLoading />;
        }


        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.rides}
                    renderItem={({ item }) => RideItem({item}, this.props.navigation)} //passing navigation props also!
                    keyExtractor={item => item.pk.toString()}
                    ListHeaderComponent={this.renderHeader}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.props.loading}

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
                            (this.props.loading || this.state.isLoadingMore) &&
                            <View style={{ flex: 1 }}>
                                <ActivityIndicator size="large" color={'black'} />
                            </View>
                        )
                    }}
                />
                <TouchableOpacity
                    style={styles.filterBtn}
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
    },
    filterBtn: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:60,
        position: 'absolute',
        bottom: 10,
        // right: 10,
        height:60,
        backgroundColor:'#fff',
        borderRadius:100,
        alignSelf: 'center'
    }
});


const mapStateToProps = (state) => {
    return {
        rides: state.rides.rides,
        error: state.rides.error,
        loading: state.rides.loading,
        pager: state.rides.pager
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchRides: (query) => dispatch(ridesActions.fetchRides(query)),
        fetchMoreRides: (query) => dispatch(ridesActions.fetchMoreRides(query)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Rides);
