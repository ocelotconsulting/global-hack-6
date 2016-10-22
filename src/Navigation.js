// noinspection JSUnusedLocalSymbols
import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Row, Col } from 'react-bootstrap'

export default class Navigation extends React.Component {

  render () {
    const {auth} = this.props
    const profile = auth.getProfile()

    const loginOrUser = () => (auth.loggedIn())
        ? (<NavItem eventKey={1} href="#">{profile.name}</NavItem>)
        : (<NavItem eventKey={1} onClick={() => auth.login()}>Login</NavItem>)

    return (
      <Row>
        <Col>
          <Navbar inverse>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">GlobalHack 6</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">Link</NavItem>
                <NavItem eventKey={2} href="#">Link</NavItem>
                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Action</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
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
