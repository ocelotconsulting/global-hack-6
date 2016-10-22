import React from "react";
import {render} from "react-dom";

const SearchResults = ({reserve, details}) => {
    const results = [
        {id: 1, name: 'Some Shelter Name'},
        {id: 2, name: 'Some Other Shelter'},
        {id: 3, name: 'Yet Another Shelter'}
    ]
    return (
        <div className="bed-finder-results">
            <div className="title">Open Beds Nearby</div>
            <div>
                {results.map((result) => <SearchResult key={result.id} result={result} reserve={reserve} details={details}/>)}
            </div>
        </div>
    )
}

const SearchResult = ({result, reserve, details}) =>
    <div className="result">
        <div className="shelter-name"><a href="#" onClick={() => details(result.id)}>{result.name}</a></div>
        <a href="#" className="register-link" onClick={() => reserve(result.id)}>reserve</a>
        <div className="details">
            <ul>
                <li>1.3 miles (17 min walking)</li>
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

export default SearchResults

