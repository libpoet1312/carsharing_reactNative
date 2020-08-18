import React, {Component} from 'react';
import {StyleSheet, View, Text, PixelRatio, Image} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import StepIndicator from 'react-native-step-indicator';
import {Container, Card, DatePicker, H3, H1, Button} from "native-base";


import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {GOOGLE_MAPS_KEY} from "../../config";
import img from "../../assets/images/img_571322.png";
import moment from "moment";

const labels = ["Basic Ride Informantion","Extra","Submit",];
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize:30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
};

const defaultStyles = {

    textInputContainer: {
        backgroundColor: '#C9C9CE',
        height: 50,
        borderTopColor: '#7e7e7e',
        borderBottomColor: '#b5b5b5',
        borderTopWidth: 1 / PixelRatio.get(),
        borderBottomWidth: 1 / PixelRatio.get(),
        flexDirection: 'row',
        alignContent: "center"
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        height: 35,
        borderRadius: 5,
        paddingTop: 4.5,
        paddingBottom: 4.5,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 7.5,
        marginLeft: 8,
        marginRight: 8,
        fontSize: 15,
        flex: 1,
        textAlign: "center",
    },
    poweredContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    powered: {},
    listView: {},
    row: {
        padding: 13,
        height: 44,
        flexDirection: 'row',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#c8c7cc',
    },
    description: {},
    loader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 20,
    },
};

class AddRide extends Component {
    state = {
        currentPosition: 0,
        origin: null,
        destination: null,
        date: Date.now(),
        time: '12:00:00',
        vacant_seats: 1,
        car: null,
        cars: null,
        carModalVisible: false,
        duration: 0,
        distance: 0,
        show: false,
    };

    onPageChange(event){
        const position = event.nativeEvent.position;
        // console.log(position);
        this.setState({currentPosition: position});
    }

    setDate = (date) => {
        // console.log(date.toTimeString());
        // const time1 = moment(date, "hh:mm:ss").toISOString();
        // console.log('time1', time1);
        // const time2 = date.split('T');
        // console.log(time2[1].slice(0, -1));
        // const time = time2[1].slice(0, -1);

        this.setState({
            date: date.toDateString(),
            time: date.toTimeString()
        })
    };

    toggleDatePicker = () => {
        this.setState({show: !this.state.show})
    };

    render() {


        return (
            <Container>
                <Card style={{padding: 10}}>
                    <StepIndicator
                        customStyles={customStyles}
                        currentPosition={this.state.currentPosition}
                        labels={labels}
                        stepCount={3}
                    />
                </Card>

                <ViewPager
                    style={styles.viewPager}
                    initialPage={0}
                    pageMargin={50}
                    onPageSelected = {event => this.onPageChange(event)}
                >
                    <View key="0">
                        <View style={styles.container}>


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
                                    suppressDefaultStyles={true}
                                    styles={defaultStyles}
                                />

                            <View style={{alignSelf: 'center'}}>
                                <Image style={{width: 100, height: 100}} resizeMode={'contain'} source={img}/>
                            </View>


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
                                    suppressDefaultStyles={true}
                                    minLength={2}
                                    styles={defaultStyles}
                                />

                            <View style={{alignSelf: 'center', marginTop: 20}}>
                                <H1 style={{textAlign: "center"}}>Date:</H1>
                                <DateTimePickerModal
                                    isVisible={this.state.show}
                                    mode="datetime"
                                    onConfirm={this.setDate}
                                    onCancel={this.toggleDatePicker}
                                    minimumDate={Date.now()}
                                    isDarkModeEnabled={true}
                                />
                                <Button large style={{alignSelf: "center", justifyContent: 'center', width: 150 }} warning onPress={this.toggleDatePicker}>
                                    <Text style={{textAlign: 'center',}}>{new Date(this.state.date).toDateString()}{"\n"}
                                        {this.state.time.split(' ')[0]}
                                    </Text>
                                </Button>

                            </View>
                            <View>


                            </View>



                        </View>

                    </View>
                    <View key="1">

                    </View>
                    <View key="2">
                        <Text>Second page</Text>
                    </View>
                </ViewPager>

            </Container>

        )
    }
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    container: {
        justifyContent: "space-evenly",
        borderWidth: 1,
        borderRadius: 20,
        margin: 10,
        height: 400,

    },
});


export default AddRide;
