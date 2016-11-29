import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, ListView, Modal, AsyncStorage } from 'react-native';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

import MyButton from './src/js/MyButton';
const Cabecera = require('./src/js/Cabecera');
const Tablero = require('./src/js/Tablero');
const BotonReset = require('./src/js/BotonReset');
const JUGADORX = "jugador 1 → X";
const JUGADOR0 = "jugador 2 → O";

var PartidaScene = React.createClass({
   getInitialState: function() {
      var data = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
         turno: JUGADORX,
         valores: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']],
         nturno: 1,
         flag: 0,
         modalVisible: false,
         dataSource: data
      };
   },
   componentDidMount: function() {
      var movs = [];
      dataSource = this.state.dataSource.cloneWithRows(movs);
      this.setState({dataSource: dataSource});
   },
   _getActionsFromDataSource: function() {
      let movs = [];
      for (var i = 0; i < this.state.dataSource.getRowCount(); i++) {
         movs.push(this.state.dataSource.getRowData(0, i));
      }
      return movs;
   },
   _renderRow: function(movimiento) {
      return(
         <View style={{flexDirection:'row'}}>
            <Text style={styles.listViewText}>{movimiento}</Text>
         </View>
      )
   },
   appClick: function(numeroFila, numberoColumna) {
      let valores = this.state.valores;
      let nuevoValor = this.state.turno === JUGADORX ? 'X' : 'O';
      valores[numeroFila][numberoColumna] = nuevoValor;
      let movimiento = 'El ' + this.state.turno + ' elige la casilla [' + numeroFila + ', ' + numberoColumna + ']'
      let movs = this._getActionsFromDataSource();
      movs.push(movimiento);
      dataSource = this.state.dataSource.cloneWithRows(movs);
      this.setState({
         turno: this.state.turno === JUGADORX ? JUGADOR0 : JUGADORX,
         valores: this.state.valores,
         dataSource: dataSource
      });
      this.state.nturno++;
      if (this.state.flag === 0) {
         if (this.checkWin(valores, nuevoValor)) {
            this.state.flag = 1;
            var msg = "Ha ganado el " + this.state.turno;
            movs.push(msg);
            dataSource = this.state.dataSource.cloneWithRows(movs);
            this.setState({dataSource: dataSource});
            setTimeout(function(){ alert(msg); }, 100);
         } else if (this.checkTie(valores)) {
            this.state.flag = 1;
            movs.push("Se ha producido un empate");
            dataSource = this.state.dataSource.cloneWithRows(movs);
            this.setState({dataSource: dataSource});
            setTimeout(function(){ alert("Habéis empatado"); }, 100);
          }
      }
   },
   resetClick: function() {
      this.setState(this.getInitialState());
      this.state.flag = 0;
   },
   checkWin: function(valores, nuevoValor) {
      var nFila = 0;
      var nCol = 0;
      var n = 0;
      while (nFila < this.state.valores.length) {
         while (nCol < this.state.valores.length) {
            if (valores[nFila][nCol] === nuevoValor) {
               n++;
            } else {
               n = 0;
            }
            nCol++;
         }
         if (n === this.state.valores.length) {
            return true;
         }
         nFila++;
         n = 0;
         nCol = 0;
      }
      nFila = 0;
      nCol = 0;
      var n = 0;
      while (nCol < this.state.valores.length) {
         while (nFila < this.state.valores.length) {
            if (valores[nFila][nCol] === nuevoValor) {
               n++;
            } else {
               n = 0;
            }
            nFila++;
         }
         if (n === this.state.valores.length) {
            return true;
         }
         nCol++;
         n = 0;
         nFila = 0;
      }
      nFila = 0;
      n = 0;
      while (nFila < this.state.valores.length) {
         if(valores[nFila][nFila] === nuevoValor) {
            n++;
         } else {
            n = 0;
         }
         nFila++;
      }
      if (n === this.state.valores.length) {
         return true;
      }
      nCol = this.state.valores.length - 1;
      nFila = 0;
      n = 0;
      while (nCol >= 0 && nFila < this.state.valores.length) {
         if (valores[nFila][nCol] === nuevoValor) {
            n++;
         } else {
            n= 0;
         }
         nFila++;
         nCol--;
      }
      if (n === this.state.valores.length) {
         return true;
      }
      return false;
   },
   checkTie: function(valores) {
      var nFila = 0;
      var nCol = 0;
      var empate = true;
      for (nFila = 0; nFila < this.state.valores.length; nFila++) {
         for (nCol = 0; nCol < this.state.valores.length; nCol++) {
            if (valores[nFila][nCol] === '-') {
               empate = false;
            }
         }
      }
      return empate;
   },
   gestionarPartida: async function(value) {
      if (value === 'guardar') {
         try {
            await AsyncStorage.setItem('@Store:estado', JSON.stringify(this.state));
            alert('Se ha guardado la partida');
         } catch (error) {
            alert('ERROR: No se ha podido guardar la partida');
         }
      } else if (value === 'cargar') {
         try {
            var partidaGuardada = await AsyncStorage.getItem('@Store:estado');
            if (partidaGuardada !== null) {
               var partida = JSON.parse(partidaGuardada);
               this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(partida.dataSource._dataBlob.s1)
               });
               delete partida.dataSource;
               this.setState(partida);
               alert('Se ha cargado la partida guardada');
            } else {
               alert('No hay ninguna partida guardada');
            }
         } catch (error) {
            alert('ERROR: No se ha podido cargar la partida');
         }
      } else if (value === 'historial') {
         this.setState({modalVisible: true});
      }
   },
   render: function() {
      var texto = "turno del " + this.state.turno;
      var color1 = "#0070C9";
      var color2 = "#E53935";
      if (this.state.turno === JUGADOR0) {
         color1 = "#E53935";
         color2 = "#0070C9";
      }
      return (
         <View style={{flex: 1, backgroundColor: '#eee'}}>
            <View style={{ paddingBottom: 0, marginBottom: -5, paddingTop: 0, paddingRight: 10, marginRight: 10, flexDirection: 'row'}}>
               <View style = {{flex:1}}><Text> </Text></View>
               <Menu onSelect={this.gestionarPartida}>
                  <MenuTrigger>
                     <Text style={{ color: '#333', fontSize: 24, fontWeight: 'bold', width: 20, textAlign: 'center' }}>&#8942;</Text>
                  </MenuTrigger>
                  <MenuOptions>
                     <MenuOption value={'guardar'}>
                        <Text>Guardar Partida</Text>
                     </MenuOption>
                     <MenuOption value={'cargar'}>
                        <Text>Cargar Partida</Text>
                     </MenuOption>
                     <MenuOption value={'historial'}>
                        <Text>Historial de acciones</Text>
                     </MenuOption>
                  </MenuOptions>
               </Menu>
            </View>
            <Cabecera texto={texto}
                      color={color1}
                      flag={this.state.flag}
                      nturno={this.state.nturno}
            />
            <Tablero valores={this.state.valores}
                     manejadorTableroClick={this.appClick}
                     color = {color2}
                     flag = {this.state.flag}
            />
            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop: 25, marginLeft: 25, marginRight: 25, marginBottom: 25}}>
               <MyButton onPress={this.props.onBack} text={"Volver"} tipo={1}/>
               <BotonReset manejadorBotonClick={this.resetClick}/>
            </View>
            <Modal animationType={"slide"}
                   transparent={true}
                   visible={this.state.modalVisible}
                   onRequestClose={() => this.setState({modalVisible: false})}
               >
               <View style={styles.modalStyle}>
                  <Text style={styles.listViewText2}>Historial de acciones</Text>
                  <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} enableEmptySections={true}/>
                  <TouchableHighlight onPress={() => {
                     this.setState({modalVisible: !this.state.modalVisible});
                  }} style={styles.botonStyle}>
                     <Text style={styles.botonStyleText}>Volver</Text>
                  </TouchableHighlight>
               </View>
            </Modal>
         </View>
      )
   }
});

const styles = StyleSheet.create({
   modalStyle: {
      flex: 1,
      marginTop: 150,
      marginLeft: 25,
      marginRight: 25,
      marginBottom: 25,
      padding:25,
      backgroundColor: '#aaa',
      borderRadius: 5,
      elevation: 3,
      shadowOpacity: 0.33
   },
   botonStyle: {
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
   },
   listViewText: {
      fontSize: 20,
      color: '#fff',
      fontFamily: 'myriadpro_light'
   },
   listViewText2: {
      marginBottom: 10,
      fontSize: 36,
      color: '#fff',
      fontFamily: 'myriadpro_light'
   }
});

export default PartidaScene;
