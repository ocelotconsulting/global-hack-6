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
            agent.post('/services/shelters')
                .send(data)
                .then((res) => {
                    this.setState({'searchResults': res.body})
                    console.log(res.body)
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
        this.moveTo('shelter-detail')
    }

    notifyWhenShelterIsAvailable(shelterId) {
        console.log('send notification when shelter is available', shelterId)
        this.moveTo('shelter-detail')
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
                return <ShelterDetail shelter={{}} requestNotification={() => this.moveTo('enter-phone')}/>;
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

