import React from "react"
import {render} from "react-dom"
import moment from "moment"

const SearchResults = ({searchResults, reserve, details}) => {
    return (
        <div className="bed-finder-results">
            <div className="title">Open Beds Nearby</div>
            <div>
                {searchResults.map((result) => <SearchResult key={result.id} result={result} reserve={reserve}
                                                             details={details}/>)}
            </div>
        </div>
    )
}

const SearchResult = ({result, reserve, details}) => {
    const closing = moment(result.shelter.hours_for_intake.closed, "HHmm")
    const closingMessage = closing.isValid() ? `registration closes at ${closing.fromNow()}` : 'registration closing time unknown'
    return (
        <div className="result">
            <div className="shelter-name"><a href="#" onClick={() => details(result.id)}>{result.shelter.name}</a></div>
            <a href="#" className="register-link" onClick={() => reserve(result.id)}>reserve</a>
            <div className="details">
                <ul>
                    <li>{result.distance.walking.distance.text} ({result.distance.walking.duration.text} walking)</li>
                    <li>7 open beds</li>
                    <li>{closingMessage}</li>
                </ul>
            </div>

            <div className="restrictions">
                <div className="subtitle">Restrictions</div>
                <ul>
                    {(result.shelter.restrictions.length > 0) ? (
                        result.shelter.restrictions.map((restriction) => <li>{restriction}</li>)
                    ) : (
                        <li>no known restrictions</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default SearchResults

