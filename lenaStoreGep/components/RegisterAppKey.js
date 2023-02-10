import React, {useState} from 'react';
import { Text, View, TextInput, StyleSheet, Button, Alert } from 'react-native';
import {checkAppKey} from '../utilities/APIRequest';
import {AppKey} from '../utilities/Constants';
import { Storage } from  '../utilities/LocalStorage';

export default function RegisterAppKey() {

    const [key, setKey] = useState('');

    const tryToRegisterKey = () =>{
        global.globalApp.showOverlay();

        checkAppKey(key).then((result)=>{
            global.globalApp.closeOverlay();
            if (result === true){
                Storage.setItem(AppKey, key);
                global.globalApp.closeModal();
                global.globalApp.updateCategories();
            } else {
                global.globalApp.openAlert('Chave não existe!');
            }

        // eslint-disable-next-line handle-callback-err
        }).catch((err)=>{});
    }

  return (<View style={styles.container}>
            <Text>
                Registe a sua App
            </Text>
            <TextInput placeholder="Código" style={styles.input} onChangeText={setKey} />
            <Button
                title="Activar"
                onPress={() => tryToRegisterKey()}
      />
        </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
    },
    input:{
        marginTop: 10,
        marginBottom: 10,
        height: 35,
    },
});
