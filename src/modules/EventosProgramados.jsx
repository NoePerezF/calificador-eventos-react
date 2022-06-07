import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Menu from './Menu'

const EventosProgramados = ({setevento}) => {
    const [eventos, seteventos] = useState([])
    const [redirect, setredirect] = useState(0)
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
              seteventos(responseJson.reverse())
            }
            catch(e){
              console.log("Error : "+e);
            }
          }
          getEventos()
    }, [])

    const getDate = ( times) => {
        const date = new Date(times)
        let month = date.getMonth()+1
        month < 10 ? month = '0'+month : month = month
        let day = date.getDate()+1
        day < 10 ? day = '0'+day : day = day
        const year = date.getFullYear()
        return day + "-" + month + "-" + year
    }

    const activarEvento = async(e)=>{
        const evento = {id: e.target.id}
        const bodyJson = JSON.stringify(evento)
        try{
            const response = await fetch('https://calificador-eventos.herokuapp.com/api/activarevento',{ 
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

    const cancelarEvento = async(e)=>{
        const evento = {id: e.target.id}
        const bodyJson = JSON.stringify(evento)
        try{
            const response = await fetch('https://calificador-eventos.herokuapp.com/api/terminarevento',{ 
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
    const getEvento = async(e)=>{
        const evento = {id: e.target.id}
        const bodyJson = JSON.stringify(evento)
        try{
            const response = await fetch('https://calificador-eventos.herokuapp.com/api/evento',{ 
                headers : { 'Content-Type': 'application/json' },
                method: 'POST',
                mode: 'cors', // <---
                cache: 'default',
                body: bodyJson
              })
            const responseJson = await response.json()
            setevento(responseJson)
            setredirect(1)
        }
        catch(e){
            console.log("Error : "+e);
        }
    }
    const verRutinas = async(e)=>{
        const evento = {id: e.target.id}
        const bodyJson = JSON.stringify(evento)
        try{
            const response = await fetch('https://calificador-eventos.herokuapp.com/api/evento',{ 
                headers : { 'Content-Type': 'application/json' },
                method: 'POST',
                mode: 'cors', // <---
                cache: 'default',
                body: bodyJson
              })
            const responseJson = await response.json()
            setevento(responseJson)
            setredirect(2)
        }
        catch(e){
            console.log("Error : "+e);
        }
    }
  return (
      redirect === 0 ?
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
                        {e.estado === 1 ? 
                            <td>Creado</td> :
                         e.estado === 2 ?
                         <td>Activo</td>:
                         e.estado === 3 ?
                         <td>Terminado</td> :
                         e.estado === 4 ?
                         <td>Cancelado</td> :
                         <td>Error</td>
                        }
                       { e.estado === 1 ?
                       <>
                        <th scope="col"><button type="button" class="btn btn-success" id={e.id} onClick={activarEvento}>Activar</button>
                        <button type="button" class="btn btn-success" id={e.id} onClick={getEvento}>Añadir rutina</button>
                        <button type="button" class="btn btn-success" id={e.id} onClick={verRutinas}>Rutinas</button></th>
                        </>:
                        e.estado === 2 ?
                        <th scope="col"><button type="button" class="btn btn-danger" id={e.id} onClick={cancelarEvento}>Terminas</button></th>:
                        <></>
                       }
                    </tr>
                    )
                })}
                
  </tbody>
</table>
    
    </>: redirect === 1?
    <Navigate to={"/anadirrutina"}/>: redirect ===2 ?
    <Navigate to={"/rutinas"}/>:
    <></>
  )
}

export default EventosProgramados