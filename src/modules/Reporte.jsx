import React from 'react'

const Reporte = ({pdf}) => {
  return (
    <object
    type="application/pdf" 
    data={'data:application/pdf;base64,'+pdf}></object>
  )
}

export default Reporte