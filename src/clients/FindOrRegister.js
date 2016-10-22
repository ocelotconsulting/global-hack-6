// noinspection JSUnusedLocalSymbols
import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import {Row, Col, ButtonGroup} from 'react-bootstrap'

class FindOrRegister extends React.Component {
  render () {
    return (
      <div className='action-buttons'>
        <h1>Find or Register a Client</h1>
        <Row>
          <Col xsHidden sm={7} md={5}>
            <ButtonGroup>
              <Link to={{pathname: `/clients/register`, query: this.props}} className='btn btn-default btn-lg'>
                Register New Client
              </Link>
              <Link to={{pathname: `/clients/locate`, query: this.props}} className='btn btn-primary btn-lg'>
                Find Existing Client
              </Link>
            </ButtonGroup>
          </Col>
          <Col xs={12} smHidden mdHidden lgHidden>
            <ButtonGroup justified>
              <Link to={{pathname: `/clients/register`, query: this.props}} className='btn btn-default btn-lg'>
                Register New Client
              </Link>
            </ButtonGroup>
          </Col>
          <Col xs={12} smHidden mdHidden lgHidden>
            <ButtonGroup justified>
              <Link to={{pathname: `/clients/locate`, query: this.props}} className='btn btn-primary btn-lg'>
                Find Existing Client
              </Link>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    )
  }
}

FindOrRegister.propTypes = {
  returnTo: PropTypes.string
}

export default FindOrRegister
