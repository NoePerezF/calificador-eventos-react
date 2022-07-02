import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'


const Login = () => {
    const [red, setred] = useState(false)
    const crearEvento = async()=>{
        const request = {nombre : "Evento 1"}
        const requestJson = JSON.stringify(request)
        try{
            const response = await fetch('https://calificador-eventos.herokuapp.com/api/nuevoevento',{ 
                headers : { 'Content-Type': 'application/json' },
                method: 'POST',
                mode: 'cors', // <---
                cache: 'default',
                body: requestJson
              })
            const responseJson = await response.json()
            if(responseJson.status === 1){
                setred(true)
            }
        }
        catch(e){
            console.log("Error : "+e);
        }
        
    }

  return (
      !red ?
    <div className='d-flex justify-content-center align-items-center h-100'>
        <button type='button' className='btn btn-primary' onClick={crearEvento}>Crear nueva competencia</button>
    </div> : <Navigate to={"/calificaciones"}/>
  )
}

export default Login