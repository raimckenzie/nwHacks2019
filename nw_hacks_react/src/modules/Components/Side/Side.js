import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './Side.css'

class Side extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signin: '',
            username: '',
            user_id: '',
            show_login: true,
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
                show_login: false,
            })
        }).catch({});
    }

    login() {
        if (!this.state.show_login) {
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
        if (this.state.show_login) {
            return '';
        }

        return (
            <div>
                <h1 className="">From</h1><br />
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
                Choose start location</button><br/><br/>
                <h1 className="">To</h1><br />
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
                        })
                    }
                    }
                >Find A Ride!
                </button>
            </div>
        );
    }



    render() {
        return (
            <div className='col-lg-4 side'>
                {
                    this.login()
                } 
                {
                    this.control()
                }
            </div>
        );
    }
}

export default Side;