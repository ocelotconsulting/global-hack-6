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

export default BedFinder

