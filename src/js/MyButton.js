import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, Dimensions } from 'react-native';
//import { Button } from 'react-bootstrap';

var width = Dimensions.get('window').width;
let MyButton = React.createClass({
	render: function() {
      var estilo = styles.botonStyle1;
      var fontSize = 18;
      if (this.props.tipo === 2) {
         estilo = styles.botonStyle2;
         fontSize = 60;
      }
      return (
			<TouchableHighlight style={estilo} onPress={this.props.onPress}>
				<Text style={[styles.botonStyleText, {fontSize: fontSize}]}>{this.props.text}</Text>
			</TouchableHighlight>
		)
	}
});

const styles = StyleSheet.create({
   botonStyle1: {
      flex: 1,
      padding: 16,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 5,
      alignItems: 'center',
      justifyContent: 'center',
		borderRadius: 5,
      backgroundColor: '#fff',
      elevation: 3,
      shadowOpacity: 0.33
   },
   botonStyle2: {
      height: width-150,
      padding: 10,
      margin: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: width/2,
      backgroundColor: '#fff',
      elevation: 3,
      shadowOpacity: 0.33
   },
   botonStyleText: {
      color: '#666',
      fontFamily: 'myriadpro_light'
   }
});

export default MyButton;
