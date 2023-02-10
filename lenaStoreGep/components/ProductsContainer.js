import { View, StyleSheet  } from 'react-native';
import React, { Component } from 'react';
import ProductRow from './ProductRow';
import {productsByCategory, productsOutOfSale} from '../utilities/APIRequest';

export default class ProductsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      categories: [],
      updatedCategory: '',
      forceUpdate: '',
    };
  }

  componentDidMount() {

    if (this.props.isOldProducts){
      this.getProductsOutSale();
    } else {
      this.getProductsFromCategory(this.props.category);
    }

  }

  componentDidUpdate(){
    if (this.props.category != this.state.updatedCategory || this.state.forceUpdate != this.props.forceUpdate){

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        updatedCategory: this.props.category,
        forceUpdate: this.props.forceUpdate,
      });
      if (this.props.isOldProducts){

        this.getProductsOutSale();
      } else {
        this.getProductsFromCategory(this.props.category);
      }
    }
  }

  getProductsFromCategory(category){
    global.globalApp.showOverlay();

    try {
      productsByCategory(category).then((products)=>{
         global.globalApp.closeOverlay();
         if (products && products.length >= 0){
           this.setState({products});
        } else {
           this.setState({products: []});
         }
       // eslint-disable-next-line handle-callback-err
       }).catch((err)=>{});
    } catch (err){
      global.globalApp.showOverlay();
    }
  }

  getProductsOutSale(){
    global.globalApp.showOverlay();

     productsOutOfSale().then((products)=>{
         global.globalApp.closeOverlay();
         if (products && products.length >= 0){
             this.setState({products});
         } else {
          this.setState({products: []});
        }

       // eslint-disable-next-line handle-callback-err
       }).catch((err)=>{});

    }


  render() {
    return (
      <View style={styles.margins}>

          {
            this.state.products.map((product, index) =>(
            <View key={index}>
                <ProductRow
                  isOldProducts={this.props.isOldProducts}
                  isLastRow={index == (this.state.products.length - 1)}
                  isFirstRow={index == 0}
                  product={product}
                  forceUpdate={this.state.forceUpdate}
                  />
            </View>))
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
