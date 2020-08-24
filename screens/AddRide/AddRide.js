import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    PixelRatio,
    Image,
    ActivityIndicator,
    Modal,
    Dimensions,
    ScrollView
} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import StepIndicator from 'react-native-step-indicator';
import {Container, Card, H3, H1, Button, CardItem, Header, Body, Title} from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {API_HTTP, GOOGLE_MAPS_KEY} from "../../config";
import img from "../../assets/images/img_571322.png";

import NumericInput from 'rn-numeric-input';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import AddCar from "../../components/AddCar/AddCar";
import MapViewDirections from 'react-native-maps-directions';
import MapView from 'react-native-maps';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 38.659778;
const LONGITUDE = 22.641075;
const LATITUDE_DELTA = 2;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = GOOGLE_MAPS_KEY;


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

const car = {
    label: '',
    key: 0,
    plate: '',
    brand: '',
    model: '',
    year: 0,
    color: '',
    selected: true,
    value: 0,
    icon: () => <Icon name="ios-car" size={18} color="#900" />
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
        cars: [],
        carModalVisible: false,
        duration: 0,
        distance: 0,
        show: false,
        loading: true,
        modalVisible: false,
        token: null,
        datetime: Date.now()
    };

    componentDidMount() {
        this.fetchCars();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.loading!==this.state.loading){
            console.log('update');
            this.fetchCars();
        }
    }

    fetchCars = () => {
        AsyncStorage.getItem("user").then( user => {
            user = JSON.parse(user);
            this.setState({token: user.token});

            let config = {
                headers: {
                    "Content-Type": "Application/Json",
                    "Authorization": "JWT "+ user.token
                }
            };
            axios.get(API_HTTP + 'cars/car/', config)
                .then( response => {
                    // console.log(response.data);
                    const cars = [];
                    for (let i = 0; i < response.data.length; i++) {
                        cars.push({
                            label: response.data[i].plate,
                            key: response.data[i].id,
                            plate: response.data[i].plate,
                            brand: response.data[i].brand,
                            model: response.data[i].model,
                            year: response.data[i].year,
                            color: response.data[i].color,
                            selected: i === 0,
                            value: response.data[i].id,
                            icon: () => <Icon name="ios-car" size={18} color="#900" />
                        });
                    }
                    this.setState({
                        cars: cars,
                        loading: false,
                        car: cars[0],
                        // count: response.data.length,
                        // loading: false,
                        // selectedItem: cars[0] // preload the first to modal
                    });
                    // console.log(response);
                }).catch(error=>{

                console.log(error);
            });
        });
    };

    onModalDismiss = () => {
        this.setState({modalVisible:false})
    };

    onModalOpen = () => {
        this.setState({modalVisible:true})
    };

    handleAdd = newCar => {
        console.log(newCar);
        const { cars } = this.state;
        const newData = {
            key: cars[cars.length-1]+1,
            label: newCar.plate,
            plate: newCar.plate,
            model: newCar.model,
            color: newCar.color,
            brand: newCar.brand,
            year: newCar.year,
            value: cars[cars.length-1]+1,
            icon: () => <Icon name="ios-car" size={18} color="#900" />
        };
        console.log(this.state.token);

        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.state.token
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
            cars: [...cars, newData],
        });
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
            time: date.toTimeString(),
            datetime: date
        })
    };

    toggleDatePicker = () => {
        this.setState({show: !this.state.show})
    };

    setDistance(distance, duration) {
        // console.log('setDistance');
        this.setState({
            distance: parseFloat(distance),
            duration: duration
        });
    }

    convertMinsToHrsMins =(mins) => {
        const hours = Math.trunc(mins / 60);
        const minutes = mins % 60;
        console.log(hours +":"+ minutes);
        return (hours +":"+ parseInt(minutes))
    };

    onReady = (result) => {
        console.log(`Distance: ${result.distance} km`);
        console.log(`Duration: ${result.duration/60} hours.`);

        this.setDistance(result.distance, this.convertMinsToHrsMins(result.duration));


        this.mapView.fitToCoordinates(result.coordinates, {
            edgePadding: {
                right: (width / 10),
                bottom: (height / 10),
                left: (width / 10),
                top: (height / 10),
            },
        });

    };

    onError = (errorMessage) => {
        console.log(errorMessage); // eslint-disable-line no-console
    };

    setOrigin = (origin) => {
        this.setState({origin})
    };

    setDestination = (destination) => {
        this.setState({destination})
    };

    onSubmit = () => {
        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        let localISOTime = (new Date(this.state.datetime - tzoffset)).toISOString().slice(0, -1);
        console.log('localISOTime: ', localISOTime);

        const date = localISOTime.toString().split('T')[0];
        console.log('date: ', date);

        const time = localISOTime.toString().split('T')[1].slice(0,-1).split('.')[0];
        console.log('time: ', time);

        const car = {
            plate: this.state.car.plate,
            model: this.state.car.model,
            color: this.state.car.color,
            brand: this.state.car.brand,
            year: this.state.car.year,
            id: this.state.car.key
        };

        const ride = {
            origin: this.state.origin,
            destination: this.state.destination,
            date: date,
            time: time ,
            vacant_seats: this.state.vacant_seats,
            car: car
        };

        let config = {
            headers: {
                "Content-Type": "Application/Json",
                "Authorization": "JWT "+ this.state.token
            }
        };

        axios.post(API_HTTP + 'api/create/', ride, config)
            .then( response => {
                console.log(response.data);

                this.props.navigation.navigate("Rides", {
                    screen: 'Ride',
                    params: {pk: response.data.pk}
                })

            }).catch(error=>{
                console.log(error);
        });
    };

    render() {
        if(this.state.loading && this.state.cars.length===0){return <ActivityIndicator size={'large'}/>}

        return (
            <Container>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}

                >
                    <AddCar onRequestClose={() => { this.onModalDismiss() }} fromAddRide={true} handleAdd={newCar=>this.handleAdd(newCar)}/>
                </Modal>
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
                                        this.setOrigin(data.description)
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
                                        this.setDestination(data.description);
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
                        </View>
                    </View>

                    <View key="1">
                        <View style={{flex:1, flexDirection: 'column',alignItems: 'center', justifyContent: 'space-around'}}>
                            <View style={{alignItems: 'center'}}>
                                <H3>Seats Available</H3>
                                <NumericInput
                                    value={this.state.value}
                                    onChange={value => this.setState({vacant_seats: value})}
                                    onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                    totalWidth={240}
                                    totalHeight={50}
                                    iconSize={25}
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

                            <View style={{alignItems: 'center', marginBottom: 150}}>
                                <H3>Select your car</H3>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <DropDownPicker
                                        items={this.state.cars}
                                        // defaultValue={this.state.cars.length>0 ? this.state.cars[0]: car}
                                        containerStyle={{height: 40, width: 250}}
                                        style={{backgroundColor: '#fafafa'}}
                                        itemStyle={{
                                            justifyContent: 'flex-start'
                                        }}
                                        dropDownStyle={{backgroundColor: '#fafafa'}}
                                        onChangeItem={item => this.setState({car: item})}
                                        searchable={true}
                                        searchablePlaceholder="Search for an item"
                                        searchablePlaceholderTextColor="gray"
                                        seachableStyle={{}}
                                        searchableError={() => <Text>Not Found</Text>}
                                    />
                                    <Button rounded icon transparent large style={{marginLeft: 5}} onPress={()=>this.onModalOpen()}>
                                        <Icon name={'ios-add-circle-outline'} size={36} color="#900"/>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View key="2">
                        <ScrollView>
                            <Card style={{width: Dimensions.get('window').width,}}>
                                <Header noShadow style={{backgroundColor: 'white', }}>
                                    <Body style={{alignItems:'center'}}>
                                        <Title style={{color: 'black'}}>{this.state.origin} to {this.state.destination}</Title>
                                    </Body>
                                </Header>

                                <CardItem style={{justifyContent: 'space-evenly', }}>
                                    <Text note>Date: <Text>{this.state.date}</Text></Text>
                                    <Text note>Time: <Text>{this.state.time}</Text></Text>
                                </CardItem>
                                <CardItem style={{justifyContent: 'space-evenly', }}>
                                    <Text note>Vacant Seats: <Text>{this.state.vacant_seats}</Text></Text>

                                </CardItem>
                                <CardItem style={{justifyContent: 'space-evenly', }}>
                                    <Text note>Estimated Time: <Text>{this.state.duration}</Text></Text>
                                    <Text note>Driving Distance: <Text>{this.state.distance}</Text></Text>
                                </CardItem>

                            </Card>

                            <Card style={{width: Dimensions.get('window').width}}>
                                <CardItem>
                                    <MapView
                                        initialRegion={{
                                            latitude: LATITUDE,
                                            longitude: LONGITUDE,
                                            latitudeDelta: LATITUDE_DELTA,
                                            longitudeDelta: LONGITUDE_DELTA,
                                        }}
                                        style={styles.mapStyle}
                                        ref={c => this.mapView = c} // eslint-disable-line react/jsx-no-bind
                                        onPress={this.onMapPress}
                                    >
                                        <MapViewDirections
                                            origin={this.state.origin}
                                            destination={this.state.destination}
                                            waypoints={[this.state.origin, this.state.destination].slice(1,-1)}
                                            mode='DRIVING'
                                            region='GR'
                                            apikey={GOOGLE_MAPS_APIKEY}
                                            language='en'
                                            strokeWidth={4}
                                            strokeColor="black"
                                            onStart={(params) => {
                                                console.log(`Started routing between "${params.origin}" and "${params.destination}"${(params.waypoints.length ? " using waypoints: " + params.waypoints.join(', ') : "")}`);
                                            }}
                                            onReady={this.onReady}
                                            onError={(errorMessage) => {
                                                console.log(errorMessage);
                                            }}
                                            resetOnChange={false}
                                        />
                                    </MapView>
                                </CardItem>

                            </Card>

                            <Card transparent style={{width: Dimensions.get('window').width, marginBottom: 10}}>
                                <Button info block rounded onPress={()=>this.onSubmit()}>
                                    <Text>Add Ride</Text>
                                </Button>
                            </Card>
                        </ScrollView>

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
    mapStyle: {
        width: Dimensions.get('window').width-40,
        height: 400,
    },
});


export default (AddRide);
