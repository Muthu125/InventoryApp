import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';


import {
    Toolbar, ToolbarRow,
    ToolbarSection, ToolbarTitle, Content, Tab, Tabbar, FormField, Switch,
    Textfield, Button
} from 'react-mdc-web/lib';


class DashBoard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            activeTab: '1',
            category:'',
            quantity: '',
            unitPrice: '',
            totalCost: '',
            comments: ''
        };
        this.orderStocks = this.orderStocks.bind(this);
    }

    orderStocks(e){
        console.log()
    }

    render() {
        return (
            <div>
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
                <Content>
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
                            <Dropdown color="primary" label="Choose a Category">
                                <DropdownItem link="#/link1">Stationaries</DropdownItem>
                                <DropdownItem>Snacks</DropdownItem>
                                <DropdownItem>Dispensaries</DropdownItem>
                                <DropdownItem>Cleaning Materials</DropdownItem>
                            </Dropdown>

                            <Textfield
                                floatingLabel="Your Quantity"
                                helptext="For example, No. of biscuits needed"
                                helptextPersistent
                                value={this.state.quantity}
                                onChange={({ target: { value: quantity } }) => {
                                    this.setState({ quantity })
                                }}
                            />
                            <Textfield
                                floatingLabel="Your Unit Price"
                                helptext="For example, Rs.10/- per unit"
                                helptextPersistent
                                value={this.state.unitPrice}
                                onChange={({ target: { value: unitPrice } }) => {
                                    this.setState({ unitPrice })
                                }}
                            />
                            <Textfield
                                floatingLabel="Your Total Price"
                                helptext="For example, units (10) * price(Rs.25/-) (Auto Calculation Total-Rs.250/-) "
                                helptextPersistent
                                value={this.state.totalCost}
                                onChange={({ target: { value: totalCost } }) => {
                                    this.setState({ totalCost })
                                }}
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
<br/>
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
}

export default DashBoard;