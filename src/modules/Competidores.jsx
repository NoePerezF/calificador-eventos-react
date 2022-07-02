import React from 'react'
import Menu from './Menu'

const Competidores = ({rutina}) => {
  return (
    <>
        <Menu/>
        <div style={{ 
      backgroundImage: `url(${process.env.PUBLIC_URL + '/fondo.png'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed'}} className = "h-100 w-100 text-white">
        <table class="table table-dark">
            <thead class="thead-dark text-center">
            <tr>
                <th scope="col">Orden</th>
                <th scope="col">Status</th>
            </tr>
            </thead>
            <tbody className='text-center'>
                {rutina.competidores.map(e =>{
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
    </div>
    </>
  )
}

export default Competidores