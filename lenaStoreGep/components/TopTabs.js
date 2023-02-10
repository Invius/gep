import { Text, View,  Button, TouchableOpacity } from 'react-native'
import React, { Component, useState } from 'react'

export default class TopTabs extends Component {

  render() {
    return (
      <View style={{
           flexDirection: 'row',
           justifyContent: 'space-around',
           borderTopWidth: 1,
           borderTopColor: 'black',
           }}>
            
                {
                   this.props.tabs.map((element, index)=>{
                        return(
                                <TouchableOpacity
                                    /**hitSlop change touch reactivity*/
                                    style={(this.props.tabSelected.button == index) ? 
                                    {
                                      backgroundColor: "rgb(150, 150, 150)",
                                      color: "white"  
                                    } : {}}
                                    onPress={()=>{this.props.onTabPressed(index, this.props.name, element.key)}}
                                    key={index}>
                                    <Text>
                                        {element.name || element}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })
                }
            
         </View>
    )
  }
}

