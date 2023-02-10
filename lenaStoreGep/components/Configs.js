import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { configAll, setConfig } from '../utilities/APIRequest';

export default class Configs extends Component {
    constructor(props) {
      super(props);

      this.state = {
            defaultConfigs:{
                storeName: '',
                welcome: '',
                noService: '',
                delivery: '',
                support: '',
                returns: '',
                limitProducts: '',
                limitDaily: '',
                warnings: '',
                contacts: '',
                payMethods: '',
                toPay: '',
                payed: '',
                finalized: '',
                facebook: '',
                instagram: '',
            },
            storeName: '',
            welcome: '',
            noService: '',
            delivery: '',
            support: '',
            returns: '',
            limitProducts: '',
            limitDaily: '',
            warnings: '',
            contacts: '',
            payMethods: '',
            toPay: '',
            payed: '',
            finalized: '',
            facebook: '',
            instagram: '',
      };

      this.save = this.save.bind(this);
      this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        global.globalApp.showOverlay();

        configAll().then((configs)=>{
           global.globalApp.closeOverlay();

           if (configs){
             this.setState({
                defaultConfigs: configs,
                ...configs,
                limitProducts: configs.limitProducts.toString(),
                limitDaily: configs.limitDaily.toString(),
              });
           }
         // eslint-disable-next-line handle-callback-err
         }).catch((err)=>{});

         global.globalApp.assignSaveCancelConfig(true, this.save);
         global.globalApp.assignSaveCancelConfig(false, this.cancel);
    }

    save(){
        let data = {};
        data.storeName = this.state.storeName;
        data.welcome = this.state.welcome;
        data.noService = this.state.noService;
        data.delivery = this.state.delivery;
        data.support = this.state.support;
        data.returns = this.state.returns;
        data.limitProducts = +this.state.limitProducts || 20;
        data.limitDaily = +this.state.limitDaily || 5;
        data.warnings = this.state.warnings;
        data.contacts = this.state.contacts;
        data.payMethods = this.state.payMethods;
        data.toPay = this.state.toPay;
        data.payed = this.state.payed;
        data.finalized = this.state.finalized;
        data.facebook = this.state.facebook;
        data.instagram = this.state.instagram;

        global.globalApp.showOverlay();

        setConfig(data).then((info)=>{
           global.globalApp.closeOverlay();

           if (info != ''){
            global.globalApp.openAlert('Salvo com sucesso!');
             this.setState({defaultConfigs: data});
           }
         // eslint-disable-next-line handle-callback-err
         }).catch((err)=>{});
    }
    cancel(){
        this.setState({
            ...this.state.defaultConfigs,
            limitProducts: this.state.defaultConfigs.limitProducts.toString(),
            limitDaily: this.state.defaultConfigs.limitDaily.toString(),
        });
        global.globalApp.openAlert('Voltou ao ultimo estado salvo!');
    }

    render() {
        return (
            <View>
                {/* welcome */}
                <Text>Nome da Loja</Text>
                <TextInput multiline={true} placeholder={'Mercadão das Flores'}
                    onChangeText={(val)=>this.setState({storeName: val})}
                    value={this.state.storeName}
                />
                <Text>Mensagem de Boas Vindas</Text>
                <TextInput multiline={true}
                    placeholder={'Seja bem vindo!\n Tudo de fores e ramos para si!'}
                    onChangeText={(val)=>this.setState({welcome: val})}
                    value={this.state.welcome}
                />
                <Text>Alerta Serviço em Baixo</Text>
                <TextInput multiline={true} placeholder={'De momento estamos com dificuldades técnicas\n Não será possível realizar encomendas!'}
                    onChangeText={(val)=>this.setState({noService: val})}
                    value={this.state.noService}
                />
                {/* products */}
                <Text>Entrega</Text>
                <TextInput multiline={true} placeholder={'Em 72 horas'}
                    onChangeText={(val)=>this.setState({delivery: val})}
                    value={this.state.delivery}
                />
                <Text>Suporte</Text>
                <TextInput multiline={true} placeholder={'Conjuntos Costumizávies'}
                    onChangeText={(val)=>this.setState({support: val})}
                    value={this.state.support}
                />
                <Text>Devoluções</Text>
                <TextInput multiline={true} placeholder={'Devemos o seu dinhiero caso mude de ideias antes da entrega'}
                    onChangeText={(val)=>this.setState({returns: val})}
                    value={this.state.returns}
                />
                {/* basket */}
                <Text>Limite Productos no cesto de Compras</Text>
                <TextInput placeholder="20"
                    onChangeText={(val)=>this.setState({limitProducts: val && val.match(/(\d|,)+/g) ? val.match(/(\d|,)+/g).pop() : ''})}
                    value={this.state.limitProducts}
                />
                <Text>Limite Compras por dia por Cliente</Text>
                <TextInput placeholder="5"
                    onChangeText={(val)=>this.setState({limitDaily: val && val.match(/(\d|,)+/g) ? val.match(/(\d|,)+/g).pop() : ''})}
                    value={this.state.limitDaily}
                />
                {/* placed order */}
                <Text>Avisos</Text>
                <TextInput multiline={true} placeholder={'Avisos'}
                    onChangeText={(val)=>this.setState({warnings: val})}
                    value={this.state.warnings}
                />
                <Text>Formas de Pagamento</Text>
                <TextInput multiline={true} placeholder="MBWay : 916666666"
                    onChangeText={(val)=>this.setState({payMethods: val})}
                    value={this.state.payMethods}
                />
                <Text>Contactos</Text>
                <TextInput multiline={true} placeholder="916666666"
                    onChangeText={(val)=>this.setState({contacts: val})}
                    value={this.state.contacts}
                />
                {/* follow purchase */}
                <Text>Messagem quando Compra esta por pagar</Text>
                <TextInput multiline={true} placeholder={'Pagar a sua encomenda em: MBWAY: 913555666'}
                    onChangeText={(val)=>this.setState({toPay: val})}
                    value={this.state.toPay}
                />
                <Text>Mensagem quando a Compra esta paga</Text>
                <TextInput multiline={true} placeholder="Encomenda paga"
                    onChangeText={(val)=>this.setState({payed: val})}
                    value={this.state.payed}
                />
                <Text>Mensagem quando a Compra esta finalizada</Text>
                <TextInput multiline={true} placeholder="Obrigado por comprar connosco"
                    onChangeText={(val)=>this.setState({finalized: val})}
                    value={this.state.finalized}
                />
                {/* footer */}
                <Text>Link do Facebook</Text>
                <TextInput placeholder="www.facebook.com"
                    onChangeText={(val)=>this.setState({facebook: val})}
                    value={this.state.facebook}
                />
                <Text>Link do Instagram</Text>
                <TextInput placeholder="www.instragram.com"
                    onChangeText={(val)=>this.setState({instagram: val})}
                    value={this.state.instagram}
                />
                <View style={styles.spaceBottom}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    spaceBottom: {
        marginBottom: 20,
    },
});
