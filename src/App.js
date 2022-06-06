import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AnadirRutina from "./modules/AnadirRutina";
import Calificaciones from "./modules/Calificaciones";
import EventosProgramados from "./modules/EventosProgramados";
import Login from "./modules/Login";
import ProgramarEvento from "./modules/ProgramarEvento";

function App() {
const [evento, setevento] = useState({})

  return (
    
    <HashRouter>
      <Routes>
        <Route path="/" element={<Calificaciones/>}/>
        <Route path="/calificaciones" element={<Calificaciones/>}/>
        <Route path="/eventos" element={<EventosProgramados setevento={setevento}/>}/>
        <Route path="/nuevoevento" element={<ProgramarEvento/>}/>
        <Route path="/anadirrutina" element={<AnadirRutina evento={evento}/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
