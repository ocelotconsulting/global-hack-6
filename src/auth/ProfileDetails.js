import React, {PropTypes as T} from 'react'
import {Row, Col, Image} from 'react-bootstrap'
import AuthService from './AuthService'

export default class ProfileDetails extends React.Component {
  static propTypes = {
    profile: T.object,
    auth: T.instanceOf(AuthService)
  }

  render () {
    const {auth, profile} = this.props
    const {address} = profile.user_metadata || {}
    return (
        <Row className='root'>
            <Row className='root'>
                <Col md={3} mdOffset={4}>
                    <Image src={profile.picture} circle className='avatar'/>
                </Col>
            </Row>
            <Row className='root'>
                <Col md={3} mdOffset={4}>
                    <h3>Profile</h3>
                    <p><strong>Name: </strong> {profile.name}</p>
                    <p><strong>Email: </strong> {profile.email}</p>
                    <p><strong>Nickname: </strong> {profile.nickname}</p>
                    <p><strong>Address: </strong> {address}</p>
                    <p><strong>Created At: </strong> {profile.created_at}</p>
                    <p><strong>Updated At: </strong> {profile.updated_at}</p>
                    <p><strong>Is admin: </strong> {`${auth.hasRole('admin')}`}</p>
                </Col>
            </Row>
        </Row>
    )
  }
}
