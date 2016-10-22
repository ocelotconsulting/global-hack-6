import React from 'react'

const ShelterDetails = ({ name, street, city, state, zip, contact }) => (
  <div className='details'>
    <div className='address'>{`${street}, ${city} ${state} ${zip}`}</div>
    {contact && contact.phone && contact.email ? (
      <div className='contact'>
        <a href={`tel:${contact.phone}`}>{contact.phone}</a>
        {' / '}
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </div>
    ) : null
    }
  </div>
)

ShelterDetails.displayName = 'ShelterDetails'

export default ShelterDetails
