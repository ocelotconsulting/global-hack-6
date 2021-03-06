import React from "react";
import {render} from "react-dom";
import Map from './Map'
import moment from "moment"

const ShelterDetail = ({shelter, requestNotification, shelterLocation, myLocation, reservationConfirmation}) => {
    function notify(e) {
        e.preventDefault()
        requestNotification(shelter.id)
    }

    const closing = moment(shelter.hours_for_intake.closed, "HHmm")
    const reservationMessage = closing.isValid() ? `Your reservation is confirmed, registration closes ${closing.fromNow()}` : 'Your reservation is confirmed, registration closing time is unknown'
    const reservationClass = (reservationConfirmation) ? 'alert alert-success' : ''

    console.log(shelter)
    return (
        <div className="shelter-detail">
            <div className={reservationClass}>{(reservationConfirmation) ? reservationMessage : ''}</div>
            <div className="title">{shelter.name}</div>
            <div className="contact-info">
                <div>{shelter.street}</div>
                <div>{shelter.city} {shelter.county}</div>
                <div>{shelter.contact.phone}</div>
            </div>
            <Map myLocation={myLocation} shelterLocation={shelter}/>
            <ul className="detail">
                <li><img src="/walking-man.png" className="walking-man"/>{shelterLocation.walking.distance.text} / {shelterLocation.walking.duration.text}</li>
                <li className="beds">
                    <div className="sub-title">Beds</div>
                    <ul>
                        {shelter.beds.map((bed) => {
                            return <li key={bed.who}>{bed.total_beds - bed.total_taken}/{bed.total_beds} beds available to {bed.who.join(', ')} free</li>
                        })}
                    </ul>
                    <div><a href="" onClick={notify}>notify me of openings</a></div>
                </li>
            </ul>
            <div className="restrictions">
                <div className="sub-title">Restrictions</div>
                <ul>
                    { shelter.restrictions.map((restriction) => <li key={restriction}><i className="fa fa-exclamation-circle"/>{restriction}</li>) }
                </ul>
            </div>
        </div>
    )
}

export default ShelterDetail
