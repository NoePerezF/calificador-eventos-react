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
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
    </>
  )
}

export default EventosProgramados