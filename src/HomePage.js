import React from 'react'
import { render } from 'react-dom'

const Dashboard = React.createClass({
    render () {
        return (
            <div className="homepage">
                <div className="tag-line">
                    Welcome to SafeNight, helping people connect to the services they need
                    <img className="logo" src="/logoRed.png"/>
                </div>
                <img className="background" src="/hands.jpg"/>

            </div>
        )
    }
})

export default Dashboard
