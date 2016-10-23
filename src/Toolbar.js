import React from 'react'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'

const Toolbar = ({ children }) => {
  let key = 0
  return (
    <ButtonToolbar>
      {[].concat(children).map(child => (
        <ButtonGroup key={key++}>
          {child}
        </ButtonGroup>
      ))}
    </ButtonToolbar>
  )
}

Toolbar.displayName = 'Toolbar'

export default Toolbar
