import React, { Component } from 'react'
import {View, FlatList, StyleSheet, TouchableOpacity} from "react-native";

import {connect} from 'react-redux';
import * as ridesActions from '../../store/actions/ridesActions';

import {AppLoading} from "expo";

import SearchBar from "../../components/SearchBar/SearchBar";
import RideItem from "../../components/RideItem/RideItem";
import FilterButton from "../../components/FilterButton/FilterButton";
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



    componentDidMount() {
        this.props.fetchRides(query.toString());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state!==prevState){
            console.log('here');
            this.props.fetchRides(query.toString());
        }
    }

    setPage = (page) => {
        if(page===1){
            query.delete('page');
        }else{
            query.append('page', page);
        }
        this.props.fetchRides(query.toString());
    };




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
                    keyExtractor={item => item.origin}
                    ListHeaderComponent={this.renderHeader}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.props.loading}
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
        flex: 0,
        borderWidth: 1,
        borderStyle: 'dashed',
        padding: 10,
        borderColor: 'rgba(0,0,0.2,0.1)',
        bottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        fetchRides: (query) => dispatch(ridesActions.fetchRides(query))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Rides);
