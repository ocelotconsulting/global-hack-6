import React from "react";
import {render} from "react-dom";
import agent from "../agent";
import SubmitCounts from "./CountsForm"
import SearchResults from "./SearchResults"
import Reserve from "./ReserveBedForm"
import ShelterDetail from "./ShelterDetail"

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
                .then((res) => console.log(res))
            console.log(data)
            this.moveTo('searchResults')
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

    getBody() {
        switch (this.state.step) {
            case 'submitCounts':
                return <SubmitCounts submitCounts={(counts) => this.submitCounts(counts)}/>;
            case 'searchResults':
                return <SearchResults reserve={(id) => this.reserve(id)} details={(id) => this.details(id)}/>;
            case 'reserve':
                return <Reserve/>;
            case 'shelter-detail':
                return <ShelterDetail/>;
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

