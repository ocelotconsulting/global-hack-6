const agent = require('./agent')
import React, {PropTypes as T} from "react"
import AuthService from "./auth/AuthService"
import Navigation from "./Navigation"
import {Modal, Button} from 'react-bootstrap'

export default class App extends React.Component {
    static contextTypes = {
        router: T.object,
        location: T.object
    }

    static propTypes = {
        children: T.node,
        auth: T.instanceOf(AuthService)
    }

    constructor (props, context) {
      super(props, context)
      this.state = {
        showModal: false,
        weather: {}
      }
    }

    componentDidMount () {
      const go = () => { this.setState({showModal: true}) }
      setTimeout(go, 2000)
      agent.get('/services/weather/preventative')
      .then(({body}) => {
        console.log('weather', body)
        this.setState({weather: body})
      })
    }

    render() {
        const shouldShowModal = (this.state.showModal && this.state.weather && (window.location.pathname === '/clients/view/0d83436ec15336e3a9d2f0985902ebdd'))
        const close = () => { this.setState({showModal: false}) }
        console.log('shouldShowModal', window.location.pathname)
        return (
            this.props.auth.loggedIn() ?
                <div>
                    <Navigation auth={this.props.auth}/>
                    {this.props.children}
                    <Modal show={shouldShowModal} onHide={close}>
                      <Modal.Body>
                        <h3>Weather Trend Alert</h3>
                        <p>{this.state.weather.message || ''}</p>
                        <p>
                          <a href='' className='btn btn-link'><i className="fa fa-facebook-square fa-4x"></i></a>
                          <a href='' className='btn btn-link'><i className="fa fa-twitter-square fa-4x"></i></a>
                        </p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={close}>Close</Button>
                      </Modal.Footer>
                    </Modal>
                </div>
            :
                <div className="login-prompt">
                    <img src="/LargeIconColor.png"/>
                    <div> You must <a href="#" onClick={(e) => {e.preventDefault(); this.props.auth.login();}}>login</a> using your gmail or facebook account to continue.</div>
                </div>
        )
    }
}
