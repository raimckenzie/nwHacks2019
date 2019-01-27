import React, { Component } from 'react';
import {TaxiMap, Side} from './Components';
import L from 'leaflet';
import './Main.css';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            draw: null,
            start: true,
            start_loc: null,
            end_loc: null,
        }
    }

    setupDraw(map) {
        this.setState({
            draw: new L.Draw.CircleMarker(map),
        })
    }

    enableDraw(start) {
        this.setState({
            start,
        })
        console.log(start)
        this.state.draw.enable();
    }

    setLoc(loc) {
        if (this.state.start) {
            this.setState({
                start_loc: loc,
            })
        }
        else {
            this.setState({
                end_loc: loc,
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Side
                        enableDraw={(start) => this.enableDraw(start)}
                        start_loc={this.state.start_loc}
                        end_loc={this.state.end_loc}
                    />
                    <TaxiMap
                        setupDraw={(map) => this.setupDraw(map)}
                        setLoc={(start, loc) => this.setLoc(start, loc)}
                    />
                </div>
                
            </div>
            
        );
    }
}

export default Main;