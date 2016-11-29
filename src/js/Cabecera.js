import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

var color;
var Cabecera = React.createClass({
   render: function(){
      var turn = Math.ceil(this.props.nturno/2);
      var msg = "" + turn + "º " + this.props.texto;
      var color = this.props.color;
      if (this.props.flag === 1) {
         msg = "Fin de la partida, haz click en el botón para empezar otra";
         color = "#777";
      }
      return (
         <View>
            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: -5}}>
               <Text style={styles.pretitulo}>
                  IWEB - React Native
               </Text>
               <Image style={{width:25, height:25, marginLeft: 5}} source={require('../react.png')}/>
            </View>
            <Text style={styles.titulo}>
               Tres en raya
            </Text>
            <Text style={[styles.cabecera, {color: color}]}>
               {msg}
            </Text>
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
   },
   cabecera: {
      fontSize: 20,
      marginTop: 25,
      fontFamily: 'myriadpro_light',
      textAlign: 'center'
   }
});

module.exports = Cabecera;
