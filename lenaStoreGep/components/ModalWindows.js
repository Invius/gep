import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {Popup} from 'react-native-windows';

export default class ModalWindows extends Component {
    render() {
        return (
            <Popup 
                isOpen={!this.props.hidden}>
                <View style={styles.main}>
                    {this.props.children}
                </View> 
            </Popup>
            
        )
    }
}

const styles = StyleSheet.create({
    main:{
        backgroundColor: "#fff",
        height: 500,
        width: 400,
        borderRadius: 5,
        padding: 20
    },
    nativeModal: {
        width: 200, 
        height: 200,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
    },
    plusIMG: {
        width: 30, 
        height: 30, 
        resizeMode: 'contain',
        
    },
    test: {
        width: 100, 
        height: 100,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    }
});