import React from "react";
import {render} from "react-dom";
import Map from './Map'

const ShelterDetail = ({shelter, requestNotification, shelterLocation, myLocation}) => {
    function notify(e) {
        e.preventDefault()
        requestNotification(shelter.id)
    }

    console.log(shelter)
    return (
        <div className="shelter-detail">
            <div className="title">{shelter.name}</div>
            <div className="contact-info">
                <div>{shelter.street}</div>
                <div>{shelter.city} {shelter.county}</div>
                <div>{shelter.contact.phone}</div>
            </div>
            <Map myLocation={myLocation} shelterLocation={shelter}/>
            <ul className="detail">
                <li>{shelterLocation.walking.distance.text} / {shelterLocation.walking.duration.text}</li>
                <li className="beds">
                    <div className="sub-title">Beds</div>
                    <ul>
                        {shelter.beds.map((bed) => {
                            return <li>{bed.total_beds - bed.total_taken}/{bed.total_beds} beds available to {bed.who.join(', ')} free</li>
                        })}
                    </ul>
                    <div><a href="" onClick={notify}>notify me of openings</a></div>
                </li>
            </ul>
            <div className="restrictions">
                <div className="sub-title">Restrictions</div>
                <ul>
                    { shelter.restrictions.map((restriction) => <li key={restriction}>{restriction}</li>) }
                </ul>
            </div>
        </div>
    )
}

export default ShelterDetail
