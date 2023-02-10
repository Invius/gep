import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function WarningNextStateModal(props) {
  return (
    <View style={styles.modal}>
        <Text style={styles.text}>{props.text}</Text>
        <View style={styles.container}>
          <View style={styles.space}>
            <Button onPress={global.globalApp.nextActionState} title="Executar"/>
          </View>
          <View style={styles.space}>
            <Button onPress={global.globalApp.closeModal} title="Cancelar"/>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'row',
   marginTop: 60,
   justifyContent: 'center',
  },
  modal: {
    marginTop: 32,
  },
  text: {
    textAlign: 'center',
  },
  space: {
    margin: 10,
  },
});
