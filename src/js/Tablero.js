import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

var Casilla = require("./Casilla.js");
var Tablero = React.createClass({
   tableroClick: function(numeroFila, numeroColumna) {
      this.props.manejadorTableroClick(numeroFila, numeroColumna);
   },
   render: function() {
      let tablero = this.props.valores.map(function(valoresFila, indiceFila) {
         let fila = valoresFila.map(function(valor, indiceColumna) {
            let mykey = "" + indiceFila + indiceColumna;
            return (
               <Casilla valor={valor}
                        indiceFila={indiceFila}
                        indiceColumna={indiceColumna}
                        key={mykey}
                        manejadorClick={this.tableroClick}
                        color={this.props.color}
                        flag={this.props.flag}
               />
            )
         }, this);
         return (<View key={"f"+indiceFila} style={styles.fila}>{fila}</View>)
      }, this);
      return (<View style={styles.tablero}>{tablero}</View>);
   }
});

const styles = StyleSheet.create({
   tablero: {
      flex: 5,
      marginTop: 5,
      marginLeft: 25,
      marginRight: 25,
      flexDirection: 'column',
      justifyContent: 'space-between'
   },
   fila: {
      flex: 5,
      flexDirection: 'row',
      justifyContent: 'space-between'
   }
});

module.exports = Tablero;
