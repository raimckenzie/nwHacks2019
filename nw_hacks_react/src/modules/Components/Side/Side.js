import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import wego from '../../../../src/WeGo.png';
import savings from '../../../../src/savings.png';
import co2e from '../../../../src/co2.png';
import './Side.css'

class Side extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin: '',
            username: '',
            user_id: '',
            show_login: 0,
        }
    }

    onSubmit() {
        axios.post('http://localhost:8080/api/signin', {
            "username": this.state.signin,
        }).then((e) => {
            const resp = e.data.payload;
            console.log(resp)
            this.setState({
                username: resp.username,
                user_id: resp.userID,
                show_login: 1,
            })
        }).catch({});
    }

    login() {
        if (this.state.show_login !== 0) {
            return '';
        }

        return (
            <div>
                <h1 className="">Sign in</h1><br />
                <input
                    type='text'
                    placeholder='username'
                    className='form-control'
                    onChange={e => this.setState({signin: e.target.value })}
                />
                <input
                    type='password'
                    placeholder='password'
                    className='form-control'
                />
                <br />
                <button
                    className='btn btn-secondary float-right'
                    onClick={() => this.onSubmit()}
                >Log on</button>
            </div>
        );
    }

    control() {
        if (this.state.show_login !== 1) {
            return '';
        }

        return (
            <div>
                <h2 className="">From</h2>
                <input
                    type='text'
                    className='form-control'
                    value={(this.props.start_loc === null) ? '' : this.props.start_loc.lat}
                    readOnly
                />
                <input
                    type='text'
                    className='form-control'
                    value={(this.props.start_loc === null) ? '' : this.props.start_loc.lng}
                    readOnly
                />
                <button className='btn btn-primary float-right' onClick={() => this.props.enableDraw(true)}>
                Choose start location</button>
                <h2 className="">To</h2><br />
                <input
                    type='text'
                    className='form-control'
                    value={(this.props.end_loc === null) ? '' : this.props.end_loc.lat}
                    readOnly
                />
                <input
                    type='text'
                    className='form-control'
                    value={(this.props.end_loc === null) ? '' : this.props.end_loc.lng}
                    readOnly
                />
                <button className='btn btn-primary float-right' onClick={() => this.props.enableDraw(false)}>
                
                Choose end location</button><br/><br/><br/>
                <input
                    type='text'
                    className='form-control'
                    placeholder="Wait for this ride? (min)"
                />
                <button
                    className="btn btn-success btn-block"
                    onClick={() => {
                        axios.post("http://localhost:8080/api/requestRide", {
                            "user_id": this.state.user_id,
                            "username": this.state.username,
                            "startLoc": {
                                "lon": this.props.start_loc.lng,
                                "lat": this.props.start_loc.lat,
                            },
                            "endLoc": {
                                "lon": this.props.end_loc.lng,
                                "lat": this.props.end_loc.lat,
                            },
                            "expires": 5,
                        }).then((e) => {
                            console.log(e)
                            this.setState({
                                show_login: 2,
                            })
                        })
                    }
                    }
                >Find A Ride!
                </button>
            </div>
        );
    }

    processing() {
        if (this.state.show_login !== 2) {
            return '';
        }

        setTimeout(() => {
            this.setState({
                show_login: 3
            })
        }, 5000);

        return (
            <h1 className="">Processing...</h1>
        )
    }

    payment() {
        if (this.state.show_login !== 3) {
            return '';
        }

        let fare;
        let co2;

        axios.post('http://localhost:8080/api/getSavings', {
            "username": this.state.username,
        }).then((e) => {
            console.log(e)
            fare = e.data.payload.costSavings;
            co2 = e.data.payload.emissionSavings;
        })

        return (
            <div>
                <h1 className="">Found A Ride!</h1>
                <img src = {savings} className='icon' style ={{
                    width: '25%',
                }} />Fare Saved:
                <input
                    type='text'
                    className='form-control'
                    value={'$3.35'}
                    readOnly
                />
                <img src = {co2e} className='icon' style ={{
                    width: '25%',
                }} />
                CO2 Emissions Saved:
                <input
                    type='text'
                    className='form-control'
                    value={'829.4g'}
                    readOnly
                />
            </div>
        )
    }


    render() {
        return (
            <div className='col-lg-4 side'>
            <img src = {wego} style ={{
                    width: '75%',
                }} />
                {
                    this.login()
                } 
                {
                    this.control()
                }
                {
                    this.processing()
                }
                {
                    this.payment()
                }
            </div>
        );
    }
}

export default Side;