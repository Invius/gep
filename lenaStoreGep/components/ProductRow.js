import { Text, View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import React, { Component } from 'react';

import {photo, changeStateProduct, removeProduct} from '../utilities/APIRequest';

export default class ProductRow extends Component {
    constructor(props) {
      super(props);

      this.state = {
        productImage64: '',
        id: '',
        category: '',
        forceUpdate: '',
      };

      this.productMoveToOutOfSale = this.productMoveToOutOfSale.bind(this);
      this.productMoveToSale = this.productMoveToSale.bind(this);
      this.productToRemove = this.productToRemove.bind(this);
    }



    componentDidMount() {
        this.updatePicture();
     }

     componentDidUpdate(){
        if (this.props.product.id !== this.state.id || 
              this.props.product.category != this.state.category ||
              this.props.forceUpdate != this.state.forceUpdate){
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                id: this.props.product.id,
                category: this.props.product.category,
                forceUpdate: this.props.forceUpdate,
              });
              this.updatePicture();
        }
     }

     updatePicture(){
        global.globalApp.showOverlay();

        photo(this.props.product.id, this.props.product.category, this.props.isOldProducts).then((img64)=>{
           global.globalApp.closeOverlay();
           if (img64 && img64.length >= 0){
             this.setState({
                productImage64: img64,
              });
           }
         // eslint-disable-next-line handle-callback-err
         }).catch((err)=>{});
     }


     productMoveToOutOfSale(){
        global.globalApp.showOverlay();

        changeStateProduct(this.props.product.id, this.props.product.category, false).then((result)=>{
            global.globalApp.closeOverlay();
            if (result){
              global.globalApp.updateCategories();
              global.globalApp.openAlert(`Sucesso: ${result}`);
            }
          // eslint-disable-next-line handle-callback-err
          }).catch((err)=>{});
     }

     productMoveToSale(){
        global.globalApp.showOverlay();

        changeStateProduct(this.props.product.id, this.props.product.category, true).then((result)=>{
            global.globalApp.closeOverlay();
            if (result){
              global.globalApp.updateCategories();
              global.globalApp.openAlert(`Sucesso: ${result}`);
            }
          // eslint-disable-next-line handle-callback-err
          }).catch((err)=>{});
     }

     productToRemove(){
        global.globalApp.showOverlay();

        removeProduct(this.props.product.id, this.props.product.category).then((result)=>{
            //global.globalApp.debug(`${JSON.stringify(result)}`);
            global.globalApp.closeOverlay();
            if (result){
              global.globalApp.updateCategories();
              global.globalApp.openAlert(`Sucesso: ${result}`);
            }
          // eslint-disable-next-line handle-callback-err
          }).catch((err)=>{});
     }



     /* get image by url 37:59

     <TouchableOpacity hidden={this.props.isOldProducts}>
                                <Image source={{ uri: "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/7.1.0/png/iconmonstr-error-filled.png&r=0&g=0&b=0"}}
                                    style={styles.plusIMG}/>
                             </TouchableOpacity>
     */
  render() {

     const elementAddButton = <TouchableOpacity onPress={this.productMoveToSale}>
                                <Image source={{ uri: 'ms-appx:///Images/plus.png'}}
                                style={styles.lessIMG}/>
                            </TouchableOpacity>;

    const addButton = this.props.isOldProducts ?
                            elementAddButton : <View/>;

                           /* 1{this.props.product.photo}*/

    return (
        <View style={styles.fullRow}>
            <View style={[styles.container, styles.containerTop]}>
              <TouchableOpacity onPress={()=>{
                global.globalApp.showOverlay();
                setTimeout(()=>{
                  global.globalApp.setIsNewProduct(true, {
                    ...this.props.product,
                    img64: this.state.productImage64,
                    isOnSale: !this.props.isOldProducts,
                  });
                  global.globalApp.openModal('newProduct');
                }, 100);
              }}>
                <View style={styles.rowProduct}>
                  <View style={styles.elementRow}>
                      <View style={ styles.photoSize}>
                          {
                              this.state.productImage64 != '' ?
                              <Image source={{
                                      uri: 'data:image/jpg;base64,' + this.state.productImage64,
                                      }}
                                  style={styles.productImage}/> :
                              <Text>
                                  Photo
                              </Text>
                          }
                      </View>
                  </View>
                  <View style={styles.elementRow}>
                      <Text style={styles.elementRowText}>{this.props.product.name}</Text>
                      <Text style={styles.elementRowText}>{this.props.product.description.substring(0, 20) + '...'}</Text>
                  </View>
                  <View style={styles.elementRow}>
                      <Text style={styles.elementRowText}>{this.props.product.price + '€'}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.lastElementRow}>
                  {addButton}
                  <TouchableOpacity onPress={this.props.isOldProducts ? this.productToRemove : this.productMoveToOutOfSale}>
                      <Image source={{ uri: 'ms-appx:///Images/less.png'}}
                      style={styles.lessIMG}/>
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
    photoSize:{
        height: '100%',
        width: '100%',
    },
    container: {
     backgroundColor: '#f3fced',
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
    },
    rowProduct:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    containerTop : {
     paddingTop: 10,
     paddingBottom: 10,
    },
    elementRow : {
     width: 200,
     backgroundColor: '#d1ffcc',
     borderWidth: 1,
     borderRadius: 1,
     height: 60,
     justifyContent: 'center',
    },
    lastElementRow : {
     width: 200,
     height: 60,
     justifyContent: 'center',
     alignItems: 'center',
    },
    elementRowText: {
     textAlign: 'center',
    },
    lessIMG: {
     width: 50,
     height: 15,
     resizeMode: 'contain',
    },
    plusIMG: {
     width: 50,
     height: 30,
     resizeMode: 'contain',
    },
    productImage: {
     width: '100%',
     height: '100%',
     resizeMode: 'contain',
    },

});
