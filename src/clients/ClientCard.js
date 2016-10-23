// noinspection JSUnusedLocalSymbols
const React = require('react')
import {Col, Panel, Button, ButtonToolbar} from 'react-bootstrap'
import md5 from 'md5'
import { Link } from 'react-router'

class ClientCard extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const defaultPicture = `https://www.gravatar.com/avatar/${md5(this.props.email || '')}?s=45&d=identicon`
    const {picture = defaultPicture} = this.props
    return (
      <Col sm={6} md={4} lg={4}>
        <Panel>
          <span style={{float: 'right', width: '45px', height: '45px'}}>
            <img src={picture} className='img-responsive'/>
          </span>
          <div>
            <label>{this.props.first_name} {this.props.last_name}</label>
          </div>
          <div>{this.props.phone ? this.props.phone : ''}</div>
          <div>{this.props.email ? this.props.email : ''}</div>
          <hr/>
          <ButtonToolbar>
            {this.props.returnTo &&
               <Link className='btn btn-default btn-xs' to={`${this.props.returnTo}/${this.props._id}`}>Select</Link>
            }
            <Link className='btn btn-info btn-xs' to={`/clients/view/${this.props._id}`}>Details</Link>
          </ButtonToolbar>
        </Panel>
      </Col>
    )
  }
}

ClientCard.propTypes = {
  email: React.PropTypes.string,
  phone: React.PropTypes.string,
  first_name: React.PropTypes.string,
  last_name: React.PropTypes.string,
  returnTo: React.PropTypes.string,
  picture: React.PropTypes.object,
  _id: React.PropTypes.string
}

export default ClientCard
