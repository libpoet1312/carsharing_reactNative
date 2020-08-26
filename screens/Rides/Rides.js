import React, { Component } from 'react'
import {View, FlatList, StyleSheet, TouchableOpacity} from "react-native";

import {connect} from 'react-redux';
import * as ridesActions from '../../store/actions/ridesActions';

import {AppLoading} from "expo";

import SearchBar from "../../components/SearchBar/SearchBar";
import RideItem from "../../components/RideItem/RideItem";
import {Icon} from "native-base";


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
    };

    onRefresh() {
        this.setState({ loading: true }, () => {  this.props.fetchRides(query.toString()) });
    }

    onEnd = ({distanceFromEnd}) => {
        console.log(distanceFromEnd);

        if (distanceFromEnd < 0) return;
        console.log('end');
        if(this.props.rides.length<this.props.pager.totalItems){
            console.log('totalItems:', this.props.rides.length);
            query.append('page', this.props.pager.currentPage + 1);
            this.props.fetchMoreRides(query.toString());
        }
    };



    componentDidMount() {
        query.append('page', '1');
        this.props.fetchRides(query.toString());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state!==prevState){
            console.log('here');
            this.props.fetchRides('');
        }
    }






    renderHeader = () => {
        return <SearchBar/>;
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
                    onEndReached={this.onEnd}
                    onEndReachedThreshold={0.1}
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
