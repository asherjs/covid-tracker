import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import Tracker from "./components/Tracker";
import Details from "./components/Details";

const Stack = createStackNavigator();

class App extends Component {
    constructor(props) {
        super(props);
        this.screenOptions = {
            title: 'COVID Tracker',
            headerStyle: {
                backgroundColor: '#ff5d29',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }


    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name={"Home"}
                        component={Tracker}
                        options={{
                            title: 'COVID Tracker',
                            headerStyle: {
                                backgroundColor: '#ff5d29',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                    <Stack.Screen
                        name={"Details"}
                        component={Details}
                        options={{
                            title: 'Details',
                            headerStyle: {
                                backgroundColor: '#ff5d29',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>

        );
    }
}

const styles = StyleSheet.create({
});

export default App;