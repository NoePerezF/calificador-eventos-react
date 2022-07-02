import React, { useEffect, useState } from 'react'
import SockJsClient from 'react-stomp';
import Menu from './Menu';


const Calificaciones = () => {
  const SOCKET_URL = 'https://calificador-eventos.herokuapp.com/ws'
  const [ejecucion, setejecucion] = useState([])
  const [impresion, setimpresion] = useState([])
  const [dificultad, setdificultad] = useState([])
  const [activo, setactivo] = useState(false)
  const [rutina, setrutina] = useState({})
  const [competidor, setcompetidor] = useState({})
  const onMessageReceived = (m) => {
    console.log(m);
    const rutina = m.rutinas.filter(r => r.estado === 2)[0]
            const competidor = rutina.competidores.filter(c => c.estado === 2)[0]
            setrutina(rutina)
            setcompetidor(competidor)
            setejecucion(llenarJueces(competidor.calificaciones.filter(c => c.juez.tipo === 1)))
          setimpresion(llenarJueces(competidor.calificaciones.filter(c => c.juez.tipo === 2)))
          setdificultad(llenarJueces(competidor.calificaciones.filter(c => c.juez.tipo === 3)))
  }
  useEffect(() => {
    const isEventoActivo = async() =>{
      try{
        const response = await fetch('https://calificador-eventos.herokuapp.com/api/eventoactivo',{ 
            headers : { 'Content-Type': 'application/json' },
            method: 'GET',
            mode: 'cors', // <---
            cache: 'default',
          })
        const responseJson = await response.json()
        if(responseJson.status !== 2){
            setactivo(true)
            const rutina = responseJson.rutinas.filter(r => r.estado === 2)[0]
            const competidor = rutina.competidores.filter(c => c.estado === 2)[0]
            setrutina(rutina)
            setcompetidor(competidor)
            setejecucion(llenarJueces(competidor.calificaciones.filter(c => c.juez.tipo === 1)))
          setimpresion(llenarJueces(competidor.calificaciones.filter(c => c.juez.tipo === 2)))
          setdificultad(llenarJueces(competidor.calificaciones.filter(c => c.juez.tipo === 3)))
        }
      }
      catch(e){
        console.log("Error : "+e);
      }
    }
    isEventoActivo()
    
  }, [])

  const llenarJueces = (arrayJueces)=>{
    const calificacion = [{calificacion: -1,juez:{numero:1}},{calificacion: -1,juez:{numero:2}},
      {calificacion: -1,juez:{numero:3}},{calificacion: -1,juez:{numero:4}},{calificacion: -1,juez:{numero:5}}]
    const nuevasCalificacion = calificacion.map(c =>{
      const aux = arrayJueces.filter(j=>j.juez.numero === c.juez.numero)
      if(aux.length === 1){
        return aux[0]
      }else{
        return c
      }
    })  
    return nuevasCalificacion
  }

  const siguiente = async()=>{
    try{
      const response = await fetch('https://calificador-eventos.herokuapp.com/api/siguiente',{ 
          headers : { 'Content-Type': 'application/json' },
          method: 'GET',
          mode: 'cors', // <---
          cache: 'default',
        })
      const responseJson = await response.json()
      console.log("Error : "+responseJson);
      window.location.reload()
    }
    catch(e){
      console.log("Error : "+e);
    }
  }
  return (
    
    <>
    <Menu/>
    {!activo ? 
    <div style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '/fondo.png'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed'}} className = "h-100 w-100 text-white">
      <div className='row justify-content-center align-items-center minh-100 h-100'>
        <h1>No hay Competencia activa</h1>
      </div>
    </div> :
    <div style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '/fondo.png'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed'}} className = "h-100 w-100 text-white">
        <div className='row pt-5 align-items-center justify-content-start col-6'>
          <div className='col-6'></div>
      <h1>Evento: {rutina.nombre}</h1>
    </div>
    <div className='row pt-5 align-items-center justify-content-start col-6'>
    <div className='col-6'></div>
      <h1>Competidor: {competidor.nombre}</h1>
    </div>
    
    <div className='col-md-12 offset-md-2 mt-5'>
    
      <div className='   w-100 '>
      
    <SockJsClient
      url={SOCKET_URL}
      topics={['/call/message']}
      onConnect={console.log("Connected!")}
      onDisconnect={console.log("Disconnected!")}
      onMessage={msg => onMessageReceived(msg)}
      debug={false}/>
      <div className='row mb-3'>
      <h3 className=' col-2 text-center'></h3>
        <div className='col-1 text-center pt-3 pb-3 ml-3' style={{backgroundColor:'#c3a2fa',borderRadius:'1rem'}}><h3>JUEZ 1</h3></div>
        <div className='col-1 text-center pt-3 pb-3 ml-3' style={{backgroundColor:'#c3a2fa',borderRadius:'1rem'}}><h3>JUEZ 2</h3></div>
        <div className='col-1 text-center pt-3 pb-3 ml-3' style={{backgroundColor:'#c3a2fa',borderRadius:'1rem'}}><h3>JUEZ 3</h3></div>
        <div className='col-1 text-center pt-3 pb-3 ml-3' style={{backgroundColor:'#c3a2fa',borderRadius:'1rem'}}><h3>JUEZ 4</h3></div>
        <div className='col-1 text-center pt-3 pb-3 ml-3' style={{backgroundColor:'#c3a2fa',borderRadius:'1rem'}}><h3>JUEZ 5</h3></div>
      </div>
      <div className='row mb-5 '>
      <h3 className=' col-2 text-center pb-3 pt-3'>EJEC</h3>
      {ejecucion.map(juez => {
        return(
          <div className='col-1 text-center ml-3 pb-3 pt-3' style={{backgroundColor:"#8fc9f2",borderRadius:'1rem'}}>
            {juez.calificacion < 0 ? <h3 className='mr-5 col-1'></h3> : 
          <h3 className='  '>{juez.calificacion}</h3>}
          </div>
        )
      })
      }
      </div>
      <div className='row mb-5'>
      <h3 className=' col-2 text-center pb-3 pt-3'>DIF</h3>
      {dificultad.map(juez => {
        return(
          <div className='col-1 text-center ml-3 pb-3 pt-3' style={{backgroundColor:"#8fc9f2",borderRadius:'1rem'}}>
            {juez.calificacion < 0 ? <h3 className='mr-5 col-1'></h3> : 
          <h3 className=''>{juez.calificacion}</h3>
        }
          </div>
        )
      })}
      </div>
      
      <div className='row mb-5'>
      <h3 className=' col-2 text-center pb-3 pt-3'>IMP ART</h3>
      {impresion.map(juez => {
        return(
          <div className='col-1 text-center ml-3 pb-3 pt-3' style={{backgroundColor:"#8fc9f2",borderRadius:'1rem'}}>
          { juez.calificacion < 0 ? <h3 className='mr-5 col-1'></h3> : 
          <h3 className=''>{juez.calificacion}</h3>}
          </div>
        )
      })}
      </div>

      

      </div>
      <button  class="btn btn-primary" onClick={siguiente}>Siguiente</button>
  </div>
  </div>
}
  </>
  )
}

export default Calificaciones