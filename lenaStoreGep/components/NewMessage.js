import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { comment } from '../utilities/APIRequest';

export default class NewMessage extends Component {
    constructor(props) {
      super(props);

      this.state = {
         message: props.message,
         newMessage: '',
      };
    }

    render() {
        return (
            <View>
                <Text>Nova mensagem</Text>
                <TextInput editable={false} multiline={true} value={this.state.message}/>
                <TextInput
                    multiline={true}
                    placeholder="Introduza a sua mensagem aqui!"
                    value={this.state.newMessage}
                    onChangeText={(value)=> this.setState({newMessage: value})}
                    />
                <View style={styles.container}>
                    <TouchableOpacity
                        disabled={this.state.newMessage === ''}
                        onPress={()=>{
                            const prevMessage = this.state.message ? `Citação: ${(this.state.message.split('Citação: ').join('')).substring(0, 15)}...` : ''; 
                            global.globalApp.showOverlay();
                            comment(this.props.saleData.id, this.props.saleData.state,
                                 `${prevMessage}
${this.state.newMessage}`
                                 ).then((result)=>{
                                    global.globalApp.closeOverlay();
                                    if (result){
                                        global.globalApp.openModal('purchaseDetails');
                                        global.globalApp.openAlert('Mensagem enviada!');
                                    }
                                // eslint-disable-next-line handle-callback-err
                            }).catch((err)=>{});
                        }}>
                        <View style={[styles.button, styles.margin]}>
                            <Text>
                                Responder
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{global.globalApp.openModal('purchaseDetails')}}>
                        <View style={styles.button}>
                            <Text>
                                Cancelar
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 30,
        flex: 1,
        flexDirection: 'row',
    },
    button:{
        borderWidth: 1,
        borderColor: "#999",
        padding: 5
    },
    margin:{
        marginRight: 10
    }
});
