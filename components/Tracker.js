import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import codes from '../codes.json';
import Header from "./Header";
import CountryPicker from "./CountryPicker";
import InfoContainer from "./InfoContainer";

class Tracker extends Component {
    constructor() {
        super();
        this.handleSelectedCountry = this.handleSelectedCountry.bind(this);
        this.state = {
            error: null,
            data: null,
            dataIsLoaded: false,
            countriesIsLoaded: false,
            isSelected: false,
            countries: null,
            selectedSlug: null
        }
        this.requestOptions = {
            method: 'GET',
            redirect: 'follow'
        }
    }

    handleSelectedCountry(slug) {
        this.setState({
            selectedSlug: slug,
            isSelected: true
        });
        let from = "2020-04-01T00:00:00Z";
        let to = "2020-04-20T00:00:00Z";
        this.getData(slug, from, to);
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
        //let url = this.getUrl("2020-01-01", "2020-01-01");
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

    getCountries() {
        console.log("getCountries()");
        fetch("https://api.covid19api.com/countries", this.requestOptions)
            .then(res => res.json())
            .then((result) => {
                    result.sort((a, b) => {
                        if (a.Slug < b.Slug) return -1;
                        if (a.Slug > b.Slug) return 1;
                        return 0;
                    })
                    let countries = [];
                    let keys = Object.keys(result);
                    keys.forEach(i => {
                        countries.push({id: i, name: result[i].Country, slug: result[i].Slug})
                    })
                    this.setState({
                        countriesIsLoaded: true,
                        countries: countries,
                    });
                },
                (error) => {
                    this.setState({
                        countriesIsLoaded: true,
                        error
                    });
                }
            )
    }

    // getData(slug) {
    //     console.log("get()");
    //     let now = this.state.now.toISOString();
    //     //console.log(now);
    //     fetch(`https://api.covid19api.com/country/${slug}?from=2020-04-04T00:00:00Z&to=2020-04-10T00:00:00Z}`,
    //         this.state.requestOptions)
    //         .then(res => res.json())
    //         .then((result) => {
    //                 let data = []
    //                 let keys = Object.keys(result);
    //                 keys.forEach(i => {
    //                     data.push(result);
    //                 })
    //             return data;
    //             },
    //             (error) => {
    //                 this.setState({
    //                     error
    //                 });
    //             }
    //         )
    // }

    getData(slug, from, to) {
        console.log("getData()");
        //let now = this.state.now.toISOString();
        //console.log(now);
        fetch(`https://api.covid19api.com/country/${slug}?from=${from}to=${to}`,
            this.state.requestOptions)
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        dataIsLoaded: true,
                        data: result
                    });
                    console.log(data);
                },
                (error) => {
                    this.setState({
                        dataIsLoaded: true,
                        error
                    });
                }
            )

    }

    componentDidMount() {
        console.log("Tracker componentDidMount");
        this.getCountries();
    }

    render() {
        console.log("Tracker render");
        const { error, data, isSelected, dataIsLoaded, countriesIsLoaded, countries, selectedSlug, selectedCountry, placeholderText} = this.state;
        if (error) {
            return (<Text>Error: {error.message}</Text>);
        } else {
            return (
                <View style={styles.body}>
                    <Header title={"COVID TRACKER"}/>
                    <CountryPicker
                        countries={countries}
                        onSelect={this.handleSelectedCountry}
                    />
                    <InfoContainer isSelected={isSelected} isLoaded={dataIsLoaded} data={data}/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
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