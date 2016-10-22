// noinspection JSUnusedLocalSymbols
import React from 'react'
import { Link } from 'react-router'
import {Row, Col, ButtonGroup} from 'react-bootstrap'

class RegisterWithoutFind extends React.Component {
  render () {
    return (
      <div className='action-buttons'>
        <h1>Register a Client</h1>
        <Row>
          <Col sm={6} md={4} lg={3}>
            <ButtonGroup>
              <Link to={`/clients/register`} className='btn btn-primary btn-lg'>
                Register New Client
              </Link>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

export default RegisterWithoutFind
