import React, { Component } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import logo from './logo.svg';
//import './App.css';
import {
  Button, Toolbar, ToolbarRow,
  ToolbarSection, ToolbarTitle, Textfield, Content, Tab, Tabbar, FormField, Switch,
  ListItemText, ListItem, List, ListItemTextSecondary, ListDivider,
} from 'react-mdc-web/lib';
import 'material-components-web/dist/material-components-web.min.css';
import Update from './Update.js';
// import Dropdown from 'muicss/lib/react/dropdown';
// import DropdownItem from 'muicss/lib/react/dropdown-item';

var Parse = require('parse');
Parse.initialize("2ed7779a1e311995b116bf020d219acceb36cad4");
Parse.serverURL = 'http://130.211.75.68:80/parse/'


class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'muthu',
      password: 'android',
      loginStatus: false,
      activeTab: 1,
      category: '',
      quantity: '',
      unitPrice: '',
      totalCost: '',
      comments: '',
      loadUpdate: false,
      chosenCategoryValues: [],
      returnedArrayValues: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.orderStocks = this.orderStocks.bind(this);
    this.loadStocks = this.loadStocks.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
    // this.loadUpdateComponent = this.loadUpdateComponent.bind(this);
    // this.loadBasicTabs = this.loadBasicTabs.bind(this)
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  tryConvert(value, convert) {
    // this.setState({
    //   totalCost :  value * convert
    // });
    const rounded = value * convert;
    // this.state.totalCost = rounded.toString();
    return rounded.toString();
  }

  loadStocks(e) {
    var Stocks = Parse.Object.extend("stocks");
    var query = new Parse.Query(Stocks);

    query.find().then((results) => {
      if (results.length > 0) {
        this.setState({
          returnedArrayValues: results
        });
      } else {
        alert("No data available !!!")
      }
    }, (error) => {
      console.log(error)
    })

  }

  submitLogin(e) {
    // console.log("reached ........." + this.state.username);
    Parse.User.logIn(this.state.username, this.state.password, {
      success: function (user) {
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
    var Stocks = Parse.Object.extend("stocks");
    var stock = new Stocks();

    stock.set("quantity", this.state.quantity);
    stock.set("unitprice", this.state.unitPrice);
    stock.set("totalprice", this.state.totalCost);
    stock.set("category", this.state.category);
    stock.set("comments", this.state.comments);

    stock.save(null, {
      success: function (stock) {
        alert('New Stocks has been added successfully.');
        this.setState({
          activeTab: 1,
          category: 'Choose a Category',
          quantity: '',
          unitPrice: '',
          totalCost: '',
          comments: ''
        })
        this.loadStocks()
      }.bind(this),
      error: function (stock, error) {
        alert('Failed to add new stcok, with error code: ' + error.message);
      }
    })
  };

  // loadBasicTabs() {
  //   if (this.state.activeTab === 1)
  //     return <Update />
  //   else if (this.state.activeTab === 2)
  //     return <DashBoard />
  //   else if (this.state.activeTab === 3)
  //     return <DashBoard />
  // };

  componentDidMount() {
    if (this.state.activeTab === 1)
      //console.log("Component mounted =======")
      this.loadStocks()
  }

  handleListClick(dataT) {
    this.setState({
      loadUpdate: true
    });
    const data = dataT.id;
    console.log("List Click =======" + data);
    // this.loadUpdateComponent()
  }

  render() {
    if (this.state.loginStatus) {

      const qtyValue = this.state.quantity;
      const unitValue = this.state.unitPrice;
      //this.tryConvert(unitValue, qtyValue);
      this.state.totalCost = this.tryConvert(unitValue, qtyValue);

      if (this.state.returnedArrayValues.length > 0 && this.state.activeTab === 1) {
        const data = this.state.returnedArrayValues;
        var that = this;
        var listItems = data.map(function (dataT, i) {
          //console.log("Checking 2222 @@@@ ======" + dataT.get('category'));
          return (
            <List key={i}>
              <ListItem key={i} onClick={that.handleListClick.bind(this, dataT)}>
                {/* <Icon name="biscuit" /> */}
                <ListItemText key={i}>{i + ". " + dataT.get('category')}
                  <ListItemTextSecondary key={i}>{"Rem.Qty:" + dataT.get('quantity')}</ListItemTextSecondary>
                </ListItemText>
              </ListItem>
              <ListDivider />
            </List>
          )
        });
      }

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
                onClick={() => { this.setState({activeTab: 2, loadUpdate : false}) 
                }}>
                Add Stocks
                  </Tab>
              <Tab
                active={this.state.activeTab === 3}
                onClick={() => { this.setState({ activeTab: 3, loadUpdate : false}) }}>
                Reports
                  </Tab>
              {/* <span className="mdc-tab-bar__indicator"></span>  */}
              {/* <Content>
            {this.loadBasicTabs()}
          </Content> */}
            </Tabbar>

            {this.state.activeTab === 1 && !this.state.loadUpdate &&
              <div>
                {listItems}
              </div>
            }

            {this.state.activeTab === 1 && this.state.loadUpdate &&
              <div>
                <Update />
              </div>
            }

            {this.state.activeTab === 2 &&
              <div>
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
                  name="totalCost"
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
                <Button raised accent onClick={this.orderStocks}>Add Stocks</Button>
              </div>
            }

            {this.state.activeTab === 3 &&
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
