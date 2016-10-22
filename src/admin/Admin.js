import React from 'react'
import Shelters from './Shelters'
import { browserHistory } from 'react-router'

const onShelterSelected = (shelterId) =>
  browserHistory.push(`/admin/${encodeURIComponent(shelterId)}`)

const Admin = ({ params: { shelterId }, children }) => (
  <div className='admin'>
    <Shelters value={shelterId} onSelection={onShelterSelected}/>
    {children}
  </div>
)

Admin.displayName = 'Admin'

export default Admin
