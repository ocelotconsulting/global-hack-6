import React from "react";
import {render} from "react-dom";

const ShelterDetail = () =>
    <div className="shelter-detail">
        <div className="title">ShelterName</div>
        <div className="contact-info">
            <div>123 Birch St</div>
            <div>(555) 456-2989</div>
        </div>
        <div className="map">map goes here</div>
        <ul className="detail">
            <li>1.2 miles</li>
            <li>16 min walk</li>
            <li>5 min public transit</li>
            <li>0 open beds - <a href="">notify me</a></li>
        </ul>
        <div className="restrictions">
            <div>Restrictions</div>
            <ul>
                <li>men only</li>
                <li>no Trump supporters</li>
            </ul>
        </div>
    </div>

export default ShelterDetail
