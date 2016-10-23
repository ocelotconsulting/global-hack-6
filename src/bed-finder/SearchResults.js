import React from "react"
import {render} from "react-dom"
import moment from "moment"
import _ from 'underscore'

const SearchResults = ({bedsRequested, searchResults, reserve, details}) => {
    return (
        <div className="bed-finder-results">
            <div className="title">Open Beds Nearby</div>
            <div>
                {searchResults.map((result) => <SearchResult key={result.shelter.id} bedsRequested={bedsRequested} result={result} reserve={reserve} details={details}/>)}
            </div>
        </div>
    )
}

const SearchResult = ({result, bedsRequested, reserve, details}) => {
    const closing = moment(result.shelter.hours_for_intake.closed, "HHmm")
    const closingMessage = closing.isValid() ? `registration closes at ${closing.fromNow()}` : 'registration closing time unknown'
    let matches = true
    _(bedsRequested).pairs().forEach(([key, val]) => {
        if (val > 0) {
            let bedSet = result.shelter.beds.find((beds) => _(beds.who).contains(key))
            if (!bedSet || (bedSet.total_beds - bedSet.total_taken) < val) {
                matches = false
            }
        }
    })

    return (
        <div className="result">
            <div className="shelter-name"><a href="#" onClick={() => details(result.shelter.id)}>{result.shelter.name}</a></div>
            <a href="#" className="register-link" onClick={() => reserve(result.shelter.id)}>reserve</a>
            <div className="details">
                <ul>
                    <li>{result.distance.walking.distance.text} ({result.distance.walking.duration.text} walking)</li>
                    <li>{matches ? <div className="open-beds">currently has enough open beds</div> : 'unlikely match'}</li>
                    <li>{closingMessage}</li>
                </ul>
            </div>

            <div className="restrictions">
                <div className="subtitle">Restrictions</div>
                <ul>
                    {(result.shelter.restrictions.length > 0) ? (
                        result.shelter.restrictions.map((restriction) => <li key={restriction}><i className="fa fa-exclamation-circle"/>{restriction}</li>)
                    ) : (
                        <li>no known restrictions</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default SearchResults

