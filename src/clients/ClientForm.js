// noinspection JSUnusedLocalSymbols
const React = require('react')
import {Row, Col, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'

class ClientForm extends React.Component {
  constructor (props) {
    super(props)
  }
  handleChange (key) {
    return (e) => this.props.setState({[key]: e.target.value})
  }
  render () {
    const save = () => this.props.save()
    return (
      <form id='client-form'>
        <Row>
          <Col>
            <h3>Personal Information</h3>
          </Col>
        </Row>
        <Row>
          <FormGroup className='col-md-4'>
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              type='text'
              defaultValue={this.props.first_name}
              placeholder='First'
              onChange={this.handleChange('first_name')}
            />
            <FormControl.Feedback />
            {/* <HelpBlock>Validation is based on string length.</HelpBlock> */}
          </FormGroup>
          <FormGroup className='col-md-4'>
            <ControlLabel>Middle Name</ControlLabel>
            <FormControl
              type='text'
              defaultValue={this.props.middle_name}
              placeholder='Middle'
              onChange={this.handleChange('middle_name')}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup className='col-md-4'>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              type='text'
              defaultValue={this.props.last_name}
              placeholder='Last'
              onChange={this.handleChange('last_name')}
            />
            <FormControl.Feedback />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup className='col-md-4'>
            <ControlLabel>Date of Birth</ControlLabel>
            <FormControl
              type='date'
              defaultValue={this.props.dob}
              placeholder='MM/DD/YYYY'
              onChange={this.handleChange('dob')}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup className='col-md-4'>
            <ControlLabel>Gender</ControlLabel>
            <FormControl
              componentClass='select'
              defaultValue={this.props.gender}
              placeholder='Gender'
              onChange={this.handleChange('gender')}
            >
              <option value=''>Gender</option>
              <option value='F'>Female</option>
              <option value='M'>Male</option>
              <option value='O'>Transgender male to female</option>
              <option value='O'>Transgender female to male</option>
              <option value='O'>Doesn’t identify as male, female, or transgender</option>
              <option value='8'>Client doesn’t know</option>
              <option value='9'>Client refused</option>
              <option value='99'>Data not collected</option>
            </FormControl>
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup className='col-md-4'>
            <ControlLabel>Race</ControlLabel>
            <FormControl
              componentClass='select'
              defaultValue={this.props.gender}
              placeholder='Race'
              onChange={this.handleChange('gender')}
            >
              <option value=''>Race</option>
              <option value='N'>American Indian or Alaska Native</option>
              <option value='A'>Asian</option>
              <option value='B'>Black or African American</option>
              <option value='H'>Native Hawaiian or Other Pacific Islander</option>
              <option value='W'>White</option>
              <option value='8'>Client doesn’t know</option>
              <option value='9'>Client refused</option>
              <option value='99'>Data not collected</option>
            </FormControl>
            <FormControl.Feedback />
          </FormGroup>
        </Row>
        <Row>
          <Col>
            <h3>Contact Information</h3>
          </Col>
        </Row>
        <Row>
          <FormGroup className='col-md-6'>
            <ControlLabel>Phone Number</ControlLabel>
            <FormControl
              type='text'
              defaultValue={this.props.phone}
              placeholder='Phone'
              onChange={this.handleChange('phone')}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup className='col-md-6'>
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
              type='text'
              defaultValue={this.props.email}
              placeholder='Email'
              onChange={this.handleChange('email')}
            />
            <FormControl.Feedback />
          </FormGroup>
        </Row>
        <Row>
          <Col>
            <h3>Government Information</h3>
          </Col>
        </Row>
        <Row>
          <FormGroup className='col-md-6'>
            <ControlLabel>Social Security Number</ControlLabel>
            <FormControl
              type='text'
              defaultValue={this.props.ssn}
              placeholder='xxx-xx-xxxx'
              onChange={this.handleChange('ssn')}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup className='col-md-6'>
            <ControlLabel>Are you a veteran?</ControlLabel>
            <FormControl
              componentClass='select'
              defaultValue={this.props.veteranstatus}
              placeholder='Veteran Status'
              onChange={this.handleChange('veteranstatus')}
            >
              <option value=''>Veteran Status</option>
              <option value='1'>No</option>
              <option value='2'>Yes</option>
              <option value='8'>Client doesn’t know</option>
              <option value='9'>Client refused</option>
              <option value='99'>Data not collected</option>
            </FormControl>
            <FormControl.Feedback />
          </FormGroup>
        </Row>
        <Row>
          <Col>
            <hr/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button bsStyle='primary' onClick={save} disabled={this.props.saved === true}>Save</Button>
          </Col>
        </Row>
      </form>
    )
  }
}

ClientForm.propTypes = {
  setState: React.PropTypes.func,
  save: React.PropTypes.func,
  first_name: React.PropTypes.string,
  middle_name: React.PropTypes.string,
  last_name: React.PropTypes.string,
  dob: React.PropTypes.string,
  gender: React.PropTypes.string,
  phone: React.PropTypes.string,
  ssn: React.PropTypes.string,
  email: React.PropTypes.string,
  veteranstatus: React.PropTypes.string,
  saved: React.PropTypes.bool
}

export default ClientForm
