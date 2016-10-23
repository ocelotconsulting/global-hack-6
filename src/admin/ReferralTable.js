import React from 'react'
import Table from 'react-bootstrap/lib/Table'
import RefferalHeader from './ReferralHeader'
import ReferralRow from './ReferralRow'

const ReferralTable = ({programs, selectedId, onSelected}) => (
  <Table striped bordered>
    <RefferalHeader/>
    <tbody>
    {programs.map(program => (
      <ReferralRow key={program._id} program={program} selected={program._id === selectedId}
                   onSelected={onSelected}/>
    ))
    }
    </tbody>
  </Table>
)

export default ReferralTable
