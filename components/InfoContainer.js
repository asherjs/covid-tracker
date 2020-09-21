import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, processColor, AppRegistry} from "react-native";
import Placeholder from "./Placeholder";
import {LineChart} from 'react-native-charts-wrapper';

export default class InfoContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedCountry: null
        }
    }

    render() {
        console.log("InfoContainer render");
        let isLoaded = this.props.isLoaded;
        let isSelected = this.props.isSelected;
        if (!isLoaded && isSelected) {
            return <Placeholder text={"Loading..."}/>
        } else if (isLoaded && this.props.data.length === 0) {
            return <Placeholder text={"Data not available"} />
        } else if (isLoaded) {
            let data = this.props.data;
            let lastIndex = data.length - 1;
            let totalConfirmed = data[lastIndex]['Confirmed'];
            let totalDeaths = data[lastIndex]['Deaths'];
            let totalActive = data[lastIndex]['Active'];
            let country = data[lastIndex]['Country'];

            let confirmedData = {
                label: "Confirmed",
                config: {
                    color: processColor('teal'),
                    circleColor: processColor('teal'),
                },
                values: []
            }
            let deathsData = {
                label: "Deaths",
                config: {
                    color: processColor('rgb(255,0,0)'),
                    circleColor: processColor('rgb(255,0,0)'),
                },
                values: []
            }
            let activeData = {
                label: "Active",
                config: {
                    color: processColor('rgb(255,155,80)'),
                    circleColor: processColor('rgb(255,155,80)'),
                },
                values: []
            }

            let xAxis = {
                valueFormatter: [],
            }

            data.forEach(e => {
                xAxis.valueFormatter.push(e.Date.substr(0,10));
                confirmedData.values.push({y: e.Confirmed});
                deathsData.values.push({y: e.Deaths});
                activeData.values.push({y: e.Active})
            })

            return (
                <View style={styles.container}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total confirmed: {totalConfirmed}</Text>
                        <Text style={styles.totalText}>Total deaths: {totalDeaths}</Text>
                        <Text style={styles.totalText}>Total active: {totalActive}</Text>
                    </View>

                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1}}
                        ref='_scrollView'
                        onContentSizeChange={() => {this.refs._scrollView.scrollToEnd({animated: true});}}
                        horizontal>
                        <LineChart
                            chartDescription={{text: ''}}
                            style={{width: 2000}}
                            xAxis={xAxis}
                            data={{ dataSets:[confirmedData, deathsData, activeData] }}
                        />
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View />
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    totalContainer: {
        position: 'absolute',
        padding: 3,
        backgroundColor: 'rgba(40, 40, 40, 0.6)',
        zIndex: 100,
        top: 0,
        left: 10,
        borderRadius: 5
    },
    totalText: {
        color: 'white',
        zIndex: 100,
    }
});