import React from 'react'
import { render } from 'react-dom'

const BedFinder = () =>
    <div className="bed-finder">
        <div className="title">Find a Bed</div>
        <div className="input-row">
            <div className="btn-group" role="group" aria-label="...">
                <button type="button" className="btn btn-default">-</button>
                <button type="button" className="btn btn-default">+</button>
            </div>
            0 Adult Males
        </div>
        <div className="input-row">
            <div className="btn-group" role="group" aria-label="...">
                <button type="button" className="btn btn-default">-</button>
                <button type="button" className="btn btn-default">+</button>
            </div>
            0 Adult Females
        </div>
        <div className="input-row">
            <div className="btn-group" role="group" aria-label="...">
                <button type="button" className="btn btn-default">-</button>
                <button type="button" className="btn btn-default">+</button>
            </div>
            0 Children
        </div>
        <button className="btn btn-primary">Find Bed</button>
    </div>

const SearchResult = ({result}) =>
    <div className="result">
        <div className="shelter-name">{result.name}</div>
        <a href="" className="register-link">register</a>
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

const Results = () => {
        const results = [
                {id: 1, name: 'Some Shelter Name'},
                {id: 2, name: 'Some Other Shelter'},
                {id: 3, name: 'Yet Another Shelter'}
            ]
        return (
            <div className="bed-finder-results">
                <div className="title">Open Beds Nearby</div>
                <div>
                    {results.map((result) => <SearchResult key={result.id} result={result}/>)}
                </div>
            </div>
        )
    }

export {BedFinder, Results}

