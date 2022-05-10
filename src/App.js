import { HashRouter, Route, Routes } from "react-router-dom";
import Calificaciones from "./modules/Calificaciones";
import Login from "./modules/Login";

function App() {
  return (
    
    <HashRouter>
      <Routes>
        <Route path="/" element={<Calificaciones/>}/>
        <Route path="/calificaciones" element={<Calificaciones/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
