// noinspection JSUnusedLocalSymbols
const React = require('react')
const moment = require('moment')
const agent = require('../agent')
import {Link} from 'react-router'
import {Row, Col} from 'react-bootstrap'
import ClientForm from './ClientForm'
import _ from 'underscore'

class RegisterClient extends React.Component {
  constructor (props, context) {
    super(props)
    this.state = {}
  }
  save () {
    let client = JSON.parse(JSON.stringify(_(this.state).omit(['loading'])))
    client.dob = moment(client.dob).valueOf()
    this.setState({loading: true})
    agent.post('/services/clients')
    .send(client)
    .then(({body}) => {
      body.saved = true
      this.setState(body)
      if (this.props.location.query.returnTo) {
        this.props.router.push({
          pathname: `${this.props.location.query.returnTo}/${body.id}`
        })
      }
    })
    .catch((error) => {
      console.error(error)
      this.setState(client)
    })
  }
  render () {
    const {query} = this.props.location
    const state = this.state
    return (
      <div className='container'>
        <Row>
          <Col>
            <h1>
              <span>Register a New Client </span>
              <small>
                <span>or </span>
                <Link to={{pathname: `/clients/locate`, query: query}}>find an existing client</Link>
              </small>
            </h1>
          </Col>
        </Row>
        <ClientForm {...state}
          setState={(x) => this.setState(x)}
          save={() => this.save()}
          location={this.props.location}
          history={this.props.history}
        />
      </div>
    )
  }
}

RegisterClient.propTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object,
  router: React.PropTypes.object
}

export default RegisterClient
