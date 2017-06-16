import React, { Component } from 'react';


const API_KEY = 'AIzaSyCtH15gkflSI5SEdUl2lKMS16IFttTLb8Y';

//eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3NGZiMTJhYzJkMDRhOTkyN2Y5YTExMjBjZjA4N2NlNjQyMzI3MjQifQ

//110153595196955927598

export default class FourOFour extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      gapiReady:true
    };
  }

  componentWillMount = () => {
      var data = localStorage.getItem('data');
      console.log(JSON.parse(data))      
  }

  componentDidMount() {
    
  }

  render() {
    
     return (
       <h1>GAPI is loaded and ready to use.</h1>
     );
  
}
}
