// noinspection JSUnusedLocalSymbols
const React = require('react')
import { Link } from 'react-router'
import {Row, Col, Button} from 'react-bootstrap'
import FindClient from './FindClient'
import RegisterClient from './RegisterClient'

class Clients extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div id='clients' className='container-fluid'>
        { this.props.children
            ? <div>{this.props.children}</div>
            : <div className='action-buttons'>
                <h1 className='text-center'>Find or Register a Client</h1>
                <Row>
                  <Col sm={6}>
                    <Link to={`/clients/register`}>
                      <Button bsStyle='default' bsSize='large' className='center-block'>Register New Client</Button>
                    </Link>
                  </Col>
                  <Col sm={6}>
                    <Link to={`/clients/locate`}>
                      <Button bsStyle='primary' bsSize='large' className='center-block'>Find Existing Client</Button>
                    </Link>
                  </Col>
                </Row>
              </div>
        }
      </div>
    )
  }
}

export default Clients
export {Clients, FindClient, RegisterClient}
