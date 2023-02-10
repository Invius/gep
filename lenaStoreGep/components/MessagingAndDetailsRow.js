import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';

export default class MessagingAndDetailsRow extends Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={[styles.elementRow, (this.props.message.sender ?
                (this.props.message.sender == 's' ? styles.vendorColor : styles.clientColor)
                : styles.noItemColor)]}>

          <TouchableOpacity onPress={()=> {
              if (this.props.message.message || this.props.index === 0){
                global.globalApp.clickedMessage('');
                global.globalApp.openModal('newMessage');
              }
            }}>
            <Text style={styles.elementRowText}>
              {
                !this.props.message.message && this.props.index === 0 ?
                  'Inicie a conversa'
                  : (this.props.message.message ?
                    this.props.message.message :
                    '---')
              }
            </Text>
          </TouchableOpacity>
          </View>
          <View style={[styles.elementRow, styles.productColor]}>
            <Text style={styles.elementRowText}>
              {
                this.props.product.name ?
                this.props.product.name + '\nCategoria: \n' + this.props.product.category :
                  '---'
              }
            </Text>
          </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     backgroundColor: '#fceded',
    },
    elementRow : {
     width: 180,
     borderWidth: 1,
     borderRadius: 1,
     minHeight: 60,
     justifyContent: 'center',
    },
    productColor:{
      backgroundColor: '#ccccff',
    },
    vendorColor:{
      backgroundColor: '#ffccfc',
    },
    clientColor:{
      backgroundColor: '#ccfff7',
    },
    noItemColor:{
      backgroundColor: '#fff',
    },
    elementRowText: {
     textAlign: 'center',
    }
})