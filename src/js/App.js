import React, { Component } from 'react';
import { View, Navigator, StatusBar, Text } from 'react-native';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

import IndexScene from '../../inicio';
import PartidaScene from '../../partida'

var App = React.createClass({
   render: function() {
      const routes = [
         {title: 'Index', index: 0},
         {title: 'Partida', index: 1}
      ];
      return (
         <MenuContext style={{flex:1, backgroundColor:'#eee'}}>
            <StatusBar
               backgroundColor="#eee"
               barStyle="dark-content"
            />
            <Navigator
               initialRoute={routes[0]}
               initialRouteStack={routes}
               renderScene={(route, navigator) => {
                  var onForward = function(){
                     const nextIndex = route.index + 1;
                     if(typeof routes[nextIndex] == "object"){
                        navigator.push(routes[nextIndex])
                     }
                  }
                  var onBack = function(){
                     if (route.index > 0){
                        navigator.pop();
                     }
                  }
                  switch(route.index){
                     case 0:
                        return <IndexScene onForward={onForward} onBack={onBack} />
                     case 1:
                        return <PartidaScene onForward={onForward} onBack={onBack} />
                  }
               }}
            />
         </MenuContext>
      );
   }
});

module.exports = App;
