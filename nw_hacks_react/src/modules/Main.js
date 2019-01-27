import React, { Component } from 'react';
import {TaxiMap, Side} from './Components';
import './Main.css';

class Main extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Side />
                    <TaxiMap />
                </div>
                
            </div>
            
        );
    }
}

export default Main;