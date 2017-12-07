//import Colors from 'material-ui/lib/styles/colors';
//import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/styles/spacing'
import zIndex from 'material-ui/styles/zIndex'
import React from 'react'
import {blue500,   
        blue900,   
        red500,    
        greenA200, 
        green800,
        green900}  from 'material-ui/styles/colors'



export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  muiTheme: React.PropTypes.object,
  palette: {
    primary1Color: '#0d99ff', 
    accent1Color: red500,
  }
};
