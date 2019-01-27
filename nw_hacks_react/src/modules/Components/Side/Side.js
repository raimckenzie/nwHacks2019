import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Side.css'

class Side extends Component {
    render() {
        return (
            <div className='col-lg-4'>
                <h1>Sign in</h1>
                <input type='text' className='form-control'/>
                <button className='btn btn-secondary'>Submit</button>
            </div>
        );
    }
}

export default Side;