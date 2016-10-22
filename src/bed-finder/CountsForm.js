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

export default SubmitCounts
