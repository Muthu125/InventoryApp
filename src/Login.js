import React, { Component } from 'react';
// import logo from './logo.svg';
//import './App.css';
import {
  Button, Toolbar, ToolbarRow,
  ToolbarSection, ToolbarTitle, Textfield, Content
} from 'react-mdc-web/lib';
import 'material-components-web/dist/material-components-web.min.css';


var Parse = require('parse');
Parse.initialize("05b6e770a6189ba10731fd4686cd695a187b8612");
Parse.serverURL = 'http://35.194.184.154:80/parse/'

class Login extends Component {
  // <div className="App">
  //   <div className="App-header">
  //     <img src={logo} className="App-logo" alt="logo" />
  //     <h2>Welcome to React</h2>
  //   </div>
  //   <p className="App-intro">
  //     To get started, edit <code>src/App.js</code> and save to reload.
  //   </p>
  // </div>

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }


  submitLogin(e) {
    console.log("reached ........." + this.state.username);
    Parse.User.logIn(this.state.username, this.state.password, {
      success: function (user) {
        // Do stuff after successful login.  
       // alert("Success chk: ");
        window.open("http://localhost:3000/DashBoard", "_self");
        // this.setState.loginStatus({
        //   loginStatus : true
        // });

      },//.bind(this),
      error: function (user, error) {
        // The login failed. Check error to see why.
        alert("Error in app: " + error);
      }
    });
  };

  render() {
    return (
      <div>
        <Toolbar fixed>
          <ToolbarRow>
            <ToolbarSection align="start">
              <ToolbarTitle>Inventory MSF</ToolbarTitle>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <Content>
          <Textfield
            name="username"
            floatingLabel="Your name or email"
            helptext="For example, Vinayak or vinayak@gmail.com"
            autoFocus={true}
            value={this.state.username}
            onChange={this.handleChange}
          />
          <Textfield
            name="password"
            floatingLabel="Password"
            type="password"
            minLength={8}
            helptext="Your password must be at least 8 characters"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button raised accent onClick={this.submitLogin}>Login</Button>
        </Content>
      
      </div>
    );
  }
}

export default Login;
