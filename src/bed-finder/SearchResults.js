import React from "react";
import {render} from "react-dom";

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

export default SearchResults

