import React from 'react';
import {
    Headline, Subheading1,  Textfield
  } from 'react-mdc-web/lib';

class Update extends React.Component {

    readStockDetails(e) {
        console.log()
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
            </div >
        );
    }
}

export default Update;