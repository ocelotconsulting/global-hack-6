import React from "react";
import {render} from "react-dom";

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
    render() {
        const {moveForward} = this.props
        return <div className="bed-finder">
            <div className="title">Find Beds</div>

            <div className="input-row">
                <div className="btn-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('men', -1)}>-</button>
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('men', +1)}>+</button>
                </div>
                {this.state.men} Adult Males
            </div>

            <div className="input-row">
                <div className="btn-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('woman', -1)}>-</button>
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('woman', +1)}>+</button>
                </div>
                {this.state.woman} Adult Females
            </div>

            <div className="input-row">
                <div className="btn-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('children', -1)}>-</button>
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('children', +1)}>+</button>
                </div>
                {this.state.children} Children
            </div>

            <div className="input-row">
                <div className="btn-group" role="group" aria-label="...">
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('infants', -1)}>-</button>
                    <button type="button" className="btn btn-default" onClick={() => this.changeCount('infants', +1)}>+</button>
                </div>
                {this.state.infants} Infants
            </div>

            <button className="btn btn-primary" onClick={moveForward}>Find Beds</button>
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
        this.state = {step: 'submitCounts'}
    }

    moveTo(step) {
        this.setState({step: step})
    }

    reserve(shelterId) {
        this.setState({shelterId: shelterId})
        this.moveTo('reserve')
    }

    render() {
        switch (this.state.step) {
            case 'submitCounts':
                return <SubmitCounts moveForward={() => this.moveTo('searchResults')}/>;
            case 'searchResults':
                return <SearchResults reserve={(id) => this.reserve(id)}/>;
            case 'reserve':
                return <Reserve/>;
            default:
                return <SubmitCounts/>;
        }
    }
}


export {BedFinder}

