import React from 'react'
import Radio from 'react-bootstrap/lib/Radio'
import programTypes from './programTypes'

const ReferralRow = ({ selected, program: { _id, name, type, location }, onSelected }) => (
  <tr className={selected ? 'selected' : ''}>
    <td>
      <Radio checked={selected} onChange={() => onSelected(_id)}/>
    </td>
    <td>{name}</td>
    <td>{location}</td>
    <td>{programTypes[type] || type}</td>
  </tr>
)

ReferralRow.displayName = 'ReferralRow'

export default ReferralRow
