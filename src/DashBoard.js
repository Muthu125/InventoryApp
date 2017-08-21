import React from 'react';
import {
    Toolbar, ToolbarRow,
    ToolbarSection, ToolbarTitle, Content, Tab, Tabbar, FormField, Switch
} from 'react-mdc-web/lib';

class DashBoard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: '1'
        };
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
                </Content>
            </div>
        );
    }
}

export default DashBoard;