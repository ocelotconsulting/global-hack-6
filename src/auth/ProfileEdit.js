import React, {PropTypes as T} from "react";
import ReactDOM from "react-dom";
import AuthService from "./AuthService";
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Button} from "react-bootstrap";

export default class ProfileEdit extends React.Component {
    static propTypes = {
        profile: T.object,
        auth: T.instanceOf(AuthService)
    }

    handleSubmit(event) {
        event.preventDefault()
        const {profile, auth} = this.props
        auth.updateProfile(profile.user_id, {
            user_metadata: {
                address: ReactDOM.findDOMNode(this.refs.address).value,
                phone: ReactDOM.findDOMNode(this.refs.phone).value
            }
        })
    }

    render() {
        const {profile} = this.props
        const {phone, address} = profile.user_metadata || {}
        return (
            <div className='editable'>
                <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup controlId="address">
                        <Col componentClass={ControlLabel} sm={2}>
                            Address
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" defaultValue={address} ref="address"/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="phone">
                        <Col componentClass={ControlLabel} sm={2}>
                            Phone
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" defaultValue={phone} ref="phone"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">Save</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}
