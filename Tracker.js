import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import codes from './codes.json';
import RNPicker from "rn-modal-picker";

class Tracker extends Component {
    constructor() {
        super();
        this.state = {
            now: moment().format('YYYY-MM-DD'),
            json: null,
            isLoaded: false,
            //isInitialized: false,
            indexedCodes: null,
            placeHolderText: "Please select country",
            selectedCountry: null
        }
    }

    _selectedValue(index, item) {
        this.setState({ selectedCountry: item.name });
    }

    getUrl(firstDate, secondDate) {
        return `https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/${firstDate}/${secondDate}`;
    }

    getIndexedCodes() {
        let indexedCodes = [];
        let key = Object.keys(codes);
        key.forEach(i => {
            indexedCodes.push({id: i, name: codes[i]});
        })
        this.setState({
            indexedCodes: indexedCodes,
            //isInitialized: true
        });
    }

    getCountryNames() {
        let result = [];
        let keys = Object.keys(codes);
        keys.forEach(i => {
            result.push({id: i, name: codes[i].name});
        })
        //console.log(result);
        this.setState({flatCodes: result});
    }

    getCountryCodes() {
        let url = this.getUrl("2020-01-01", "2020-01-01");
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        codesIsLoaded: true,
                        countryCodes: result.countries
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
    }

    getData() {
        let url = this.getUrl("2020-01-01", this.state.now);
        fetch(url)
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        isLoaded: true,
                        json: result,
                    });
                    console.log(result);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    totalAmount(countryData) {
        console.log("totalAmount");
        if (countryData.length !== 0) {
            let lastDefinedDataIndex = countryData.length-1;
            let lastDeaths = null;
            let lastConfirmed = null;
            while(lastDefinedDataIndex >= 0) {
                console.log(1);
                let currentData = countryData[lastDefinedDataIndex];
                if (currentData === undefined) {
                    lastDefinedDataIndex -= 1;
                    continue;
                }
                if (currentData.confirmed !== null)
                    lastConfirmed = currentData.confirmed;
                if (currentData.deaths !== null)
                    lastDeaths = currentData.deaths;
                console.log("lastDeaths: " + lastDeaths)
                console.log("lastConfirmed: " + lastConfirmed);
                if (lastDeaths !== null && lastConfirmed !== null) break;
                lastDefinedDataIndex -= 1;
            }

            return (
                <View style={styles.total}>
                    <Text>Total confirmed: {lastConfirmed}</Text>
                    <Text>Total deaths: {lastDeaths}</Text>
                </View>
            )
        } else if (this.state.selectedCountry !== null){
            return (
                <View style={styles.total}>
                    <Text>Loading...</Text>
                </View>
            )
        }
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.getData();
        this.getIndexedCodes();
    }

    render() {
        console.log("render");
        const { error, isLoaded, isInitialized, indexedCodes, selectedCountry, placeholderText} = this.state;
        if (error) {
            return (<Text>Error: {error.message}</Text>);
        } else {
            let countryData = [];
            if (selectedCountry !== null && isLoaded) {
                let keys = Object.keys(this.state.json.data);
                let selectedName = this.state.selectedCountry;
                keys.forEach(i => {
                    let record = this.state.json.data[i][selectedName];
                    countryData.push(record);
                });
            }
            console.log(countryData);

            return (
                <View style={styles.body}>
                    <Text style={styles.headerText}>COVID TRACKER</Text>
                    <View style={styles.countryContainer}>
                        <RNPicker
                            dataSource={indexedCodes}
                            dummyDataSource={indexedCodes}
                            selectedLabel={selectedCountry}
                            pickerTitle={"Country picker"}
                            showPickerTitle={true}
                            showSearchBar={true}
                            placeHolderLabel={placeholderText}
                            defaultValue={false}
                            pickerStyle={styles.countryPicker}
                            selectedValue={(index, item) => this._selectedValue(index, item)}
                        />
                    </View>
                    {this.totalAmount(countryData)}
                    <ScrollView horizontal>
                        {
                            // flatData.map(i => {
                            //     let confirmed;
                            //     if (i !== undefined && i.confirmed !== null) {
                            //         confirmed = i.confirmed;
                            //     } else {
                            //         confirmed = 0;
                            //     }
                            //     return <View style={{height: confirmed/1000, width: 10, backgroundColor: 'black', marginLeft: 2}}></View>
                            // })
                        }
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'rgb(248,248,248)',
    },
    headerText: {
        backgroundColor: 'rgb(101,101,101)',
        color: 'white',
        textAlign: 'center',
        fontSize: 32,
    },
    countryContainer: {
        padding: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    countryPicker: {
        marginLeft: 18,
        elevation:3,
        paddingRight: 25,
        marginRight: 10,
        marginBottom: 2,
        shadowOpacity: 1.0,
        shadowOffset: {
            width: 1,
            height: 1
        },
        borderWidth:1,
        shadowRadius: 10,
        borderColor: "rgb(201,201,201)",
        backgroundColor: "rgba(255,255,255,1)",
        shadowColor: "#d3d3d3",
        borderRadius: 5,
        flexDirection: "row"
    },
    total: {
      paddingLeft: 10,
    },
    separator: {
        height: 1,
        backgroundColor: 'black',
    }
});

export default Tracker;