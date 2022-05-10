import { HashRouter, Route, Routes } from "react-router-dom";
import Calificaciones from "./modules/Calificaciones";
import EventosProgramados from "./modules/EventosProgramados";
import Login from "./modules/Login";
import ProgramarEvento from "./modules/ProgramarEvento";

function App() {
  return (
    
    <HashRouter>
      <Routes>
        <Route path="/" element={<Calificaciones/>}/>
        <Route path="/calificaciones" element={<Calificaciones/>}/>
        <Route path="/eventos" element={<EventosProgramados/>}/>
        <Route path="/nuevoevento" element={<ProgramarEvento/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
