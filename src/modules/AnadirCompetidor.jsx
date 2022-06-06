import React, { useState } from 'react'
import Menu from './Menu'

const AnadirCompetidor = ({rutina}) => {
    const [nombre, setnombre] = useState('')
    const changeNombre = (e)=>{
        setnombre(e.target.value)
    }
    const enviar = async() =>{
        const competidor = {nombre : nombre,rutina : rutina}
        console.log(competidor);
        const bodyJson = JSON.stringify(competidor)
        try{
            const response = await fetch('https://calificador-eventos.herokuapp.com/api/nuevocompetidor',{ 
                headers : { 'Content-Type': 'application/json' },
                method: 'POST',
                mode: 'cors', // <---
                cache: 'default',
                body: bodyJson
              })
            const responseJson = await response.json()
            document.getElementById('nombrerutina').value = ""
            console.log("Error: "+responseJson.mensaje)     
        }
        catch(e){
            console.log("Error : "+e);
        }

    }
  return (
    <>
    <Menu/>
    <div className='container d-flex justify-content-center align-items-center h-100 w-100'>
    <form>
        <div class="form-group">
    
    <label for="nombrerutina">Nombre</label>
    <input type="text" class="form-control" id="nombrerutina" aria-describedby="emailHelp" placeholder="Nombre del evento" required onChange={changeNombre}/>
  </div>
  <button  class="btn btn-primary" onClick={enviar}>Programar</button>
  </form>
    </div>
    </>
  )
}

export default AnadirCompetidor