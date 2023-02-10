import { View, StyleSheet, Button } from 'react-native';
import React, { Component } from 'react';
import OrderRow from './OrderRow';
import {newPurchases, finilizedPurchases, oldPurchases} from '../utilities/APIRequest';

export default class SalesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type || '',
      sales: [],
      forceUpdate: '',
      updateInterval: null,
    };

    this.updateByType = this.updateByType.bind(this);
  }

  componentDidMount() {
    this.updateByType(true);

    const intervalID = setInterval(()=>{
      this.updateByType(false);
    }, 10000);

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      updateInterval: intervalID,
    });
  }

  componentWillUnmount(){
    clearInterval(this.state.updateInterval);
  }

  updateByType(hasOverlay){
    switch (this.state.type){
      case 'new':
          this.getNewPurchases(hasOverlay);
        break;
        case 'final':
          this.getFinilizedPurchases(hasOverlay);
        break;
        case 'old':
          this.getOldPurchases(hasOverlay);
        break;
    }
  }

  componentDidUpdate(){
    if (this.state.forceUpdate != this.props.forceUpdate || this.state.type != this.props.type){

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        forceUpdate: this.props.forceUpdate,
        type: this.props.type,
        sales:[],
      }, ()=>{
        this.updateByType(true);
      });
    }
  }

  getNewPurchases(hasOverlay){
    hasOverlay && global.globalApp.showOverlay();

    newPurchases().then((sales)=>{
      hasOverlay && global.globalApp.closeOverlay();
        if (sales && sales.length >= 0){
            this.setState({sales});
            //Alert.alert(this.props.type + ' -new- : ' + JSON.stringify(sales));
        } else {
         this.setState({sales: []});
       }

      // eslint-disable-next-line handle-callback-err
      }).catch((err)=>{});
  }

  getFinilizedPurchases(hasOverlay){
    hasOverlay && global.globalApp.showOverlay();

    finilizedPurchases().then((sales)=>{
      hasOverlay && global.globalApp.closeOverlay();
        if (sales && sales.length >= 0){
            this.setState({sales});
           // Alert.alert(this.props.type + ' -final- : ' + JSON.stringify(sales));
        } else {
         this.setState({sales: []});
       }

      // eslint-disable-next-line handle-callback-err
      }).catch((err)=>{});
  }

  getOldPurchases(hasOverlay){
    hasOverlay && global.globalApp.showOverlay();

    oldPurchases().then((sales)=>{
      hasOverlay && global.globalApp.closeOverlay();
        if (sales && sales.length >= 0){
            this.setState({sales});
            //Alert.alert(this.props.type + ' -old- : ' + JSON.stringify(sales));
        } else {
         this.setState({sales: []});
       }

      // eslint-disable-next-line handle-callback-err
      }).catch((err)=>{});
  }

  forceUpdate(){
    this.setState({sales: []});
    this.updateByType(true);
  }

  render() {
    return (
      <View style={styles.margins}>
        <Button onPress={()=>this.forceUpdate()} title="Actualizar Lista" />
        {
          this.state.sales.map((sale, index)=>
            <View key={index}>
                <OrderRow isLastRow={index == (this.state.sales.length - 1)} isFirstRow={index == 0} id={sale} type={this.state.type}/>
            </View>)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
   margins: {
    marginBottom: 100,
    marginTop: 60,
   },
});

