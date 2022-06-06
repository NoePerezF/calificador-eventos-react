import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Menu from './Menu'

const Rutinas = ({evento,setrutina}) => {
    const [redirect, setredirect] = useState(0)
  const anadirCompetidores = (e) => {
    setrutina({id: e.target.id})
    setredirect(1)
  }
  return (
      redirect === 0 ?
    <>
        <Menu/>
        <table class="table">
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
                        <th scope="col"><button type="button" class="btn btn-success" id={e.id} onClick={anadirCompetidores}>Añadir competidores</button>
                        </th>
                    </tr>
                    )
                })}
                
                
  </tbody>
</table>
    
    </>: redirect === 1 ?
    <Navigate to={"/anadircompetidor"}/>:<></>
  )
}

export default Rutinas