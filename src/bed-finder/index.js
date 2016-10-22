import React from "react";
import {render} from "react-dom";
import agent from "../agent";

class SubmitCounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            men: 0,
            women: 0,
            children: 0,
            infants: 0
        };
    }
    changeCount(field, direction) {
        const newState = {}
        newState[field] = (this.state[field] || 0) + direction
        if (newState[field] < 0)
            newState[field] = 0
        this.setState(newState)
    }
    submitDisabled() {
        return (
            this.state.men == 0 &&
            this.state.women == 0 &&
            this.state.children == 0 &&
            this.state.infants == 0
        )
    }
    render() {
        const {submitCounts} = this.props
        return <div className="bed-finder">
            <div className="title">Find Beds</div>

            <div className="input-row">
                <div className="btn-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('men', -1)}>-</button>
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('men', +1)}>+</button>
                </div>
                {this.state.men} Adult {this.state.men == 1 ? 'Man' : 'Men'}
            </div>

            <div className="input-row">
                <div className="btn-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('women', -1)}>-</button>
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('women', +1)}>+</button>
                </div>
                {this.state.women} Adult {this.state.women == 1 ? 'Woman' : 'Women'}
            </div>

            <div className="input-row">
                <div className="btn-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('children', -1)}>-</button>
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('children', +1)}>+</button>
                </div>
                {this.state.children} {this.state.children == 1 ? 'Child' : 'Children'}
            </div>

            <div className="input-row">
                <div className="btn-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('infants', -1)}>-</button>
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('infants', +1)}>+</button>
                </div>
                {this.state.infants} {this.state.infants == 1 ? 'Infant' : 'Infants'}
            </div>

            <button className="btn btn-primary" onClick={() => submitCounts(this.state)} disabled={this.submitDisabled()}>Find Beds</button>
        </div>
    }
}

const SearchResults = ({reserve}) => {
    const results = [
        {id: 1, name: 'Some Shelter Name'},
        {id: 2, name: 'Some Other Shelter'},
        {id: 3, name: 'Yet Another Shelter'}
    ]
    return (
        <div className="bed-finder-results">
            <div className="title">Open Beds Nearby</div>
            <div>
                {results.map((result) => <SearchResult key={result.id} result={result} reserve={reserve}/>)}
            </div>
            <div className="result">
                <a href="">notifications of new openings</a>
            </div>
        </div>
    )
}

const SearchResult = ({result, reserve}) =>
    <div className="result">
        <div className="shelter-name">{result.name}</div>
        <a href="#" className="register-link" onClick={() => reserve(result.id)}>reserve</a>
        <div className="details">
            <ul>
                <li>1.3 miles (<a href="">directions</a>)</li>
                <li>7 open beds</li>
                <li>registration closes at 10pm</li>
            </ul>
        </div>

        <div className="restrictions">
            <div className="subtitle">Restrictions</div>
            <ul>
                <li>men only</li>
                <li>must be involved with coc</li>
            </ul>
        </div>
    </div>

const Reserve = () =>
    <div className="register-bed">
        <div className="title">Confirm Reservation</div>
        <form>
            <div className="form-group">
                <label>Name</label>
                <input className="form-control" placeholder="optional"/>
            </div>
            <button className="btn btn-primary">Confirm</button>
            <div style={{display: 'none'}} className="alert alert-warning" role="alert"></div>
        </form>
    </div>

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

    getBody() {
        switch (this.state.step) {
            case 'submitCounts':
                return <SubmitCounts submitCounts={(counts) => this.submitCounts(counts)}/>;
            case 'searchResults':
                return <SearchResults reserve={(id) => this.reserve(id)}/>;
            case 'reserve':
                return <Reserve/>;
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

