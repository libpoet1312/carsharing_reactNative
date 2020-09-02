import React, { Component } from 'react'
import {View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions} from "react-native";

import {connect} from 'react-redux';
import * as ridesActions from '../../store/actions/ridesActions';

import {AppLoading} from "expo";

import SearchBar from "../../components/SearchBar/SearchBar";
import RideItem from "../../components/RideItem/RideItem";
import {Icon, H1, H3, DatePicker, Button} from "native-base";

import RBSheet from "react-native-raw-bottom-sheet";
import {GOOGLE_MAPS_KEY} from "../../config";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import NumericInput from "rn-numeric-input";

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
        vacant_seats: 1,
        pager: {},
        isLoadingMore: false,
        isModalVisible: false
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
        if(this.state.isModalVisible!==nextState.isModalVisible) return true;
        if(this.props.rides) return nextProps.rides.length !== this.props.rides.length;
        return true;
    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20; // how far from the bottom
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    setDate = (date) => {
        console.log(date);
    };






    renderHeader = () => {
        return <SearchBar/>;
    };

    fetchMoreRides = () => {
        console.log(this.props.rides.length,this.props.pager.totalItems );
        if(this.props.rides){
            if(this.props.rides.length<this.props.pager.totalItems ){
                console.log('fetchMoreRides');
                query.set('page', this.props.pager.currentPage + 1);
                this.props.fetchMoreRides(query.toString());
            }
        }

    };

    toggleModal = () => {
        console.log('toogle');
        this.setState({isModalVisible: true})
    };

    closeModal = () => {
        this.setState({isModalVisible: false})
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
                    onPress={() => this.RBSheet.open()}
                >
                    <Icon name="filter" type='AntDesign' size={30} />
                </TouchableOpacity>


                <RBSheet
                    ref={ref => {this.RBSheet = ref}}
                    height={550}
                    openDuration={100}
                    closeDuration={50}
                    animationType={'slide'}
                    customStyles={{
                        container: {
                            padding: 10,
                            // alignItems: "center",
                            backgroundColor: '#fff',
                        },
                        wrapper: {

                            backgroundColor: 'transparent',
                        },
                    }}
                    closeOnDragDown={true}
                >
                    <H1 style={{alignSelf: 'center', backgroundColor: 'orange', padding: 10, borderRadius: 25}}>Filters...</H1>

                    <H3>Origin:</H3>
                    <GooglePlacesAutocomplete
                        placeholder='Origin'
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log(data, details);
                        }}
                        onFail={(error) => console.error(error)}
                        query={{
                            key: GOOGLE_MAPS_KEY,
                            language: 'en',
                        }}
                    />

                    <H3>Destination:</H3>
                    <GooglePlacesAutocomplete
                        placeholder='Destination'
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log(data, details);
                        }}
                        onFail={(error) => console.error(error)}
                        query={{
                            key: GOOGLE_MAPS_KEY,
                            language: 'en',
                        }}
                    />

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
                        <View style={{alignItems: 'center'}}>
                            <H3>Seats Available</H3>
                            <NumericInput
                                // value={this.state.value}
                                onChange={value => this.setState({vacant_seats: value})}
                                onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                totalWidth={150}
                                totalHeight={40}
                                iconSize={20}
                                step={1}
                                valueType='integer'
                                rounded
                                textColor='#B0228C'
                                iconStyle={{ color: 'white' }}
                                rightButtonBackgroundColor='#EA3788'
                                leftButtonBackgroundColor='#E56B70'
                                minValue={1}
                                initValue={this.state.vacant_seats}
                            />
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <H3 >Date</H3>
                            <DatePicker
                                defaultDate={Date.now()}
                                minimumDate={Date.now()}
                                // maximumDate={new Date(2018, 12, 31)}
                                locale={"gr"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select date"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setDate}
                                disabled={false}
                            />
                        </View>
                    </View>

                    <Button warning full rounded style={{marginTop: 20}}>
                        <H3>Apply</H3>
                    </Button>

                </RBSheet>
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
