// Was App.js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import logo from './logo.svg';
import {Link} from 'react-router';

import SearchBar from './components/search_bar';
import List from './components/list';
import Detail from './components/detail'
import YTSearch from 'youtube-api-search';

import './bootstrap/css/bootstrap-grid.css';
import './bootstrap/css/bootstrap-reboot.css';
import './bootstrap/css/bootstrap.css';
import './App.css';

import Dashboard from './Dashboard';

import { Button, Media } from 'react-bootstrap';

var NumberFormat = require('react-number-format');

const API_KEY = "AIzaSyCYCMhgkfKpPUUefhROpc5QXxSEMaSAx_c";

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
      token: '',
      subscriptions:{
        items: []
      },
      comments: '',
      views: '',
      likes: '',
      deslikes: '',
      estimated_youtube_ad_revenue: '',
      videos: [],
      selectedVideo: null
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
    };
    xhr.send(null);
  }
  /*
    Retorna a quantidade de Likes do canal na data selecionada
    */
  getDeslikes = () => {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
      'https://www.googleapis.com/youtube/analytics/v1/reports?ids=channel%3D%3DMINE&start-date=2016-05-01&end-date=2017-06-30&metrics=dislikes&' +
      'access_token=' + this.state.token);
    xhr.onreadystatechange = function (e) {
      var response = JSON.parse(xhr.response);
      self.setState({deslikes: response.rows[0][0]}); 
    };
    xhr.send(null);
  }
  /*
    Retorna a quantidade de Likes do canal na data selecionada
    */
  getEstimatedYoutubeAdRevenue = () => {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
      'https://www.googleapis.com/youtube/analytics/v1/reports?ids=channel%3D%3DMINE&start-date=2016-05-01&end-date=2017-06-30&metrics=estimatedRevenue&' +
      'access_token=' + this.state.token);
    xhr.onreadystatechange = function (e) {
      var response = JSON.parse(xhr.response);
      self.setState({estimated_youtube_ad_revenue: response.rows[0][0]}); 
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
    };
    xhr.send(null);
  }

  
  componentDidMount = () => {
  console.log('profile',this.state.profileObj)
  if(sessionStorage.getItem('token') != null) {
      this.getSubscriptions();
      this.getViews();
      this.getComments();
      this.getLikes();
      this.getDeslikes();
      this.getEstimatedYoutubeAdRevenue();
    }
   
    this.search('Bruno Play Hard');
  }
  componentWillMount = () => {
    this.setState({token: sessionStorage.getItem('token')});

    var teste = sessionStorage.getItem('profileObj')
    this.setState({profileObj: JSON.parse(teste)})

  }
  postUserAPI = () => {
    console.log('token', this.state.token)
    this.getSubscriptions();
    this.getViews();
    this.getComments();
    this.getLikes();
    this.getDeslikes();
    this.getEstimatedYoutubeAdRevenue();
    //this.props.history.push('/dashboard');
  }
  sendUser = (response) => {
    this.setState({profileObj: response.profileObj, token: response.accessToken}) 
    sessionStorage.setItem('token', response.accessToken);
    sessionStorage.setItem('profileObj', JSON.stringify(response.profileObj));

    this.postUserAPI();
  }

  search = (term) => {
    YTSearch({key: API_KEY, term: term}, videos => this.setState({videos: videos, selectedVideo: videos[0]}));
  }

  onVideoSelect = (selectedVideo) => {
    this.setState({selectedVideo})
  }

  render() {
    if(sessionStorage.getItem('token') == null) { 
      return (
        <div className="App">
          <div className="App-header">
            <div className="container">
              <div className="row">
                <div className="col-12 nao-logado">
                 <img src={logo} className="App-logo" alt="logo" />
                  <h2>Entre com sua conta do Google</h2>
                </div>
              </div>
              
            </div>
            
          </div>
          <div className="container">
            <br/>
            <br/>
            <GoogleLogin
                clientId='3211362625-chgfsdfr0qcutrhk8sqfeg8krf1prqf4.apps.googleusercontent.com'
                scope='https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/yt-analytics-monetary.readonly'
                onSuccess={this.sendUser}
                onFailure={error}
                onRequest={loading}
                offline={false}
                approvalPrompt="force"
            >
              <span>Google Connect</span>  
            </GoogleLogin>
          </div>
        </div>
      )
    } else {
    return (
      <div className="App">
        <div className="App-header">
          <div className="container">
          <div className="row">
              <div className="col-2">
                <img src={this.state.profileObj.imageUrl} className="logo" alt="logo" />
              </div>
              <div className="col-10">
                <h2>{this.state.profileObj.name}</h2>
                <p>{this.state.profileObj.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <br/>
          <div className="row">
            <div className="col">
              <p class="h4">Comentários:</p>
              <h2 class="h2"><NumberFormat value={this.state.comments} displayType={'text'} thousandSeparator={true} prefix={''} /></h2>
            </div>
            <div className="col">
                   <p class="h4">Likes:</p>
                   <h2 class="display-2"><NumberFormat value={this.state.likes} displayType={'text'} thousandSeparator={true} prefix={''} /></h2>
            </div>
            <div className="col">
                    <p class="h4">Views:</p>
                    <h2 class="display-2"><NumberFormat value={this.state.views} displayType={'text'} thousandSeparator={true} prefix={''} /></h2>
            </div>
            <div className="col">
                    <p class="h4">Deslikes:</p>
                    <h2 class="display-2"><NumberFormat value={this.state.deslikes} displayType={'text'} thousandSeparator={true} prefix={''} /></h2>
            </div>
            <div className="col">
                  <p class="h4">Receita estimada:</p>
                  <h2 class="display-2"><NumberFormat value={this.state.estimated_youtube_ad_revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h2>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-8">
              <div className="row">
                <div className="col-md-12 box-search">
                  <SearchBar onSearchTerm={this.search.bind(this)} />
                  <br/>
                  <List
                    videos={this.state.videos}
                    onVideoSelect={(selectedVideo) => this.onVideoSelect(selectedVideo)}
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="panel panel-default">
                <div className="panel-body">
                  <h3 className="canais">Canais Inscritos:</h3>
                  <div className="t-left bs-example">
                    { 
                      this.state.subscriptions.items.map((obj, i) => 

                      <div className="card" key={i}>
                        <div className="row">
                          <div className="col-4"><img className="card-image" src={obj.snippet.thumbnails.default.url} alt="Card image cap" /></div>
                          <div className="col-8">
                            <div className="card-content">
                              <h4 className="card-title">{obj.snippet.title}</h4>
                              <p className="card-text">{obj.snippet.description}</p>
                            </div>
                          </div>
                        </div>
                        
                      </div>

                      ) }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/>
      </div>
    );
    }
  }
}

export default App;
