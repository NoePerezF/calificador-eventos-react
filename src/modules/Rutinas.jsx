import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Menu from './Menu'

const Rutinas = ({evento,setrutina}) => {
    const [redirect, setredirect] = useState(0)
  const anadirCompetidores = (e) => {
      console.log(evento);
    const rutina = evento.rutinas.filter(r => r.id === parseInt(e.target.id))
    console.log(rutina);
    setrutina(rutina[0])
    setredirect(1)
  }
  const verCompetidores = (e) =>{
    const rutina = evento.rutinas.filter(r => r.id === parseInt(e.target.id))
    console.log(rutina);
    setrutina(rutina[0])
    setredirect(2)
  }
  return (
      redirect === 0 ?
    <>
        <Menu/>
        <div style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '/fondo.png'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed'}} className = "h-100 w-100 text-white">
        <table class="table table-dark text-center">
            <thead class="thead-dark">
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Status</th>
                <th scope="col">Acciones</th>
            </tr>
            </thead>
            <tbody>
                {evento.rutinas.map(e =>{
                    return(
                    <tr>
                        <td>{e.nombre}</td>
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
                        <th scope="col"><button type="button" className='btn btn-success mr-3' id={e.id} onClick={anadirCompetidores}>Añadir competidores</button>
                        <button type="button" className='btn btn-success mr-3' id={e.id} onClick={verCompetidores}>Ver competidores</button>
                        </th>
                    </tr>
                    )
                })}
                
                
  </tbody>
</table>
    </div>
    </>: redirect === 1 ?
    <Navigate to={"/anadircompetidor"}/>:
    redirect === 2 ?
    <Navigate to={"/competidores"}/>:
    <></>
  )
}

export default Rutinas