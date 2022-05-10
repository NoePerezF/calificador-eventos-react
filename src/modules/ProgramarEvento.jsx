import React, { useState } from 'react'
import Menu from './Menu'

const ProgramarEvento = () => {
    const [nombre, setnombre] = useState('')
    const [fecha, setfecha] = useState('')

    const changeNombre = (e)=>{
        setnombre(e.target.value)
    }
    const changeFecha = (e) =>{
        setfecha(e.target.value)
    }

    const enviar = async() =>{
        const evento = {nombre : nombre,fecha : fecha}
        const bodyJson = JSON.stringify(evento)
        try{
            const response = await fetch('https://calificador-eventos.herokuapp.com/api/nuevoevento',{ 
                headers : { 'Content-Type': 'application/json' },
                method: 'POST',
                mode: 'cors', // <---
                cache: 'default',
                body: bodyJson
              })
            const responseJson = await response.json()
            if(responseJson.status === 1){
                window.location.reload()
            }
            console.log("Error: "+responseJson.mensaje);

                
        }
        catch(e){
            console.log("Error : "+e);
        }

    }

  return (
      <>
      <Menu/>
    <div className='container d-flex justify-content-center align-items-center h-100 w-100'>
        <div class="form-group">
    <form>
    <label for="exampleInputEmail1">Nombre</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nombre del evento" required onChange={changeNombre}/>
    <small id="emailHelp" class="form-text text-muted">Intenta usar diferentes nombres para identificarlos</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Fecha</label>
    <input type="date" class="form-control" id="exampleInputPassword1" placeholder="" onChange={changeFecha}/>
  </div>
  <button  class="btn btn-primary" onClick={enviar}>Programar</button>
  </form>
    </div>
    </>
  )
}

export default ProgramarEvento