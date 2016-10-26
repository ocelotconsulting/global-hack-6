/* eslint no-new: "off" */
import React from 'react'
import { v4 } from 'uuid'
import ChartKey from './ChartKey'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import ChartistGraph from 'react-chartist'

export default class BedChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: `chart_${v4().replace(/-/g, '')}`
    }
  }

  render() {
    const { total, available, pending } = this.props
    const data = {
      series: [total - available - pending, pending, available]
    }

    const options = {
      startAngle: 270,
      showLabel: false
    }

    return (
      <div className='summary-chart'>
        <Row>
          <Col md={3}>
            <ChartKey/>
          </Col>
          <Col md={3}>
            <ChartistGraph data={data} options={options} type='Pie'/>
          </Col>
        </Row>
      </div>
    )
  }
}
