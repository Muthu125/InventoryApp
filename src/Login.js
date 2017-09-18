import React, { Component } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';
import {
  Button, Toolbar, ToolbarRow,
  ToolbarSection, ToolbarTitle, Textfield, Content, Tab, Tabbar, 
  ListItemText, ListItem, List, ListItemTextSecondary, ListDivider, Headline,
  Dialog, DialogHeader, DialogBody, DialogFooter, DialogTitle, Icon, Body1, FormField, Checkbox
} from 'react-mdc-web/lib';
import 'material-components-web/dist/material-components-web.min.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import arrowRight from './images/arrow_right.png';
import logoutIcon from './images/logout.png'

// import Update from './Update.js';
// import Dropdown from 'muicss/lib/react/dropdown';
// import DropdownItem from 'muicss/lib/react/dropdown-item';

var Parse = require('parse');
Parse.initialize("2ed7779a1e311995b116bf020d219acceb36cad4");
Parse.serverURL = 'http://130.211.75.68:80/parse/'

var DisplayUserName;

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'muthu',
      password: 'android',
      loginStatus: false,
      activeTab: 1,
      category: 'Choose a category',
      quantity: '',
      unitPrice: '',
      totalCost: '',
      comments: '',
      loadUpdate: false,
      chosenCategoryValues: [],
      returnedArrayValues: [],
      filteredArrayValues: [],
      filterStocks: false,
      startDate: moment(),
      endDate: moment(),
      checkedCategory: false,
      isOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.orderStocks = this.orderStocks.bind(this);
    this.loadStocks = this.loadStocks.bind(this);
    this.handleListClick = this.handleListClick.bind(this);
    this.updateStocks = this.updateStocks.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.filterStocks = this.filterStocks.bind(this);
    this.deleteStocks = this.deleteStocks.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date
    });
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date
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

  toggleChange() {
    this.setState({
      checkedCategory: true
    })
  }

  loadStocks(e) {
    var Stocks = Parse.Object.extend("stocks");
    var query = new Parse.Query(Stocks);

    query.find().then((results) => {
      if (results.length > 0) {
        this.setState({
          loadUpdate: false,
          returnedArrayValues: results
        });
      } else {
        alert("No data available !!!")
      }
    }, (error) => {
      console.log(error)
    })

  }

  logoutUser(e) {
    // var currentUser = Parse.User.current();
    // console.log("logout reached ........." + currentUser.getUsername().toString());

    Parse.User.logOut().then(() => {
      this.setState({
        loginStatus: false
      })
      // var currentUser = Parse.User.current();  // this will now be null
      // console.log("logout reached ........." + currentUser.getUsername().toString());
    });
  }

  submitLogin(e) {
    // console.log("reached ........." + this.state.username);
    Parse.User.logIn(this.state.username, this.state.password, {
      success: function (user) {
        DisplayUserName = Parse.User.current().getUsername();
        //window.open('./DashBoard.js', "_self");
        this.setState({
          loginStatus: true,
          filterStocks: false
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

    if (this.state.category === "Choose a category") {
      alert("Select a category")
    } else if (this.state.quantity.toString().trim().length === 0) {
      alert("Quantity cannot e empty")
    } else if (this.state.unitPrice.toString().trim().length === 0) {
      alert("UnitPrice cannot e empty")
    } else {

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
            comments: '',
            stockdate: ''
          })
          this.loadStocks()
        }.bind(this),
        error: function (stock, error) {
          alert('Failed to add new stcok, with error code: ' + error.message);
        }
      })
    }
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
      this.loadStocks()
  }

  handleListClick(dataT) {
    this.setState({
      loadUpdate: true,
      chosenCategoryValues: dataT
    });
  }

  filterStocks(e) {

    var FilterStocks = Parse.Object.extend("stocks");
    var query = new Parse.Query(FilterStocks);

    var d1 = new Date(this.state.startDate);
    var d2 = new Date(this.state.endDate);

    if (d1.toLocaleDateString() === d2.toLocaleDateString()) {
      alert("Dates are equal !!!")
    } else if (d2.toLocaleDateString() < d1.toLocaleDateString()) {
      alert("To date should not be lesser than From date!")
    } else if (this.state.category === "Choose a category" && this.state.checkedCategory) {
      alert('Select a category')
    } else {

      if (this.state.checkedCategory) {
        query.equalTo("category", this.state.category);
      }
      query.greaterThanOrEqualTo("createdAt", new Date(d1.toLocaleDateString()));
      query.lessThanOrEqualTo("createdAt", new Date(d2.toLocaleDateString()));
      query.find({
        success: function (object) {
          // alert("success : " + object.length);
          alert('Stocks Successfully filtered !!!  ' + object.length);

          this.setState({
            activeTab: 1,
            category: 'Choose a Category',
            startDate: moment(),
            endDate: moment(),
            checkedCategory: false
          })
          if (object.length > 0) {
            // console.log("object length ====" + object.length);
            query.find().then((object) => {
              this.setState({
                filterStocks: true,
                filteredArrayValues: object
              });
            }, (error) => {
              console.log(error)
            })
          }
        }.bind(this),
        error: function (error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    }
  }

  deleteStocks(e) {
    var Stocks = Parse.Object.extend("stocks");
    var stock = new Stocks();
    stock.id = this.state.chosenCategoryValues.id;
    stock.destroy({
      success: function (myObject) {
        alert("Deleted record.")
        this.loadStocks()
      }.bind(this),
      error: function (myObject, error) {
        alert("Error in delete: " + error)
      }
    });
  }

  updateStocks(e) {
    var Stocks = Parse.Object.extend("stocks");
    var stock = new Stocks();
    stock.id = this.state.chosenCategoryValues.id;

    if (this.state.quantity.toString().trim().length > 0) {
      stock.set("quantity", this.state.quantity);
      stock.set("comments", this.state.comments);

      stock.save(null, {
        success: function (stock) {
          alert('Stocks has been updated successfully.');
          this.setState({
            quantity: '',
            comments: ''
          })
          this.loadStocks()
        }.bind(this),
        error: function (stock, error) {
          alert('Failed to add new stcok, with error code: ' + error.message);
        }
      })
    } else {
      alert("Quantity cannot be empty");
    }
  };


  render() {
    if (this.state.loginStatus) {

      const qtyValue = this.state.quantity;
      const unitValue = this.state.unitPrice;
      //this.tryConvert(unitValue, qtyValue);
      this.state.totalCost = this.tryConvert(unitValue, qtyValue);

      if (this.state.returnedArrayValues.length > 0 && this.state.activeTab === 1
        && !this.state.filterStocks || this.state.filterStocks) {
        var data;
        if (this.state.filteredArrayValues.length > 0 && this.state.filterStocks) {
          data = this.state.filteredArrayValues;
        } else {
          data = this.state.returnedArrayValues;
        }

        var that = this;
        var listItems = data.map(function (dataT, i) {
          return (
            <List key={i} style={{color:'black',  fontsize: '140px'}}>
              <ListItem key={i} onClick={that.handleListClick.bind(this, dataT)} >
                <Icon name="shopping cart" />
                <ListItemText key={i}>{i + ". " + dataT.get('category')}
                  <ListItemTextSecondary key={i}>{"Rem.Qty:" + dataT.get('quantity')}</ListItemTextSecondary>
                </ListItemText>
                <img src={arrowRight} alt="rightarrow" />
              </ListItem>
              <ListDivider />
            </List>
          )
        });
      } //else if (this.state.filteredArrayValues.length > 0 && this.state.activeTab === 1 && this.state.filterStocks) {
      //   const data = this.state.filteredArrayValues;
      //   var that = this;
      //   var listItems = data.map(function (dataT, i) {
      //     return (
      //       <List key={i}>
      //         <ListItem key={i} onClick={that.handleListClick.bind(this, dataT)} >
      //           {/* <Icon name="biscuit" /> */}
      //           <ListItemText key={i}>{i + ". " + dataT.get('category')}
      //             <ListItemTextSecondary key={i}>{"Rem.Qty:" + dataT.get('quantity')}</ListItemTextSecondary>
      //           </ListItemText>
      //         </ListItem>
      //         <ListDivider />
      //       </List>
      //     )
      //   });
      // }

      return (
        <div className="content-login">
          <Toolbar fixed style={{color: 'cyan'}}>
            <ToolbarRow>
              <ToolbarSection align="start">
                <ToolbarTitle>Inventory MSF</ToolbarTitle>
              </ToolbarSection>
              {
                DisplayUserName.length > 0 &&
                <Body1 style={{color:'yellow'}}> {DisplayUserName} </Body1>
              }
              <img className="logoutImg" src={logoutIcon} alt="logout" onClick={this.logoutUser} />
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
                onClick={() => {
                  this.setState({
                    activeTab: 2, loadUpdate: false,
                    filteredArrayValues: '', filterStocks: false
                  })
                }}>
                Add Stocks
                  </Tab>
              <Tab
                active={this.state.activeTab === 3}
                onClick={() => {
                  this.setState({
                    activeTab: 3, loadUpdate: false,
                    filteredArrayValues: '', filterStocks: false
                  })
                }}>
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
                {/* <Update /> */}


                <Dialog
                  open={this.state.isOpen}
                  onClose={() => { this.setState({ isOpen: false }) }}>
                  <DialogHeader>
                    <DialogTitle>Delete record?</DialogTitle>
                  </DialogHeader>
                  <DialogBody>
                    Stocks and its details will be deleted !!!
                  </DialogBody>
                  <DialogFooter>
                    <Button compact onClick={() => { this.setState({ isOpen: false }) }}>No</Button>
                    <Button compact onClick={() => {
                      this.deleteStocks(),
                        this.setState({ isOpen: false })
                    }}>Yes</Button>
                  </DialogFooter>
                </Dialog>

                <br />
                <label style={{color:'Darkgrey'}}> Category </label> <br />
                <Headline> {this.state.chosenCategoryValues.get('category')} </Headline> <br />
                <label> Remaining Quantity :</label> <br />
                <label> {this.state.chosenCategoryValues.get('quantity')} </label>
                <Textfield
                  name="quantity"
                  required
                  floatingLabel="Update new Quantity"
                  helptext="For ex:, No. of biscuits available"
                  helptextPersistent
                  value={this.state.quantity}
                  onChange={this.handleChange}
                />
                <br /> <br />
                <Textfield
                  floatingLabel="Comments Here...."
                  multiline
                  rows="8"
                  cols="40"
                  value={this.state.comments}
                  onChange={({ target: { value: comments } }) => {
                    this.setState({ comments })
                  }}
                /> <br />
                <Button raised primary onClick={this.updateStocks}>Update Stock</Button>
                <span>    </span>
                <Button raised accent onClick={() => { this.setState({ isOpen: true }) }}>Delete Stock</Button>
              </div>
            }

            {this.state.activeTab === 2 &&
              <div>
                <br />
                <select
                  name="category"
                  required
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
                  required
                  floatingLabel="Your Quantity"
                  helptext="For example, No. of biscuits needed"
                  helptextPersistent
                  value={this.state.quantity}
                  onChange={this.handleChange}
                />
                <Textfield
                  name="unitPrice"
                  required
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
              <div className="center-div">
                <label> From Date : </label> <br />
                <DatePicker
                  dateFormat="DD/MM/YYYY"
                  required
                  selected={this.state.startDate}
                  selectsStart
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleChangeStart}
                />  <br /> <br />
                <label> To Date : </label> <br />
                <DatePicker
                  dateFormat="DD/MM/YYYY"
                  required
                  selected={this.state.endDate}
                  selectsEnd
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onChange={this.handleChangeEnd}
                /> <br />
                <FormField id="labeled-checkbox">
                  <Checkbox
                    checked={this.state.checkedCategory}
                    onChange={({ target: { checked } }) => {
                      this.setState({
                        checkedCategory: checked
                      })
                    }}
                  />
                  <label>Filter by Category</label>
                </FormField> <br />
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
                </select> <br /> <br />
                <Button raised primary onClick={this.filterStocks}>Filter Stocks</Button>
              </div>
            }

          </Content>
        </div >
      );

    }

    return (
      <div className="before-login">
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
            required
            floatingLabel="Your name or email"
            helptext="For example, Vinayak or vinayak@gmail.com"
            autoFocus={true}
            value={this.state.username}
            onChange={this.handleChange}
            style={{ width: '200px' }}
          />
          <Textfield
            name="password"
            required
            floatingLabel="Password"
            type="password"
            minLength={8}
            helptext="Your password must be at least 8 characters"
            value={this.state.password}
            onChange={this.handleChange}
          /> <br /> <br />
          <Button raised accent onClick={this.submitLogin}>Login</Button>
        </Content>
      </div>
    );
  }
}

export default Login;
