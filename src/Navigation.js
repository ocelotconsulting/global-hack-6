// noinspection JSUnusedLocalSymbols
import React, {PropTypes as T} from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

export default class Navigation extends React.Component {
  static contextTypes = {
    router: T.object
  }

  render () {
    const {auth} = this.props
    const profile = auth.getProfile()
    const router = this.context.router
    const loginOrUser = () => (auth.loggedIn())
        ? (<NavDropdown eventKey={4} title={profile.name} id="basic-nav-dropdown">
             <MenuItem eventKey={4.1} onClick={() => { auth.logout(); this.forceUpdate() }}>Logout</MenuItem>
           </NavDropdown>)
        : (<NavItem eventKey={4} onClick={() => { auth.login(); this.forceUpdate() }}>Login</NavItem>)

    return (
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
    )
  }
}
