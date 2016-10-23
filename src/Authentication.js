import React, {PropTypes as T} from "react";
import {Button} from "react-bootstrap";
import AuthService from "./auth/AuthService";
import ProfileDetails from "./auth/ProfileDetails";
import ProfileEdit from "./auth/ProfileEdit";

export default class Authentication extends React.Component {
    static contextTypes = {
        router: T.object
    }

    static propTypes = {
        auth: T.instanceOf(AuthService)
    }

    constructor(props, context) {
        super(props, context)
        this.state = {
            profile: props.auth.getProfile()
        }
        // listen to profile_updated events to update internal state
        props.auth.on('profile_updated', (profile) => this.setState({profile}))
    }

    logout() {
        this.props.auth.logout()
        this.context.router.push('/')
    }

    render() {
        const {profile} = this.state
        return (
            <div className="profile-page container">
                <h2>Your User Profile</h2>
                <div>
                    <ProfileDetails profile={profile} auth={this.props.auth}/>
                    <ProfileEdit profile={profile} auth={this.props.auth}/>
                </div>
            </div>
        )
    }
}
