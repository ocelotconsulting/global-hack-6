/* eslint no-new: "off" */
import React from 'react'
import Chartist from 'chartist'
import { v4 } from 'uuid'
import ChartKey from './ChartKey'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

export default class BedChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: `chart_${v4().replace(/-/g, '')}`
    }
  }

  componentDidMount() {
    const { total, available, pending } = this.props
    const data = {
      series: [total - available - pending, pending, available]
    }
    //noinspection Eslint
    new Chartist.Pie(`#${this.state.id}`, data, {
      startAngle: 270,
      showLabel: false
    })
  }

  render() {
    return (
      <div className='summary-chart'>
        <Row>
          <Col md={3}>
            <ChartKey/>
          </Col>
          <Col md={3}>
            <div className='chart' id={this.state.id}/>
          </Col>
        </Row>
      </div>
    )
  }
}
