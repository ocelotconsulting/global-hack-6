// noinspection JSUnusedLocalSymbols
const React = require('react')
const agent = require('../agent')
import {Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Panel, Button, ButtonToolbar} from 'react-bootstrap'
// import { Link } from 'react-router

class Client extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <Col sm={6} md={4} lg={4}>
        <Panel>
            <div>
              <label>{this.props.first_name} {this.props.last_name}</label>
            </div>
            <div>{this.props.phone ? this.props.phone : ''}</div>
            <div>{this.props.email ? this.props.email : ''}</div>
            <hr/>
            <ButtonToolbar>
              <Button bsStyle='default' bsSize='xsmall'>Select</Button>
              <Button bsStyle='info' bsSize='xsmall'>Details</Button>
            </ButtonToolbar>
        </Panel>
      </Col>
    )
  }
}

class FindClient extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      q: '',
      queryRunning: false,
      lastQ: '',
      queryResutls: []
    }
  }
  getUsers (q) {
    if (q.length === 0) {
      this.setState({
        q: q,
        lastQ: this.state.q,
        queryResutls: []})
    } else {
      this.setState({
        q: q,
        lastQ: this.state.q,
        queryRunning: true
      })
      agent.get('/services/clients')
      .query({q: q})
      .then(({body}) => {
        this.setState({
          lastQ: q,
          queryResutls: body,
          queryRunning: false
        })
        if (this.state.q !== this.state.lastQ) {
          this.getUsers(this.state.q)
        }
      })
      .catch((error) => {
        console.error(error)
        this.setState({queryRunning: false})
      })
    }
  }
  handleChange (e) {
    if (!this.state.queryRunning && this.state.lastQ !== e.target.value) {
      this.getUsers(e.target.value)
    } else {
      this.setState({q: e.target.value})
    }
  }
  mapQueryResults (client, i) {
    return <Client key={client.email} {...client}/>
  }
  render () {
    const handleChange = (e) => this.handleChange(e)
    const mapQueryResults = (x, i) => this.mapQueryResults(x, i)
    return (
      <div className='container-fluid'>
        <Row>
          <Col>
            <h1>Find an Existing Client</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <form>
              <FormGroup>
                <ControlLabel>Client's Last Name</ControlLabel>
                <FormControl type='text' value={this.state.value} placeholder='Last Name' onChange={handleChange} />
                <HelpBlock>A list of clients will be displayed as you type.</HelpBlock>
              </FormGroup>
            </form>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              {this.state.queryResutls.map(mapQueryResults)}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default FindClient
