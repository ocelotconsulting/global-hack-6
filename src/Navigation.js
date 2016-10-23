// noinspection JSUnusedLocalSymbols
import React from 'react'
import {Link} from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Row, Col } from 'react-bootstrap'

export default class Navigation extends React.Component {

  render () {
    const {auth} = this.props
    const profile = auth.getProfile()
    const loginOrUser = () => {
      if (!profile.name) {
        // todo hackity-hack-hack
        setTimeout(() => this.forceUpdate(), 500)
      }
      return (auth.loggedIn())
          ? (<NavDropdown eventKey={4} title={profile.name || ' '} id="basic-nav-dropdown">
        <MenuItem eventKey={4.1} onClick={() => { auth.logout(); window.location = '/' }}>Logout</MenuItem>
      </NavDropdown>)
          : (<NavItem eventKey={4} onClick={() => { auth.login(); this.forceUpdate() }}>Login</NavItem>)
    }

    return (
      <Row>
        <Col>
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to='/'><img src="/logo_small.png"/>SafeNight</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="/bed">Find Beds</NavItem>
                <NavItem eventKey={1} href="/clients/locate">
                  <i className='fa fa-lock'/>
                  {' Find Client'}
                </NavItem>
                <NavItem eventKey={1} href="/clients/register">
                  <i className='fa fa-lock'/>
                  {' Register Client'}
                </NavItem>
                <NavItem eventKey={1} href="/admin">
                  <i className='fa fa-lock'/>
                  {' Check in Client'}
                </NavItem>
              </Nav>
              <Nav pullRight>
                {loginOrUser()}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    )
  }
}
