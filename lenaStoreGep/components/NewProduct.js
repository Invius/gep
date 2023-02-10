import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Picker,
  Image,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { createProduct, editProduct, testOnline } from '../utilities/APIRequest';

export default class NewProduct extends Component {

    constructor(props) {
        super(props);

        this.state = {
             selectedProductType: this.props.productToEdit.hasToEdit ?
                                    this.props.productToEdit.product.category :
                                    (this.props.productTypes &&
                                    this.props.productTypes[0] ?
                                    this.props.productTypes[0] : ''),
             productImage64: this.props.productToEdit.hasToEdit ? this.props.productToEdit.product.img64 : '',
             price: this.props.productToEdit.hasToEdit ?
                    this.props.productToEdit.product.price.toString().replace('.', ',') : '',
             name: this.props.productToEdit.hasToEdit ? this.props.productToEdit.product.name : '',
             category: '',
             description: this.props.productToEdit.hasToEdit ? this.props.productToEdit.product.description : '',
             isSameProduct: true,
        };

        this.productTypeChanged = this.productTypeChanged.bind(this);
    }

    componentDidMount(){
        global.globalApp.closeOverlay();
    }

    productTypeChanged(value){
        this.setState({
            selectedProductType: value,
            isSameProduct: this.props.productToEdit.hasToEdit ?
                value === this.props.productToEdit.product.category && this.state.category === '' : true,
        });
    }

   async activatePickerByPlatform(platform){

        switch (platform){
            case 'windows':
                try {
                    const pickerResult = await DocumentPicker.pickSingle({readContent: true});
                    if (pickerResult.content){
                        this.setState({productImage64: pickerResult.content});
                    } else {
                        global.globalApp.openAlert('Imagem',
                            'Erro a tentar abrir elemento');
                    }
                  } catch (e) {
                    global.globalApp.openAlert(e);
                  }
                break;
        }

    }

    tryToAddProduct(){
        const name = this.state.name;
        const category = this.state.category !== '' ? this.state.category : this.state.selectedProductType;
        const description = this.state.description;
        const price = this.state.price;
        const img64 = this.state.productImage64;
        const isNameFilled = name !== '';
        const isCategoryFilled = category !== '';
        const isDescriptionFilled = description !== '';
        const isPriceFilled = price !== '';
        const isImg64Filled = img64 !== '';

        if (isNameFilled && isCategoryFilled && isDescriptionFilled && isPriceFilled && isImg64Filled){

           if (!this.state.isSameProduct || !this.props.productToEdit.hasToEdit){
                global.globalApp.showOverlay();
                createProduct(name, price, description, category, img64)
                 .then((result)=>{
                     global.globalApp.closeOverlay();
                     if (result && typeof result === 'string'){
                         global.globalApp.openAlert(result);
                         global.globalApp.closeModal();
                         global.globalApp.updateCategories();
                     }
                     //global.globalApp.debug(JSON.stringify({result}));
                 // eslint-disable-next-line handle-callback-err
                 }).catch((err)=>{
                    global.globalApp.closeOverlay();
                    global.globalApp.openAlert(JSON.stringify(err));
                 });
            } else {
                global.globalApp.showOverlay();
                editProduct(
                    this.props.productToEdit.product.id,
                    name,
                    price,
                    description,
                    this.props.productToEdit.product.category,
                    this.props.productToEdit.product.isOnSale,
                    img64,
                    this.props.productToEdit.product.img64 !== img64
                    ).then((result)=>{
                        global.globalApp.closeOverlay();
                        if (result && typeof result === 'string'){
                            global.globalApp.openAlert(result);
                            global.globalApp.closeModal();
                            global.globalApp.updateCategories();
                        }
                    // eslint-disable-next-line handle-callback-err
                    }).catch((err)=>{
                        global.globalApp.closeOverlay();
                        global.globalApp.openAlert(JSON.stringify(err));
                    });
            }

        } else {
            let errorMessage = 'Preencha os campos:\n';
            errorMessage += !isNameFilled ? 'Nome, ' : '';
            errorMessage += !isCategoryFilled ? 'Categoria, ' : '';
            errorMessage += !isDescriptionFilled ? 'Descrição, ' : '';
            errorMessage += !isPriceFilled ? 'Preço, ' : '';
            errorMessage += !isImg64Filled ? 'Image' : '';

            global.globalApp.openAlert(`${errorMessage}`);
        }


    }

    tryToTestOnline(){
        const name = this.state.name;
        const category = this.state.category !== '' ? this.state.category : this.state.selectedProductType;
        const description = this.state.description;
        const price = this.state.price;
        const img64 = this.state.productImage64;
        const isNameFilled = name !== '';
        const isCategoryFilled = category !== '';
        const isDescriptionFilled = description !== '';
        const isPriceFilled = price !== '';
        const isImg64Filled = img64 !== '';

        if (isNameFilled && isCategoryFilled && isDescriptionFilled && isPriceFilled && isImg64Filled){

            global.globalApp.showOverlay();
            testOnline(name, price, description, category, img64)
                .then((result)=>{
                    global.globalApp.closeOverlay();
                    if (result && typeof result === 'string'){
                        global.globalApp.openAlert(result);
                    }
                // eslint-disable-next-line handle-callback-err
                }).catch((err)=>{
                    global.globalApp.closeOverlay();
                    global.globalApp.openAlert(JSON.stringify(err));
                });

        } else {
            let errorMessage = 'Preencha os campos:\n';
            errorMessage += !isNameFilled ? 'Nome, ' : '';
            errorMessage += !isCategoryFilled ? 'Categoria, ' : '';
            errorMessage += !isDescriptionFilled ? 'Descrição, ' : '';
            errorMessage += !isPriceFilled ? 'Preço, ' : '';
            errorMessage += !isImg64Filled ? 'Image' : '';

            global.globalApp.openAlert(`${errorMessage}`);
        }


    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>{this.activatePickerByPlatform('windows');}} style={styles.containerPhoto}>
                    <View style={[styles.button, styles.photoSize]}>
                        {
                            this.state.productImage64 !== '' ?
                            <Image source={{
                                        uri: 'data:image/jpg;base64,' + this.state.productImage64,
                                        }}
                                    style={styles.plusIMG}/> :
                            <Text>
                                Photo
                            </Text>
                        }
                    </View>
                </TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.containerElement}>
                        <Text>
                            Nome
                        </Text>
                        <TextInput
                            value={this.state.name}
                            onChangeText={(value)=> this.setState({name: value})}
                            placeholder="Tulípa" />
                    </View>
                    <View style={styles.containerElement}>
                        <Text>
                            Descrição
                        </Text>
                        <TextInput
                            value={this.state.description}
                            onChangeText={(value)=> this.setState({description: value})}
                            numberOfLines={2}
                            multiline={true}
                            placeholder="Flor lindissima" />
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.containerElement}>
                        <Text>
                            Categoria
                        </Text>
                        <TextInput
                            value={this.state.category}
                            onChangeText={(value)=> {
                                    this.setState({
                                        category: value,
                                        isSameProduct: this.state.selectedProductType ===
                                                    this.props.productToEdit.product.category
                                                    && value === '',
                                    });
                                }}
                            placeholder="Nova Categoria" />
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
                    <View style={styles.containerElement}>
                        <Text>
                           Preço
                        </Text>
                        <View style={[styles.container, styles.alignItemsCenter]}>
                            <TextInput
                                value={this.state.price}
                                onChangeText={value => {

                                    this.setState({
                                            price: value && value.match(/(\d|,)+/g) ? value.match(/(\d|,)+/g).pop() : '',
                                        });
                                    }}
                                style={styles.priceSize}
                                placeholder="1"  />
                            <Text>
                                €
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.container, styles.buttonsContainer]}>
                    <TouchableOpacity style={styles.containerElement33} onPress={()=>this.tryToAddProduct()}>
                        <View style={styles.button}>
                            {this.props.productToEdit.hasToEdit ? (
                                this.state.isSameProduct ?
                                (<Text>
                                    Actualizar
                                </Text>) :
                                (<Text>
                                    Duplicar
                                </Text>)
                                ) : (
                                <Text>
                                    Adiocionar
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerElement33} onPress={()=>global.globalApp.closeModal()}>

                        <View style={styles.button}>
                            <Text>
                                Cancelar
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerElement33} onPress={()=>this.tryToTestOnline()}>
                        <View style={styles.button}>
                            <Text>
                                Testar Online
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    buttonsContainer: {
        bottom: -50,
    },
    container:{
        flex: 1,
        flexDirection: 'row',
    },
    alignItemsCenter:{
        alignItems: 'center',
    },
    containerPhoto:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        backgroundColor: 'transparent',
    },
    priceSize: {
        width: '90%',
    },
    containerElement:{
        width: '50%',
    },
    containerElement33:{
        width: '33%',
    },
    photoSize:{
        height: '100%',
        width: '100%',
    },
    button:{
        borderWidth: 1,
        borderColor: '#999',
        padding: 5,
    },
    margin:{
        marginRight: 10,
    },
    plusIMG: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});
