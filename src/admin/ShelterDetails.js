import React from 'react'

const ShelterDetails = ({ name, street, city, state, zip, contact }) => (
  <div className='details'>
    <div className='address'>{`${street}, ${city} ${state} ${zip}`}</div>
    <div className='contact'>{`Contact: ${contact || '(none)'}`}</div>
  </div>
)

ShelterDetails.displayName = 'ShelterDetails'

export default ShelterDetails
