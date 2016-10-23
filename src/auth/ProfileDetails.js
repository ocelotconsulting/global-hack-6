import React, {PropTypes as T} from "react";
import {Row, Col, Image} from "react-bootstrap";
import AuthService from "./AuthService";
import moment from "moment";

export default class ProfileDetails extends React.Component {
    static propTypes = {
        profile: T.object,
        auth: T.instanceOf(AuthService)
    }

    render() {
        const {auth, profile} = this.props
        const {address} = profile.user_metadata || {}
        console.log(profile)
        return (
            <div>
                <Image src={profile.picture} circle className='avatar'/>
                <div className="body">
                    <h3>{profile.name}</h3>
                    <div>{profile.email}</div>
                    <div>created {moment(profile.created_at).fromNow()}</div>
                    <div>updated {moment(profile.updated_at).fromNow()}</div>
                    <div>{auth.hasRole('admin') ? 'Administrator' : 'no Admin privs'}</div>
                </div>
            </div>
        )
    }
}
