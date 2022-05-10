import React, { useEffect, useState } from 'react'
import SockJsClient from 'react-stomp';

const Calificaciones = () => {
  const SOCKET_URL = 'https://calificador-eventos.herokuapp.com/ws'
  const [ejecucion, setejecucion] = useState([])
  const [impresion, setimpresion] = useState([])
  const [dificultad, setdificultad] = useState([])
  const [activo, setactivo] = useState(false)
  const onMessageReceived = (m) => {
    console.log(m);
    setejecucion(m.ejecucion)
    setimpresion(m.impresionArtistica)
    setdificultad(m.dificultad)
  }
  useEffect(() => {
    const isEventoActivo = async() =>{
      try{
        const response = await fetch('https://calificador-eventos.herokuapp.com/api/eventoactivo',{ 
            headers : { 'Content-Type': 'application/json' },
            method: 'POST',
            mode: 'cors', // <---
            cache: 'default',
            body: requestJson
          })
        const responseJson = await response.json()
        if(responseJson.status !== 2){
            setactivo(true)
        }
      }
      catch(e){
        console.log("Error : "+e);
      }
    }
    isEventoActivo()
    
  }, [])
  
  return (
    !activo ? 
    <div className='container d-flex justify-content-center align-items-center h-100 '>
      <div className='container  align-items-center justify-content-center  '>
        <h1>No hay evento activo</h1>
      </div>
    </div> :
    <div className='container d-flex justify-content-center align-items-center h-100 '>
      <div className='container  align-items-center justify-content-center  '>
    <SockJsClient
      url={SOCKET_URL}
      topics={['/call/message']}
      onConnect={console.log("Connected!")}
      onDisconnect={console.log("Disconnected!")}
      onMessage={msg => onMessageReceived(msg)}
      debug={false}/>
      <div className='row mb-5'>
      <h3 className='mr-5'>Ejecucion</h3>
      {ejecucion.map(juez => {
        return(
          <div className='text-center'>
          <h3 className='mr-5'>{juez.juez.nombre}</h3>
          <h3 className='mr-5'>{juez.calificacion}</h3>
          </div>
        )
      })
      }
      {ejecucion.length === 5 ?
        <>
        <div className='text-center'>
        <h3 className='mr-5'>Promedio</h3>
        <h3 className='mr-5'>{(ejecucion[0].calificacion+ejecucion[1].calificacion+ejecucion[2].calificacion+ejecucion[3].calificacion+ejecucion[4].calificacion)/5}</h3>
        </div>
        </>:<></>
      }
      </div>
      
      <div className='row mb-5'>
      <h3 className='mr-5'>Impresion Artistica</h3>
      {impresion.map(juez => {
        return(
          <div className='text-center'>
          <h3 className='mr-5'>{juez.juez.nombre}</h3>
          <h3 className='mr-5'>{juez.calificacion}</h3>
          </div>
        )
      })}
      {impresion.length === 5 ?
        <>
        <div className='text-center'>
        <h3 className='mr-5'>Promedio</h3>
        <h3 className='mr-5'>{(impresion[0].calificacion+impresion[1].calificacion+impresion[2].calificacion+impresion[3].calificacion+impresion[4].calificacion)/5}</h3>
        </div>
        </>:<></>
      }
      </div>

      <div className='row mb-5'>
      <h3 className='mr-5'>Dificultad</h3>
      {dificultad.map(juez => {
        return(
          <div className='text-center'>
          <h3 className='mr-5'>{juez.juez.nombre}</h3>
          <h3 className='mr-5'>{juez.calificacion}</h3>
          </div>
        )
      })}
      {dificultad.length === 5 ?
        <>
        <div className='text-center'>
        <h3 className='mr-5'>Promedio</h3>
        <h3 className='mr-5'>{(dificultad[0].calificacion+dificultad[1].calificacion+dificultad[2].calificacion+dificultad[3].calificacion+dificultad[4].calificacion)/5}</h3>
        </div>
        </>:<></>
      }
      </div>

      </div>
  </div>
  )
}

export default Calificaciones