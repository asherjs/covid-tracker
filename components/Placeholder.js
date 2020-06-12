import {StyleSheet, Text, View} from "react-native";
import React from "react";

export default function Placeholder(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'rgb(177,177,177)',
        textAlign: 'center',
        fontSize: 32,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(240,240,240)',
    }
});