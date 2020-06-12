import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from "react-native";
import Placeholder from "./Placeholder";
import {StackedBarChart} from "react-native-chart-kit";

export default class InfoContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedCountry: null
        }
    }

    render() {
        console.log("InfoContainer render");
        let data = this.props.data;
        let isLoaded = this.props.isLoaded;
        let isSelected = this.props.isSelected;
        if (!isLoaded && isSelected) {
            return <Placeholder text={"Loading..."}/>
        } else if (isLoaded && data.length === 0) {
            return <Placeholder text={"Data not available"} />
        } else if (isLoaded) {
            let lastIndex = data.length - 1;
            let totalConfirmed = data[lastIndex]['Confirmed'];
            let totalDeaths = data[lastIndex]['Deaths'];
            let totalActive = data[lastIndex]['Active'];
            let country = data[lastIndex]['Country'];
            let graphConst = {

            };
            let chartData = {
                labels: [],
                legend: ['confirmed', 'active', 'deaths'],
                data: [],
                barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
            };
            let i = 0
            data.forEach(e => {
                if(i % 10 === 0) {
                    chartData.labels.push(e.Date.substr(0,9));
                    i = 0
                }
                if(i % 5 === 0) {
                    chartData.data.push([e.Deaths, e.Active, e.Confirmed]);
                }
                i++;
            });
            return (
                <View style={styles.container}>
                    <View style={styles.totalContainer}>
                        <Text>Total confirmed: {totalConfirmed}</Text>
                        <Text>Total deaths: {totalDeaths}</Text>
                        <Text>Total active: {totalActive}</Text>
                        <Text>Country: {country}</Text>
                    </View>

                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1}}
                        ref='_scrollView'
                        onContentSizeChange={() => {this.refs._scrollView.scrollToEnd({animated: true});}}
                        horizontal>
                        <StackedBarChart
                            data={chartData}
                            width={2000}
                            height={700}
                            showLegend={true}
                            chartConfig={{
                                backgroundGradientFrom: "#28e37d",
                                backgroundGradientFromOpacity: 0,
                                backgroundGradientTo: "#07f172",
                                backgroundGradientToOpacity: 0.5,
                                color: (opacity = 1) => `rgba(20, 20, 20, ${opacity})`,
                                strokeWidth: 2, // optional, default 3
                                barPercentage: 1,
                                useShadowColorFromDataset: false // optional
                            }}
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
        top: 0,
        left: 10
    },
});