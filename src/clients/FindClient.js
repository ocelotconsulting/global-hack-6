// noinspection JSUnusedLocalSymbols
const React = require('react')
const agent = require('../agent')
import {Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'
import ClientCard from './ClientCard'

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
      .then(({body = []}) => {
        console.log(body[0])
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
  mapQueryResults (client, returnTo) {
    return <ClientCard key={client.email} {...client} returnTo={returnTo}/>
  }
  render () {
    const {query: {returnTo}} = this.props.location
    const handleChange = (e) => this.handleChange(e)
    const mapQueryResults = (x) => this.mapQueryResults(x, returnTo)
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

FindClient.propTypes = {
  location: React.PropTypes.object
}

export default FindClient
