import React from 'react'
import Shelters from './Shelters'
import { browserHistory } from 'react-router'

const onShelterSelected = (shelterId) =>
  browserHistory.push(`/admin/${encodeURIComponent(shelterId)}`)

const Admin = ({ params: { shelterId, clientId }, children }) => (
  <div className='admin'>
    {clientId ? null : (<Shelters value={shelterId} onSelection={onShelterSelected}/>)}
    {children}
  </div>
)

Admin.displayName = 'Admin'

export default Admin
