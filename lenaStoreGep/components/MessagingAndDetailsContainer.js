import {View, Text} from 'react-native';
import React, { Component } from 'react';
import MessagingAndDetailsRow from './MessagingAndDetailsRow';
import { purchase, notifications } from '../utilities/APIRequest';

export default class MessagingAndDetailsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      products: [],
    };

    this.updateProducts = this.updateProducts.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
  }

  componentDidMount() {
    this.updateMessages(this.updateProducts);
    this.updateNotifications();
  }

  updateNotifications(){
    notifications(this.props.saleData.id, this.props.saleData.state);
  }

  updateProducts(){
    global.globalApp.showOverlay();

    purchase(this.props.saleData.id, this.props.saleData.state, 'p').then((products)=>{

        global.globalApp.closeOverlay();
        if (products){
            this.setState({products: products.products});
            //global.globalApp.debug(JSON.stringify(sale));
        } else {
         this.setState({products: []});
       }
      // eslint-disable-next-line handle-callback-err
      }).catch((err)=>{
        global.globalApp.debug(err.toString());
      });
  }

  updateMessages(callback){
    global.globalApp.showOverlay();

    purchase(this.props.saleData.id, this.props.saleData.state, 'c').then((messages)=>{
        global.globalApp.closeOverlay();
        if (messages){
            this.setState({messages: messages.messages});
            //global.globalApp.debug(JSON.stringify(sale));

            if (callback){
              callback();
            }
        } else {
            this.setState({messages: []});
        }

      // eslint-disable-next-line handle-callback-err
      }).catch((err)=>{});
  }

  areProductsLarger(){
    if (!this.state.products && !!this.state.messages){
      return true;
    } else if (!!this.state.products && !this.state.messages){
      return false;
    } else if (!this.state.products && !this.state.messages){
      return null;
    }

    return this.state.products.length > this.state.messages.length;
  }

  getArrayToMap(){
    if (this.areProductsLarger() !== null){
      if (this.areProductsLarger()){
        return this.state.products;
      } else {
        return this.state.messages;
      }
    } else {
      return [];
    }
  }
  render() {
    return (
      <View>
        {
          this.getArrayToMap().map((element, index)=>
                <MessagingAndDetailsRow key={index} index={index} product={this.state.products[index] ?? ''} message={this.state.messages[index] ?? ''}/>
            )
        }
      </View>
    );
  }
}

