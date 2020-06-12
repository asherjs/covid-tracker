import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import RNPicker from "rn-modal-picker";

export default class CountryPicker extends Component{
    constructor(props) {
        super(props);
        this._selectedValue = this._selectedValue.bind(this);
        this.state = {
            selectedCountry: null
        }
    }

    _selectedValue(index, item) {
        let slug = item.slug;
        let country = item.name;
        this.props.onSelect(slug)
        this.setState({selectedCountry: country})
    }

    render() {
        const countries = this.props.countries;
        const selectedCountry = this.state.selectedCountry;
        return (
            <View style={styles.container}>
                <RNPicker
                    dataSource={countries}
                    dummyDataSource={countries}
                    selectedLabel={selectedCountry}
                    pickerTitle={"Select country"}
                    showPickerTitle={true}
                    showSearchBar={true}
                    placeHolderLabel={"Select country please"}
                    defaultValue={false}
                    pickerStyle={styles.picker}
                    selectedValue={(index, item) => this._selectedValue(index, item)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    picker: {
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
});