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

    const getDate = ( times) => {
        const date = new Date(times)
        let month = date.getMonth()
        month < 10 ? month = '0'+month : month = month
        let day = date.getDate()
        day < 10 ? day = '0'+day : day = day
        const year = date.getFullYear()
        return day + "-" + month + "-" + year
    }
    
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
                        <td>{getDate(e.fecha)}</td>
                        {e.stado === 1 ? 
                            <td>Creado</td> :
                         e.estado === 2 ?
                         <td>Activo</td>:
                         e.estado === 3 ?
                         <td>Terminado</td> :
                         e.estado === 4 ?
                         <td>Cancelado</td> :
                         <td>Error</td>
                        }
                        
                        <th scope="col"><button type="button" class="btn btn-success">Activar</button></th>
                    </tr>
                    )
                })}
                
  </tbody>
</table>
    </>
  )
}

export default EventosProgramados