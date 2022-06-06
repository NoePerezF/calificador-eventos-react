import React from 'react'

const Rutinas = ({evento}) => {
  return (
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
                      
                    </tr>
                    )
                })}
                
  </tbody>
</table>
    
    </>
  )
}

export default Rutinas