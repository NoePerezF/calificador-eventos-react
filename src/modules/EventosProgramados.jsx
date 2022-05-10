import React, { useEffect, useState } from 'react'
import Menu from './Menu'

const EventosProgramados = () => {
    const [eventos, seteventos] = useState([])
    useEffect(() => {
        const getEventos = async() =>{
            try{
              const response = await fetch('https://calificador-eventos.herokuapp.com/api/eventos',{ 
                  headers : { 'Content-Type': 'application/json' },
                  method: 'GET',
                  mode: 'cors', // <---
                  cache: 'default',
                })
              const responseJson = await response.json()
              seteventos(responseJson)
            }
            catch(e){
              console.log("Error : "+e);
            }
          }
          getEventos()
    }, [])
    
  return (
    <>
        <Menu/>
        <table class="table">
            <thead class="thead-dark">
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Fecha</th>
                <th scope="col">Status</th>
                <th scope="col">Acciones</th>
            </tr>
            </thead>
            <tbody>
                {eventos.map(e =>{
                    return(
                    <tr>
                        <td>{e.nombre}</td>
                        <td>{e.fecha}</td>
                        <td>{e.estado}</td>
                        <th scope="col">Activar</th>
                    </tr>
                    )
                })}
                
  </tbody>
</table>
    </>
  )
}

export default EventosProgramados