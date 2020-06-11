import {StyleSheet, Text, View} from "react-native";
import React from "react";

export default function Header(props) {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 32,
    },
    header: {
        flex: 1,
        backgroundColor: 'green',
    }
});