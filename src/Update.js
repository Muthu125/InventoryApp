import React from 'react';
import {
    Headline, Subheading1,  Textfield, Button
  } from 'react-mdc-web/lib';

class Update extends React.Component {

    constructor(){
        super();
        this.readStockDetails = this.readStockDetails.bind(this);
    }

    readStockDetails(e) {
       
        console.log("Info ========= "+ this.props.callbackFromParent());
    }

    render() {
        return (
            <div>
             <Subheading1> Category </Subheading1>
             <Headline> Snacks </Headline>
             <Textfield
             name="quantity"
             floatingLabel="Update ur Remaining Quantity"
             helptext="For example, No. of biscuits in stock"
             helptextPersistent
           />
           <Button raised accent onClick={this.readStockDetails}>check Stocks</Button>
            </div >
        );
    }
}

export default Update;