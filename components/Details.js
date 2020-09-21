import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';

function Details({route, navigation}) {
    const data = route.params.data.sort((a, b) => {
        if (a.Date < b.Date) {
            return 1;
        }
        if (a.Date > b.Date) {
            return -1;
        }
        return 0;
    })

    return (
        <ScrollView>
            {
                data.map(i => {
                    return (
                        <View style={styles.tile}>
                            <View style={styles.dateContainer}>
                                <Text style={styles.date}>{i.Date.substr(0, 10)}</Text>
                            </View>
                            <View style={styles.statsContainer}>
                                <Text style={styles.stat}>Confirmed: {i.Confirmed}</Text>
                                <Text style={styles.stat}>Deaths: {i.Deaths}</Text>
                                <Text style={styles.stat}>Active: {i.Active}</Text>
                            </View>
                        </View>);
                })
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
        borderBottomWidth: 1,
        borderColor: 'rgb(255,214,214)'
    },
    dateContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    date: {
        color: 'rgb(100,100,100)',
        fontWeight: 'bold',
        fontSize: 16
    },
    statsContainer: {
        paddingLeft: 10,
        flex: 3
    },
    stat: {
        fontSize: 14,
    }
});

export default Details;