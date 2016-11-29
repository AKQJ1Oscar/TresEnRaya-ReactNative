import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import MyButton from './src/js/MyButton';

var IndexScene = React.createClass({
   render: function(){
      return(
         <View style={{flex: 1, backgroundColor: '#eee'}}>
            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 24}}>
               <Text style={styles.pretitulo}>
                  IWEB - React Native
               </Text>
               <Image style={{width:25, height:25, marginLeft: 5}} source={require('./src/react.png')}/>
            </View>
            <Text style={styles.titulo}>
               Tres en raya
            </Text>
            <View style={{flex: 1, backgroundColor: '#eee', margin: 25}}>
               <MyButton onPress={this.props.onForward} text={"Jugar"} tipo={2}/>
            </View>
         </View>
      )
   }
});

const styles = StyleSheet.create({
   pretitulo: {
      fontSize: 24,
      color: '#333',
      fontFamily: 'myriadpro_semibold',
      fontWeight: "700",
      textAlign: 'center'
   },
   titulo: {
      fontSize: 66,
      color: '#333',
      fontFamily: 'myriadpro_light',
      textAlign: 'center'
   }
});

module.exports = IndexScene;
