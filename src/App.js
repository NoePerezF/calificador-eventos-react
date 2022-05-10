import { HashRouter, Route, Routes } from "react-router-dom";
import Calificaciones from "./modules/Calificaciones";
import EventosProgramados from "./modules/EventosProgramados";
import Login from "./modules/Login";

function App() {
  return (
    
    <HashRouter>
      <Routes>
        <Route path="/" element={<Calificaciones/>}/>
        <Route path="/calificaciones" element={<Calificaciones/>}/>
        <Route path="/eventos" element={<EventosProgramados/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
