import React from "react";
import {render} from "react-dom";

export default class Reserve extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      name: '',
      submitting: false
    }
  }
  submit(e) {
    e.preventDefault()
    this.setState({submitting: true})
    const clientName = this.state.name.trim()
    this.props.reserveShelterBed(clientName)
  }
  handleChange(e) {
    this.setState({name: e.target.value})
  }
  render () {
    const inputDisabled = (this.state.submitting) ? 'disabled' : ''
    const buttonDisabled = (this.state.submitting || this.state.name.trim().length === 0) ? 'disabled' : ''
    return (
      <div className="register-bed">
          <div className="title">Confirm Reservation</div>
          <form>
              <div className="form-group">
                  <label>Name</label>
                  <input className="form-control" placeholder="person's name to reserve their spot" disabled={inputDisabled} onChange={(e) => this.handleChange(e)}/>
              </div>
              <button className="btn btn-primary" disabled={buttonDisabled} onClick={(e) => this.submit(e)}>Confirm</button>
              <div style={{display: 'none'}} className="alert alert-warning" role="alert"></div>
          </form>
      </div>
    )
  }
}
