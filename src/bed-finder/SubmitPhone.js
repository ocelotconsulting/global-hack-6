import React from "react";
import {render} from "react-dom";


export default class ProfileDetails extends React.Component {
  submit(e) {
    e.preventDefault()
    this.props.requestNotification(this.props.shelter.id, this.state.number)
  }
  handleChange(e) {
    this.setState({number: e.target.value})
  }
  render () {
    return (
        <div className="submit-phone">
            <div className="title">Enter Phone Number</div>
            <form>
                <div className="form-group">
                    <label>Number</label>
                    <input className="form-control" type="tel" placeholder="optional" onChange={(e) => this.handleChange(e)}/>
                </div>
                <button className="btn btn-primary" onClick={(e) => this.submit(e)}>Confirm</button>
                <div className="alert alert-warning" role="alert">A single text message is sent when a bed is free.
                    Messaging fees may apply.
                </div>
            </form>
        </div>
    )
  }
}
