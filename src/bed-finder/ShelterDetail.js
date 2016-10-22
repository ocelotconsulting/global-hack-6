import React from "react";
import {render} from "react-dom";
import Map from './Map'

const ShelterDetail = ({shelter, requestNotification, shelterLocation, myLocation}) => {
    function notify(e) {
        e.preventDefault()
        requestNotification(shelter.id)
    }

    console.log(shelter)
    console.log(shelterLocation)

    return (
        <div className="shelter-detail">
            <div className="title">{shelter.name}</div>
            <div className="contact-info">
                <div>{shelter.street}</div>
                <div>{shelter.city} {shelter.county}</div>
                <div>{shelter.contact.phone}</div>
            </div>
            <Map myLocation={myLocation} shelterAddress={`${shelter.street}, ${shelter.city}, ${shelter.state}`}/>
            <ul className="detail">
                <li>{shelterLocation.walking.distance.text}</li>
                <li>{shelterLocation.walking.duration.text}</li>
                <li>0 open beds - <a href="" onClick={notify}>notify me</a></li>
            </ul>
            <div className="restrictions">
                <div>Restrictions</div>
                <ul>
                    { shelter.restrictions.map((restriction) => <li key={restriction}>{restriction}</li>) }
                </ul>
            </div>
        </div>
    )
}

export default ShelterDetail
