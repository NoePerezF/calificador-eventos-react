import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link" href="#">Competencia Activa</a>
      <Link to="/eventos" className='nav-item nav-link'>Competencias programadas</Link>
      <Link to="/nuevoevento" className='nav-item nav-link'>Programar competencia</Link>
    </div>
  </div>
</nav>
  )
}

export default Menu