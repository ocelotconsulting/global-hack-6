import React from "react";
import {render} from "react-dom";

const Reserve = ({requestNotification}) => {
    function submit(e) {
        e.preventDefault()
        requestNotification()
    }
    return (
        <div className="submit-phone">
            <div className="title">Enter Phone Number</div>
            <form>
                <div className="form-group">
                    <label>Number</label>
                    <input className="form-control" type="tel" placeholder="optional"/>
                </div>
                <button className="btn btn-primary" onClick={(e) => submit(e)}>Confirm</button>
                <div className="alert alert-warning" role="alert">A single text message is sent when a bed is free.
                    Messaging fees may apply.
                </div>
            </form>
        </div>
    )
}

export default Reserve
