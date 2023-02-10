import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { Component } from 'react';
import {purchase, changeStatePurchase, salesRemove} from '../utilities/APIRequest';



export default class OrderRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
       id: props.id,
       sale: this.getEmptySale(),
       type: props.type,
    };

    this.nextAction = this.nextAction.bind(this);
    this.openDetails = this.openDetails.bind(this);
    this.remove = this.remove.bind(this);
  }


  componentDidMount(){
    this.updateSale();
  }

  componentDidUpdate(){
    if (this.state.type != this.props.type || (this.state.id != this.props.id && this.props.id)){
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        type: this.props.type,
        id: this.props.id,
      }, ()=>{
        this.updateSale();
      });
    }
  }

  updateSale(){
    global.globalApp.showOverlay();

    purchase(this.state.id, this.getStateByType(), 'd').then((sale)=>{
        global.globalApp.closeOverlay();
        if (sale){
            this.setState({sale});
            //global.globalApp.debug(JSON.stringify(sale));
        } else {
         this.setState({sale: this.getEmptySale()});
       }


      // eslint-disable-next-line handle-callback-err
      }).catch((err)=>{});
  }

  getStateByType(){
    switch (this.state.type){
      case 'new':
        return 'newPurchases';
      case 'final':
        return 'finilized';
      case 'old':
        return 'old';
      default:
        return '';
    }
  }


  getEmptySale(){
    return {
      id: '',
      name: '',
      phone: '',
      address: '',
      priceTotal: '',
      date: '',
      state:'',
    };
  }

  getPortugueseState(state){
    switch (state){
      case 'newPurchases':
        return 'Nova';
      case 'toPay':
        return 'Por pagar';
      case 'payed':
          return 'Pago';
      case 'finilized':
      case 'finalized':
          return 'Finalizada';
      case 'old':
          return 'Antiga';
      default:
         return 'Indefinida';
    }
  }

  getNextStateModal(state){
    switch (state){
      case 'newPurchases':
        return 'nextPay';
      case 'toPay':
        return 'nextPayed';
      case 'payed':
          return 'nextFinalized';
      case 'finilized':
      case 'finalized':
          return 'nexOld';
      case 'old':
          return 'nextPay';
      default:
         return '_';
    }
  }


  nextAction(){
    global.globalApp.showOverlay();

    changeStatePurchase(this.state.id, this.state.sale.state).then((state)=>{
        global.globalApp.closeOverlay();
        if (state){
          this.updateSale();
          global.globalApp.refreshForce();
          global.globalApp.closeModal();
          global.globalApp.openAlert('Estado mudado!');
          //global.globalApp.debug(JSON.stringify(sale));
        }

      // eslint-disable-next-line handle-callback-err
      }).catch((err)=>{});
  }

  remove(){
    global.globalApp.showOverlay();

    salesRemove(this.state.id, this.state.sale.state).then((state)=>{
        global.globalApp.closeOverlay();
        if (state){
          global.globalApp.refreshForce();
          global.globalApp.closeModal();
          global.globalApp.openAlert('Apagada!');
          //global.globalApp.debug(JSON.stringify(sale));
        }

      // eslint-disable-next-line handle-callback-err
      }).catch((err)=>{});
  }

  openDetails(){
    global.globalApp.saleForModal({id: this.state.id, state: this.state.sale.state});
    global.globalApp.openModal('purchaseDetails');
  }

  render() {
    return (
      <View style={styles.fullRow}>
        <View style={[styles.container, styles.containerTop, this.state.sale.hasNotifications ? styles.alert : styles.normal]}>
            <View style={[styles.elementRow, this.state.sale.hasNotifications ? styles.alert : styles.innerNormal]}>
              <TouchableOpacity onPress={this.openDetails}>
                <Text style={styles.elementRowText}> {this.state.sale.name}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.elementRow, this.state.sale.hasNotifications ? styles.alert : styles.innerNormal]}>
              <TouchableOpacity onPress={this.openDetails}>
                <Text style={styles.elementRowText}> {this.state.sale.address}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.elementRow, this.state.sale.hasNotifications ? styles.alert : styles.innerNormal]}>
              <TouchableOpacity onPress={this.openDetails}>
                <Text style={styles.elementRowText}>{'TLM: ' + this.state.sale.phone}</Text>
                <Text style={styles.elementRowText}>{this.state.sale.NIF ? ('NIF: ' + this.state.sale.NIF) : ''}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.elementRow, this.state.sale.hasNotifications ? styles.alert : styles.innerNormal]}>
              <TouchableOpacity onPress={()=>{
                global.globalApp.openModalWarning('delete', ()=>{this.remove();});}
              }>
                <Text style={styles.elementRowText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View style={[styles.container, styles.containerBottom, this.state.sale.hasNotifications ? styles.alert : styles.normal]}>
            <View style={[styles.elementRow, this.state.sale.hasNotifications ? styles.alert : styles.innerNormal]}>
              <TouchableOpacity onPress={this.openDetails}>
                <Text style={styles.elementRowText}>{this.state.sale.id}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.elementRow, this.state.sale.hasNotifications ? styles.alert : styles.innerNormal]}>
              <TouchableOpacity onPress={this.openDetails}>
                <Text style={styles.elementRowText}>{this.state.sale.priceTotal + '€'}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.elementRow, this.state.sale.hasNotifications ? styles.alert : styles.innerNormal]}>
              <TouchableOpacity onPress={this.openDetails}>
              <Text style={styles.elementRowText}>{new Date(this.state.sale.date).toLocaleDateString('pt-PT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.elementRow, this.state.sale.hasNotifications ? styles.alert : styles.innerNormal]}>
              <TouchableOpacity onPress={()=>{
                    global.globalApp.openModalWarning(this.getNextStateModal(this.state.sale.state), ()=>{this.nextAction();});
                    }}>
                <Text style={styles.elementRowText}>{this.getPortugueseState(this.state.sale.state)}</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
     fullRow : {
      borderWidth: 1,
      borderRadius: 1,
     },
     container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
     },
     normal: {
      backgroundColor: '#fceded',
     },
     innerNormal: {
      backgroundColor: '#ffcccc',
     },
     alert: {
      backgroundColor: '#fc7c7c',
     },
     containerTop : {
      paddingTop: 10,
     },
     containerBottom : {

      paddingBottom: 10,
     },
     elementRow : {
      width: 200,
      borderWidth: 1,
      borderRadius: 1,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
     },
     elementRowText: {
      textAlign: 'center',
     },
     testIMG: {
      width: 50,
      height: 30,
      resizeMode: 'contain',
     }
})