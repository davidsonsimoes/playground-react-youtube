// Was App.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import logo from './logo.svg';
import {Link} from 'react-router';
import './bootstrap/css/bootstrap-grid.css';
import './bootstrap/css/bootstrap-reboot.css';
import './bootstrap/css/bootstrap.css';
import './App.css';

import Dashboard from './Dashboard';

import { Button, Media } from 'react-bootstrap';

var querystring = require("querystring");
var https = require("https");

const error = (response) => {
  console.error(response);
};

const loading = () => {
  console.log('loading');
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileObj:[],
      token: "ya29.GlxrBM3va8UK71wM9gRambVoX8Mq9aDWWEi5pC7ufmW_JxS97ZGwGkePAmdMTt4twfvVEg1_W5-zH6fmUkx-m1oZglfJu7onZTkRPyOh3UK4yKSb_Wd3vblNqUalnw",
      subscriptions:{
        items: []
      },
      comments: '',
      views: '',
      likes: ''
    };
  }
  /*
    Retorna a quantidade de Views do canal na data selecionada
    */
  getViews = () => {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
      'https://www.googleapis.com/youtube/analytics/v1/reports?ids=channel%3D%3DMINE&start-date=2016-05-01&end-date=2017-06-30&metrics=views&' +
      'access_token=' + this.state.token);
    xhr.onreadystatechange = function (e) {
      var response = JSON.parse(xhr.response);
      self.setState({views: response.rows[0][0]}); 
      console.log(response);
    };
    xhr.send(null);
  }
  /*
    Retorna a quantidade de Comentários do canal na data selecionada
    */
  getComments = () => {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
      'https://www.googleapis.com/youtube/analytics/v1/reports?ids=channel%3D%3DMINE&start-date=2016-05-01&end-date=2017-06-30&metrics=comments&' +
      'access_token=' + this.state.token);
    xhr.onreadystatechange = function (e) {
      var response = JSON.parse(xhr.response);
      self.setState({comments: response.rows[0][0]}); 
      console.log(response);
    };
    xhr.send(null);
  }
  /*
    Retorna a quantidade de Likes do canal na data selecionada
    */
  getLikes = () => {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
      'https://www.googleapis.com/youtube/analytics/v1/reports?ids=channel%3D%3DMINE&start-date=2016-05-01&end-date=2017-06-30&metrics=likes&' +
      'access_token=' + this.state.token);
    xhr.onreadystatechange = function (e) {
      var response = JSON.parse(xhr.response);
      self.setState({likes: response.rows[0][0]}); 
      console.log(response.rows[0][0]);
    };
    xhr.send(null);
  }
/*
    Retorna uma lista de canais inscritos
    */
  getSubscriptions = () => {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
      'https://www.googleapis.com/youtube/v3/subscriptions?ids=channel%3D%3DMINE&start-date=2016-05-01&end-date=2017-06-30&metrics=views&' +
      'access_token=' + this.state.token + '&part=snippet&mine=true');
    xhr.onreadystatechange = function (e) {
      var response = JSON.parse(xhr.response);
      self.setState({subscriptions: response}); 
      console.log(response);
    };
    xhr.send(null);
  }
  componentDidMount = () => {
   this.getSubscriptions();
    this.getViews();
    this.getComments();
    this.getLikes();
  }
  postUserAPI = () => {
    // localStorage.setItem('data', JSON.stringify(this.state.profileObj));
    // localStorage.setItem('token', this.state.token);
    this.getSubscriptions();
    this.getViews();
    this.getComments();
    this.getLikes();
    //this.props.history.push('/dashboard');
  }
  sendUser = (response) => {
    console.log(response);
    this.setState({profileObj: response.profileObj, token: response.accessToken}) 
    this.postUserAPI();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Playground Bruno PH em React</h2>
        </div>
        <br/>
        <GoogleLogin
          clientId='3211362625-chgfsdfr0qcutrhk8sqfeg8krf1prqf4.apps.googleusercontent.com'
          scope='https://www.googleapis.com/auth/youtube'
          onSuccess={this.sendUser}
          onFailure={error}
          onRequest={loading}
          offline={false}
          approvalPrompt="force"
      >
        <span>Google Connect</span>

      
      </GoogleLogin>
      <br/>
      <br/>
      <p>Você obtere <strong>{this.state.comments}</strong> comentários nesse período.</p>
      <p>Você obtere <strong>{this.state.likes}</strong> likes nesse período.</p>
      <p>Você obtere <strong>{this.state.views}</strong> views nesse período.</p>
      

      <div className="panel panel-default">
        <div className="panel-body">
          <div className="t-left bs-example">
            { 
              this.state.subscriptions.items.map((obj, i) => 

              <div className="card" key={i}>
                <img className="card-img-top" src={obj.snippet.thumbnails.default.url} alt="Card image cap" />
                <div className="card-block">
                  <h4 className="card-title">{obj.snippet.title}</h4>
                  <p className="card-text">{obj.snippet.description}</p>
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>

              ) }
          </div>
        </div>
      </div>

      </div>
    );
  }
}

export default App;
