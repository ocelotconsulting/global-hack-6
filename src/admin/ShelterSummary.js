import React from 'react'
import moment from 'moment'
import BedChart from './BedChart'

export default class ShelterSummary extends React.Component {
  render() {
    const { name, date, beds: { available, pending, total } } = this.props
    const formattedDate = moment(date).format('dddd MMMM Do')

    return (
      <div className='summary'>
        <div className='description'>
          {'For '}
          <span className='date'>
            {formattedDate}
          </span>
          {', '}
          <span className='name'>
            {name}
          </span>
          {' has '}
          <span className='total'>
            {total}
          </span>
          {' total beds, of which '}
          <span className='available'>
            {available || 'none'}
          </span>
          {' '}
          {available === 1 ? 'is' : 'are'}
          {' available and '}
          <span className='pending'>
            {pending || 'none'}
          </span>
          {' '}
          {pending === 1 ? 'is' : 'are'}
          {' reserved pending confirmation.'}
        </div>
        <div className='key'>
          <div className='key-item reserved'>
            <span className='icon'/>
          </div>
          <div className='key-item reserved'>
            <span className='icon'/>
          </div>
          <div className='key-item reserved'>
            <span className='icon'/>
          </div>
        </div>
        <BedChart total={total} available={available} pending={pending}/>
      </div>
    )
  }
}
