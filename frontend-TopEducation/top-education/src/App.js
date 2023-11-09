import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeTopEducation from './components/HomeTopEducation'; // Importa tu componente HomeTopEducation
import EstudianteForm from "./components/CrearEstudiante";
import InfoEstudiantes from "./components/InfoEstudiantes";

function App() {
  return (
    <div className="App">
   <BrowserRouter>
      <Routes>

      <Route path="/" element={<HomeTopEducation/>} />
      <Route path="/guardar" element={<EstudianteForm/>} />
      <Route path="/estudiante" element={<InfoEstudiantes/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
