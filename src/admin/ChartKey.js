import React from 'react'

const ChartKey = ({ items }) => (
  <div className='key'>
    {items.map(({ className, label }) => (
      <div key={className} className={`item ${className}`}>
        <span className='icon'/>
        <span className='key-label'>{label}</span>
      </div>
    ))
    }
  </div>
)

ChartKey.defaultProps = {
  items: [
    { className: 'reserved', label: 'Reserved' },
    { className: 'pending', label: 'Pending Confirmation' },
    { className: 'available', label: 'Available' }
  ]
}

ChartKey.displayName = 'ChartKey'

export default ChartKey
