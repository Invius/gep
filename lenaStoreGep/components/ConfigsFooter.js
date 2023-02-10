import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

export default class ConfigsFooter extends Component {
    render() {
        return (
            <View style={styles.fullContainer}>
                <View style={styles.container}>
                    <View style={styles.btn}>
                        <TouchableOpacity onPress={()=>global.globalApp.useSaveCancelConfig(true)} >
                            <Text >Guardar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.btn}>
                        <TouchableOpacity onPress={()=>global.globalApp.useSaveCancelConfig(false)}>
                            <Text >
                                Cancelar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    fullContainer: {
        height: 50,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn:{
        height: 50,
        width: 100,
        borderWidth: 1,
        borderColor: 'rgb(0, 0, 0)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
