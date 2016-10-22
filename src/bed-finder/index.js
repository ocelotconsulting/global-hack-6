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
        this.setState({showWaitTicker: true})

        navigator.geolocation.getCurrentPosition((position) => {
            const data = {
                lat: position.coords.latitude,
                long: position.coords.longitude,
                people: counts
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

    notifyWhenShelterIsAvailable(shelterId) {
        console.log('send notification when shelter is available', shelterId)
        this.moveTo('shelter-detail')
    }

    getLocation(shelter) {
        return this.state.searchResults.find((result) => { return result.shelter.id == shelter._id }).distance
    }

    getBody() {
        switch (this.state.step) {
            case 'submitCounts':
                return <SubmitCounts submitCounts={(counts) => this.submitCounts(counts)}/>;
            case 'searchResults':
                return <SearchResults searchResults={this.state.searchResults} reserve={(id) => this.reserve(id)} details={(id) => this.details(id)}/>;
            case 'reserve':
                return <Reserve/>;
            case 'shelter-detail':
                return <ShelterDetail shelter={this.state.shelterDetail} myLocation={this.state.position} shelterLocation={this.getLocation(this.state.shelterDetail)} requestNotification={() => this.moveTo('enter-phone')}/>;
            case 'enter-phone':
                return <SubmitPhone requestNotification={(id) => this.notifyWhenShelterIsAvailable(id)}/>;
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

