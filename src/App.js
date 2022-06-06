import { useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AnadirCompetidor from "./modules/AnadirCompetidor";
import AnadirRutina from "./modules/AnadirRutina";
import Calificaciones from "./modules/Calificaciones";
import EventosProgramados from "./modules/EventosProgramados";
import Login from "./modules/Login";
import ProgramarEvento from "./modules/ProgramarEvento";
import Rutinas from "./modules/Rutinas";

function App() {
const [evento, setevento] = useState({})
const [rutina, setrutina] = useState({})
  return (
    
    <HashRouter>
      <Routes>
        <Route path="/" element={<Calificaciones/>}/>
        <Route path="/calificaciones" element={<Calificaciones/>}/>
        <Route path="/eventos" element={<EventosProgramados setevento={setevento}/>}/>
        <Route path="/nuevoevento" element={<ProgramarEvento/>}/>
        <Route path="/anadirrutina" element={<AnadirRutina evento={evento}/>}/>
        <Route path="/rutinas" element={<Rutinas evento={evento} setrutina={setrutina}/>}/>
        <Route path="/anadircompetidor" element={<AnadirCompetidor  rutina={rutina}/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
