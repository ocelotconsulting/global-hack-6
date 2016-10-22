// noinspection JSUnusedLocalSymbols
import React from 'react'
import {Link} from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Row, Col } from 'react-bootstrap'

export default class Navigation extends React.Component {

  render () {
    const {auth} = this.props
    const profile = auth.getProfile()
    const loginOrUser = () => (auth.loggedIn())
        ? (<NavDropdown eventKey={4} title={profile.name} id="basic-nav-dropdown">
             <MenuItem eventKey={4.1} onClick={() => { auth.logout(); this.forceUpdate() }}>Logout</MenuItem>
           </NavDropdown>)
        : (<NavItem eventKey={4} onClick={() => { auth.login(); this.forceUpdate() }}>Login</NavItem>)

    return (
      <Row>
        <Col>
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to='/'>GlobalHack 6</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="/bed">Beds</NavItem>
                <NavItem eventKey={1} href="/admin">Admin</NavItem>
                <NavItem eventKey={1} href="/clients">Clients</NavItem>
                {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Action</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown> */}
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
