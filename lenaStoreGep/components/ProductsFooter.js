import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, TouchableOpacity, Alert } from 'react-native';

export default class ProductsFooter extends Component {
    constructor(props) {
        super(props);

        this.state = {
             selectedProductType: this.props.productTypes[0],
        };

        this.productTypeChanged = this.productTypeChanged.bind(this);
    }


    productTypeChanged(value){
        this.setState({
            selectedProductType: value,
        });
        global.globalApp.changeSelectedCategory(value);
    }

    render() {
        return (
            <View style={styles.fullContainer}>
                <View style={styles.container}>
                    <View style={styles.elementRow}>
                        <Picker
                            onValueChange={this.productTypeChanged}
                            selectedValue={ this.state.selectedProductType}>
                            {this.props.productTypes.map(
                                (type)=>{
                                    return (
                                        <Picker.Item key={type} label={type} value={type}/>
                                    );
                                }
                            )}
                        </Picker>
                    </View>
                    <View style={styles.elementRow}>
                                <TouchableOpacity onPress={()=>{
                                        global.globalApp.setIsNewProduct(false, {});
                                        global.globalApp.openModal('newProduct');
                                    }}>
                                    <Text>
                                        Adicionar
                                    </Text>
                                </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
    },
    elementRow:{
        height: 60,
        width: 200,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: "center"
    },
    fullContainer:{
        height: 60,
    }

});
