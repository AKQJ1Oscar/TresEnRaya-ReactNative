import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

var color;
let Casilla = React.createClass({
   casillaClick: function() {
      color = this.props.color;
      if (this.props.valor === "-") {
         this.props.manejadorClick(
            this.props.indiceFila,
            this.props.indiceColumna
         );
      }
   },
   render: function() {
      var casillaStyle = {
         height: '100',
         width: '100',
         fontSize: '48',
      };
      var color = "#fff";
      if (this.props.valor === "-"){
         color = "#fff";
      } else if (this.props.valor === "X"){
         color = "#0070C9";
      } else if (this.props.valor === "O"){
         color = "#E53935";
      }
      if (this.props.flag == 1) {
        return(
         <TouchableHighlight
                 style={styles.casillaStyle}
                 onPress={this.casillaClick} disabled>
            <Text style={[styles.casillaStyleText, {color: color}]}>
               {this.props.valor}
            </Text>
         </TouchableHighlight>
        )
      }
      return(
         <TouchableHighlight
                 style={styles.casillaStyle}
                 onPress={this.casillaClick}>
            <Text style={[styles.casillaStyleText, {color: color}]}>
              {this.props.valor}
            </Text>
         </TouchableHighlight>
      )
   }
});

const styles = StyleSheet.create({
   casillaStyle: {
      flex: 1,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
      backgroundColor: '#fff',
		borderRadius: 5,
      elevation: 5,
      shadowOpacity: 0.5
   },
   casillaStyleText: {
      fontSize: 56,
      fontFamily: 'gotham_light'
   }
});

module.exports = Casilla;
