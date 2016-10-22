import React from "react";
import {render} from "react-dom";
import agent from "../agent";
import SubmitCounts from "./CountsForm"
import SearchResults from "./SearchResults"
import Reserve from "./ReserveBedForm"
import ShelterDetail from "./ShelterDetail"
import SubmitPhone from "./SubmitPhone"

class BedFinder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showWaitTicker: false,
            step: 'submitCounts'
        }
    }

    submitCounts(counts) {
        this.setState({
            showWaitTicker: true,
            bedsRequested: counts
        })

        navigator.geolocation.getCurrentPosition((position) => {
            let data = {
                lat: position.coords.latitude,
                long: position.coords.longitude,
                people: counts
            }
            if (location.hostname == 'localhost') {
                // no need to tax our google API calls when we're always calling from the same place
                // this will let the server side cache work well
                data = {
                    lat: 38.632351,
                    long: -90.228033,
                    people: counts
                }
            }
            this.setState({
                position: position.coords
            })
            agent.post('/services/shelters')
                .send(data)
                .then((res) => {
                    this.setState({'searchResults': res.body})
                    this.moveTo('searchResults')
                })
        });
    }

    moveTo(step) {
        this.setState({
            showWaitTicker: false,
            step: step
        })
    }

    reserve(shelterId) {
        this.setState({shelterId: shelterId})
        this.moveTo('reserve')
    }

    details(shelterId) {
        this.setState({shelterId: shelterId})
        agent.get(`/services/shelters/${shelterId}`)
            .then((details) => {
                this.setState({shelterDetail: details.body})
                this.moveTo('shelter-detail')
            })
    }

    notifyWhenShelterIsAvailable(shelterId, phone) {
        console.log('send notification when shelter is available', shelterId)
        agent.post(`/services/notifications/subscribe?shelterId=${shelterId}&phone=${phone}`)
        .then((results) => {this.moveTo('shelter-detail')})
    }

    getLocation(shelter) {
        return this.state.searchResults.find((result) => { return result.shelter.id == shelter._id }).distance
    }

    getBody() {
        switch (this.state.step) {
            case 'submitCounts':
                return <SubmitCounts submitCounts={(counts) => this.submitCounts(counts)}/>;
            case 'searchResults':
                console.log(this.state)
                return <SearchResults bedsRequested={this.state.bedsRequested} searchResults={this.state.searchResults} reserve={(id) => this.reserve(id)} details={(id) => this.details(id)}/>;
            case 'reserve':
                return <Reserve/>;
            case 'shelter-detail':
                return <ShelterDetail shelter={this.state.shelterDetail} myLocation={this.state.position} shelterLocation={this.getLocation(this.state.shelterDetail)} requestNotification={() => this.moveTo('enter-phone')}/>;
            case 'enter-phone':
                return <SubmitPhone shelter={this.state.shelterDetail} requestNotification={(id, phone) => this.notifyWhenShelterIsAvailable(id, phone)}/>;
            default:
                return <SubmitCounts/>;
        }
    }

    render() {
        return <div>
            { this.state.showWaitTicker ? <div className="spinner"/> : '' }
            {this.getBody()}
        </div>
    }
}


export {BedFinder}
