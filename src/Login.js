import React, { Component } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import logo from './logo.svg';
//import './App.css';
import {
  Button, Toolbar, ToolbarRow,
  ToolbarSection, ToolbarTitle, Textfield, Content, Tab, Tabbar, FormField, Switch
} from 'react-mdc-web/lib';
import 'material-components-web/dist/material-components-web.min.css';
// import DashBoard from './DashBoard.js';
// import Dropdown from 'muicss/lib/react/dropdown';
// import DropdownItem from 'muicss/lib/react/dropdown-item';

var Parse = require('parse');
Parse.initialize("05b6e770a6189ba10731fd4686cd695a187b8612");
Parse.serverURL = 'http://35.194.184.154:80/parse/'


class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'muthu',
      password: 'android',
      loginStatus: false,
      activeTab: '1',
      category: '',
      quantity: '',
      unitPrice: '',
      totalCost: '',
      comments: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.orderStocks = this.orderStocks.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  tryConvert(value, convert) {
    const rounded = value * convert;
    return rounded.toString();
  }

  submitLogin(e) {
    console.log("reached ........." + this.state.username);
    Parse.User.logIn(this.state.username, this.state.password, {
      success: function (user) {  
        // alert("Success chk: ");
        //window.open('./DashBoard.js', "_self");
        this.setState({
          loginStatus: true
        })
      }.bind(this),
      error: function (user, error) {
        alert("Error in app: " + error);
      }
    });
  };

  orderStocks(e) {
    // console.log("value=======" + this.state.category);
    var Stocks = Parse.Object.extend("stocks");
    var stock = new Stocks();

    stock.set("quantity", this.state.quantity);
    stock.set("unitprice", this.state.unitPrice);    
    stock.set("totalprice", this.state.totalCost);
    stock.set("category", this.state.category);
    stock.set("comments", this.state.comments);

    stock.save(null, {
      success: function(stock) {
        alert('New Stocks has been added successfully.');
      },
      error: function(stock, error) {
        alert('Failed to add new stcok, with error code: ' + error.message);
      }
    });
  };

  render() {
    if (this.state.loginStatus) {

      const qtyValue = this.state.quantity;
      const unitValue = this.state.unitPrice;
      this.state.totalCost = this.tryConvert(unitValue, qtyValue);
      //return <Redirect to='./DashBoard.js' />;
      return (
        <div className="content-login">
          <Toolbar fixed>
            <ToolbarRow>
              <ToolbarSection align="start">
                <ToolbarTitle>Inventory MSF</ToolbarTitle>
              </ToolbarSection>
              <FormField id="unlock">
                <Switch
                  checked={this.state.checked}
                  onChange={({ target: { checked } }) => {
                    this.setState({ checked })
                  }}
                />
                <label>LogOut</label>
              </FormField>
            </ToolbarRow>
          </Toolbar>
          <Content className="login-content">
            <Tabbar>
              <Tab
                active={this.state.activeTab === 1}
                onClick={() => { this.setState({ activeTab: 1 }) }}>
                Stocks
                  </Tab>
              <Tab
                active={this.state.activeTab === 2}
                onClick={() => { this.setState({ activeTab: 2 }) }}>
                Add Stocks
                  </Tab>
              <Tab
                active={this.state.activeTab === 3}
                onClick={() => { this.setState({ activeTab: 3 }) }}>
                Reports
                  </Tab>
              <span className="mdc-tab-bar__indicator"></span>

            </Tabbar>

            {this.state.activeTab == '1' &&
              <h2>
                You have tab 1 unread messages.
          </h2>
            }
            {this.state.activeTab == '2' &&

              <div>
                <br />
                <br />
                <select
                  name="category"
                  color="primary"
                  onChange={this.handleChange}
                  value={this.state.category}>
                  <option value="Choose a Category">Choose a Category</option>
                  <option value="Stationaries">Stationaries</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Dispensaries" >Dispensaries</option>
                  <option value="Cleaning Materials">Cleaning Materials</option>
                </select>
                <Textfield
                  name="quantity"
                  floatingLabel="Your Quantity"
                  helptext="For example, No. of biscuits needed"
                  helptextPersistent
                  value={this.state.quantity}
                  onChange={this.handleChange}
                />
                <Textfield
                  name="unitPrice"
                  floatingLabel="Your Unit Price"
                  helptext="For example, Rs.10/- per unit"
                  helptextPersistent
                  value={this.state.unitPrice}
                  onChange={this.handleChange}
                />
                <Textfield
                  name="totalValue"
                  floatingLabel="Your Total Price"
                  helptext="For example, units (10) * price(Rs.25/-) (Auto Calculation Total-Rs.250/-) "
                  helptextPersistent
                  value={this.state.totalCost}
                  disabled
                />
                <Textfield
                  floatingLabel="Comments Here...."
                  multiline
                  rows="8"
                  cols="40"
                  value={this.state.comments}
                  onChange={({ target: { value: comments } }) => {
                    this.setState({ comments })
                  }}
                />
                <br />
                <br />
                <br />
                <Button raised accent onClick={this.orderStocks}>Add Stocks</Button>
              </div>

            }
            {this.state.activeTab == '3' &&
              <h2>
                Reports Page
          </h2>
            }

          </Content>
        </div >
      );

    }
    return (
      <div>
        <Toolbar fixed>
          <ToolbarRow>
            <ToolbarSection align="start">
              <ToolbarTitle>Inventory MSF</ToolbarTitle>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <Content className="login-content">
          <Textfield
            name="username"
            floatingLabel="Your name or email"
            helptext="For example, Vinayak or vinayak@gmail.com"
            autoFocus={true}
            value={this.state.username}
            onChange={this.handleChange}
            style={{ width: '200px' }}
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
