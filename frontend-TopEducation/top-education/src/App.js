

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeTopEducation from './components/HomeTopEducation'; // Importa tu componente HomeTopEducation
import EstudianteForm from "./components/CrearEstudiante";

function App() {
  return (
    <div className="App">
   <BrowserRouter>
      <Routes>

      <Route path="/" element={<HomeTopEducation/>} />
      <Route path="/guardar" element={<EstudianteForm/>} />
  
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
