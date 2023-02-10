/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 //@builtin TypeScript and JavaScript Language Features --- plugin disabled

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  // eslint-disable-next-line no-unused-vars
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import TopTabs from './components/TopTabs';
import SalesContainer from './components/SalesContainer';
import ProductsContainer from './components/ProductsContainer';
import ProductsFooter from './components/ProductsFooter';
import ConfigsFooter from './components/ConfigsFooter';
import WindowsModal from './components/ModalWindows';
import Configs from './components/Configs';
import MessagingAndDetailsContainer from './components/MessagingAndDetailsContainer';
import NewMessage from './components/NewMessage';
import NewProduct from './components/NewProduct';
import RegisterAppKey from './components/RegisterAppKey';
import WarningNextStateModal from './components/WarningNextStateModal';

import { Storage } from  './utilities/LocalStorage';
import { AppKey } from  './utilities/Constants';

import { categories} from '../utilities/APIRequest';

const globalApp = {
};

const App: () => React$Node = () => {
  global.globalApp = globalApp;

  const [pressedMain, setMainPressed] = useState({button: 0, tab: 'purchases'});
  const [pressedSub, setSubPressed] = useState({button: 0});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasToSetAppKey, setHasToSetAppKey] = useState(false);
  const [isRunningRequest, setIsRunningRequest] = useState(false);
  const [modalType, setModalType] = useState('');
  const [debug, setDebug] = useState('');
  const [updatedCategories, setUpdatedCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [outLastUpdatedProducts, setOutLastUpdatedProduct] = useState(new Date());
  const [modalWarningAction, setModalWarningAction] = useState(()=>()=>{});
  const [saleIDState, setSaleIDState] = useState({id: '', state: ''});
  const [clickedMessage, setClickedMessage] = useState({id: '', state: ''});
  const [productToEdit, setProductToEdit] = useState({hasToEdit: false, product: {}});
  const [saveConf, setSaveConf] = useState(()=>{});
  const [cancelConf, setCancelConf] = useState(()=>{});
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const subTabs = {
    purchases : [
      {name: 'Novas Encomendas', key: 'newpurchased'},
      {name: 'Encomendas Finalizadas', key: 'finalpurchased'},
      {name: 'Encomendas Antigas', key: 'oldpurchased'},
      ],
    forsale : [
      {name: 'Á Venda', key: 'selling'},
      {name: 'Fora de Moda', key: 'outofsale'},
      ],
    config : [],
  };
  const mainTabs = [
                    {name: 'Encomendas', key: 'purchases'},
                    {name: 'Productos', key:'forsale'},
                    {name: 'Configurações', key: 'config'},
                    ];

  global.globalApp.openModal = function(type){
    setIsModalOpen(true);
    setModalType(type);
  };

  global.globalApp.setIsNewProduct = function(isToEdit, product){
    setProductToEdit({hasToEdit: isToEdit, product});
  };

  global.globalApp.saleForModal = function(data){
    setSaleIDState(data);
  };

  global.globalApp.clickedMessage = function(message){
    setClickedMessage(message);
  };

  global.globalApp.openModalWarning = function(type, action){
    setModalWarningAction(()=>action);
    setIsModalOpen(true);
    setModalType(type);
  };

  global.globalApp.nextActionState = function(){
    modalWarningAction();
  };

  global.globalApp.closeModal = function(){
    setIsModalOpen(false);
  };

  global.globalApp.showOverlay = function(){
    setHasToSetAppKey(false);
    setIsRunningRequest(true);
  };

  global.globalApp.closeOverlay = function(){
    setIsRunningRequest(false);
  };

  global.globalApp.refreshForce = function(){
    setOutLastUpdatedProduct(new Date());
  };

  global.globalApp.updateCategories = function(){
    global.globalApp.showOverlay();
    try {
      categories().then((inCategories)=>{
          global.globalApp.closeOverlay();
          if (inCategories && inCategories.length >= 0){
            setUpdatedCategories( inCategories);
            global.globalApp.refreshForce();
            if (selectedCategory === ''){
              setSelectedCategory(inCategories[0]);
            }
          }
        // eslint-disable-next-line handle-callback-err
        }).catch((err)=>{});
    } catch (err){
    }
  };

  global.globalApp.changeSelectedCategory = function(category){
    setSelectedCategory(category);
  };

  global.globalApp.assignSaveCancelConfig = function(isSave, callback){
    isSave ? setSaveConf(()=>{
     return callback;
    }) : setCancelConf(()=>{
      return callback;
     });
  };

  global.globalApp.useSaveCancelConfig = function(isSave){
    isSave ? saveConf() : cancelConf();
  };

  global.globalApp.openAlert = function(message){
    if (!isAlertOpen){
      Alert.alert(message,'', [
        { text: 'OK', onPress: () => setIsAlertOpen(false) },
      ]);
      setIsAlertOpen(true);
    }
  };

  global.globalApp.debug = function(inDebug){
    setDebug(inDebug);
  };

  global.globalApp.getDebug = function(){
    return debug;
  };


  useEffect(()=>{
    checkAppKey();
  }, []);

  const checkAppKey = async() =>{

    const value = await Storage.getItem(AppKey);

    if (!value){
      setHasToSetAppKey(true);
      global.globalApp.openModal('register');
    } else {
      global.globalApp.updateCategories();
    }

  };

  function tabClicked(index, name, key) {
    if (name == 'main'){
      setMainPressed({button: index, tab: key});
      setSubPressed({button: 0});
    } else {
      setSubPressed({button: index});
    }
  }

  function getTabLayout(mainTab, tab, isFooter){
    var selectedTabs = `${mainTab} - ${tab}`;

    switch (selectedTabs) {
      case 'purchases - newpurchased':
        if (isFooter){
          return (
            <View />
          );
        }
        return (
          <View>
            <SalesContainer type={'new'} forceUpdate={outLastUpdatedProducts}/>
          </View>
        );
      case 'purchases - finalpurchased':
        if (isFooter){
          return (
            <View />
          );
        }
        return (
          <View>
            <SalesContainer type={'final'} forceUpdate={outLastUpdatedProducts}/>
          </View>
        );
      case 'purchases - oldpurchased':
        if (isFooter){
          return (
            <View />
          );
        }
        return (
          <View>
            <SalesContainer type={'old'} forceUpdate={outLastUpdatedProducts}/>
          </View>
        );
      case 'forsale - selling':
        if (isFooter){
          return (
            <View>
              <ProductsFooter productTypes={updatedCategories}/>
            </View>
          );
        }
        return (
          <ProductsContainer forceUpdate={outLastUpdatedProducts} category={selectedCategory}/>
          );
      case 'forsale - outofsale':
        if (isFooter){
          return (
            <View />
          );
        }
        return (
          <ProductsContainer forceUpdate={outLastUpdatedProducts} isOldProducts={true} />
        );
      case 'config - ':
        if (isFooter){
          return (
            <ConfigsFooter />
          );
        }
        return (<Configs>
          Configurações
        </Configs>);

      default:
        if (isFooter){
          return (
            <View />
          );
        }
        return (<View>
          default
        </View>);
    }
  }

  // eslint-disable-next-line no-unused-vars
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      // eslint-disable-next-line no-bitwise, no-undef
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  function getModalLayout(inModalType){
    switch (inModalType){
      case 'purchaseDetails':
        return (
          <View>
            <MessagingAndDetailsContainer
             saleData={saleIDState} />
          </View>
        );
        case 'newMessage':
          return (
            <View>
              <NewMessage
                message={clickedMessage}
                saleData={saleIDState}
                />
            </View>
          );
        case 'newProduct':
          return (
            <View>
              <NewProduct productTypes={updatedCategories} productToEdit={productToEdit}/>
            </View>
          );
        case 'register':
          return (
            <View>
              <RegisterAppKey />
            </View>
          );
        case 'nextPayed':
          return (
            <View>
              <WarningNextStateModal text={'Tem a certeza que quer alterar o estado para "Pago"?'} />
            </View>
          );
        case 'nextFinalized':
          return (
            <View>
              <WarningNextStateModal text={'Tem a certeza que quer alterar o estado para "Finalizado"?'} />
            </View>
          );
        case 'nexOld':
          return (
            <View>
              <WarningNextStateModal text={'Tem a certeza que quer alterar o estado para "Antigo"?'} />
            </View>
          );
        case 'nextPay':
          return (
            <View>
              <WarningNextStateModal text={'Tem a certeza que quer alterar o estado para "Por Pagar"?'} />
            </View>
          );
        case 'delete':
          return (
            <View>
              <WarningNextStateModal text={'Tem a certeza que quer apagar esta compra?'} />
            </View>
          );
        default:
          return (
          <View>
              <Text>Default</Text>
          </View>
          );
    }
  }

  function getModalByPlatform(platform, layout){
    switch (platform){
      case 'windows':
        return (
          <WindowsModal hidden={isRunningRequest}>
            {!hasToSetAppKey ?
              <TouchableOpacity onPress={()=>{ setIsModalOpen(false);}}>
              <Text>
                Fechar
              </Text>
            </TouchableOpacity> : <></>}
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              {getModalLayout(layout)}
            </ScrollView>
          </WindowsModal>
        );
    }
  }

  const getLoadingOverlay = () =>(
    <>
      {isRunningRequest ? <View style={styles.loadingContainer}>
          <View style={styles.loading}>
            <Text>
              Conexão ao serviço aguarde
            </Text>
            <ActivityIndicator size="large" />
          </View>
        </View> : <></>}
    </>
  );


  return (
    <>
      {isModalOpen ?
      getModalByPlatform('windows', modalType) :
       (<View>
          <Text>
              {
                debug
              }
          </Text>
       </View>)}
      <SafeAreaView style={{flex: 1}}>
         <TopTabs onTabPressed={tabClicked} tabSelected={pressedMain} name="main"  tabs={mainTabs} />
         <TopTabs onTabPressed={tabClicked} tabSelected={pressedSub} sub="sub" tabs={subTabs[pressedMain.tab]} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            {getTabLayout(pressedMain.tab, ((subTabs[pressedMain.tab] && subTabs[pressedMain.tab].length > 0 ) ? subTabs[pressedMain.tab][pressedSub.button].key  : ''))}
        </ScrollView>
        {getTabLayout(pressedMain.tab, ((subTabs[pressedMain.tab] && subTabs[pressedMain.tab].length > 0 ) ? subTabs[pressedMain.tab][pressedSub.button].key  : ''), true)}
        {getLoadingOverlay()}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    height: 200,
  },
  loading:{
    position: 'absolute',
    top: '45%',
    left: '45%',
  },
  loadingContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    zIndex: 2,
  },
  modalHidden: {
    display: 'none',
  },
  modalUnhidden: {
  },
});

export default App;
