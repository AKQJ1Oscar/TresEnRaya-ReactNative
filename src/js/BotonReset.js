import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
//import { Button } from 'react-bootstrap';

let BotonReset = React.createClass({
	botonClick: function() {
		this.props.manejadorBotonClick();
	},
	render: function() {
		return (
			<TouchableHighlight style={styles.botonStyle} onPress={this.botonClick}>
				<Text style={styles.botonStyleText}>Partida nueva</Text>
			</TouchableHighlight>
		)
	}
});

const styles = StyleSheet.create({
   botonStyle: {
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
   botonStyleText: {
      fontSize: 18,
		color: '#666',
      fontFamily: 'myriadpro_light'
   }
});

module.exports = BotonReset;
