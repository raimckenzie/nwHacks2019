import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import './TaxiMap.css';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.css';

class TaxiMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
     
        };
    }

    componentDidMount() {
        const map = L.map('taxi-map', {
            center: [49.262745, -123.2471257],
            zoom: 13,
        });
        this.setState({
            map,
        })
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        this.props.setupDraw(map);

        map.on('draw:created', (e) => {
            map.addLayer(e.layer);
            this.props.setLoc(e.layer.getLatLng());
        });
    }

    render() {
        return (
            <div id='taxi-map' className="col-lg-8"/>
        );
    }
}

export default TaxiMap;