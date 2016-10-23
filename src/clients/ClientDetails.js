// noinspection JSUnusedLocalSymbols
const agent = require('../agent')
import React, {PropTypes} from 'react'
import {Row, Col, Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
import moment from 'moment'
import md5 from 'md5'
import randomHistory from './generateRandomHistoryData'

function getGender (gender) {
  switch (gender) {
    case 'F': return 'Female'
    case 'M': return 'Male'
    default: return 'Data not collected'
  }
}

function getRace (race) {
  switch (race) {
    case 'B': return 'Black or African American'
    case 'W': return 'White'
    case 'N': return 'American Indian or Alaska Native'
    default: return 'Data not collected'
  }
}

function getVeteranStatus (status) {
  switch (status) {
    case 'Y': return 'Yes'
    case 'N': return 'No'
    default: return 'Data not collected'
  }
}

class DataWithLabel extends React.Component {
  render () {
    let {parentClass = '', childClass = ''} = {}
    if (this.props.pullRight) {
      parentClass = 'pull-right'
      childClass = 'text-right'
    }
    return (
      <div className={parentClass}>
        <div className={childClass}><label>{this.props.label}</label></div>
        <div className={childClass}>{this.props.value}</div>
      </div>
    )
  }
}

DataWithLabel.propTypes = {
  label: React.PropTypes.string,
  pullRight: React.PropTypes.bool,
  value: React.PropTypes.node
}

class ClientDetails extends React.Component {
  componentWillMount () {
    this.setState({loading: true})
    agent.get(`/services/clients/${this.props.params.id}`)
    .then(({body}) => {
      body.photo = body.picture || `https://www.gravatar.com/avatar/${md5(body.email || '')}?s=450&d=identicon`
      body.dob = moment(body.dob)
      if (!body.history) {
        let history = []
        for (var i = 0; i <= 32; i++) {
          history.push(randomHistory())
        }

        body.history = history.sort((a, b) => {
          a = a.referralDate
          b = b.referralDate
          if (a.isSame(b)) {
            return 0
          } else if (a.isBefore(b)) {
            return 1
          } else {
            return -1
          }
        })
      }
      this.setState({
        client: body,
        loading: false
      })
    })
  }
  mapHistoryData (data) {
    return (
      <ListGroupItem key={data.id} >
        <Row>
          <Col md={4}><DataWithLabel label='Center:' value={data.center} /></Col>
          <Col md={4}><DataWithLabel label='Program:' value={data.name} /></Col>
          <Col md={4} className='pull-right'><DataWithLabel label='Attendance Date:' value={data.referralDate.format('MM/DD/YYYY')} pullRight/></Col>
        </Row>
      </ListGroupItem>
    )
  }
  render () {
    if (!this.state.loading) {
      const {first_name, last_name, email, phone, dob, gender, race, veteranstatus, photo, history} = this.state.client
      return (
        <div className='container-fluid'>
          <Row>
            <Col xs={12}>
              <h1>{first_name} {last_name}</h1>
            </Col>
          </Row>
          <Row>
            <Col sm={8} md={9} lg={10}>
              <Panel header='Contact Information'>
                <Row>
                  <Col sm={6}>
                    <DataWithLabel label='Email:' value={<a href={`mailto:${email}`} target='_blank'>{email}</a>} />
                  </Col>
                  <Col sm={6}>
                    <DataWithLabel label='Phone:' value={phone} />
                  </Col>
                </Row>
              </Panel>
              <Panel header='Demographic Information'>
                <Row>
                  <Col sm={6}>
                    <DataWithLabel label='Date of Birth:' value={dob.format('MM/DD/YYYY')} />
                  </Col>
                  <Col sm={6}>
                    <DataWithLabel label='Age:' value={`about ${dob.fromNow(true)}`} />
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <DataWithLabel label='Gender:' value={getGender(gender)} />
                  </Col>
                  <Col sm={6}>
                    <DataWithLabel label='Race:' value={getRace(race)} />
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <DataWithLabel label='Veteran Status:' value={getVeteranStatus(veteranstatus)} />
                  </Col>
                </Row>
              </Panel>
            </Col>
            <Col sm={4} md={3} lg={2}>
              <img src={photo} className='img-responsive center-block'/>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h3>Client History</h3>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ListGroup>
                {history.map(this.mapHistoryData)}
              </ListGroup>
            </Col>
          </Row>
        </div>
      )
    } else {
      return (
        <div className='container-fluid'>
          <Row>
            <Col>
              <h1>Client Details</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className='spinner'></div>
            </Col>
          </Row>
        </div>
      )
    }
  }
}

ClientDetails.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string.required
  }),
  location: PropTypes.object
}

export default ClientDetails
