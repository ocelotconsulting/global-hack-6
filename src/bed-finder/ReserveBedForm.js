import React from "react";
import {render} from "react-dom";

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

export default Reserve
