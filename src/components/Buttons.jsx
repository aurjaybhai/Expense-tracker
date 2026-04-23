import React from 'react'
import { Actions } from '../App'



function Buttons({broker}) {
  return (
    <div className="button-row">
        <button type="button" className="primary-btn" onClick={() => broker({type : Actions.SUBMIT}) }>Add</button>
    </div>
  )
}

export default Buttons
