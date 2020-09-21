import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import CountryPicker from "./CountryPicker";
import InfoContainer from "./InfoContainer";
import moment from "moment";

class Tracker extends Component {
    constructor(props) {
        super(props);
        this.handleSelectedCountry = this.handleSelectedCountry.bind(this);
        this.state = {
            error: null,
            data: [],
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
        let from = "2020-01-01T00:00:00Z";
        let to = moment().toDate().toISOString( );
        this.getData(slug, from, to);
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

    getData(slug, from, to) {
        console.log("getData()");
        fetch(`https://api.covid19api.com/country/${slug}?from=${from}&to=${to}`,
            this.state.requestOptions)
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        dataIsLoaded: true,
                        data: result
                    });
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
        const { error, data, isSelected, dataIsLoaded, countries} = this.state;
        if (error) {
            return (<Text>Error: {error.message}</Text>);
        } else {
            return (
                <View style={styles.body}>
                    <CountryPicker
                        countries={countries}
                        onSelect={this.handleSelectedCountry}
                    />
                    <InfoContainer isSelected={isSelected} isLoaded={dataIsLoaded} data={data}/>
                    {
                        isSelected &&
                        <View style={styles.btnDetailsContainer}>
                            <Button
                                title="Details"
                                onPress={() => this.props.navigation.navigate('Details', {data})}
                                color="#ff5d29"
                            />
                        </View>
                    }
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    body: {
        position: 'relative',
        flex: 1,
    },
    total: {
      paddingLeft: 10,
    },
    separator: {
        height: 1,
        backgroundColor: 'black',
    },
    detailsButton: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    btnDetailsContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5
    }
});

export default Tracker;