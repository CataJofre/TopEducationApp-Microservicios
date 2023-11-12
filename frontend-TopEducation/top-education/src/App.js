import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeTopEducation from './components/HomeTopEducation'; // Importa tu componente HomeTopEducation
import EstudianteForm from "./components/CrearEstudiante";
import InfoEstudiantes from "./components/InfoEstudiantes";
import GenerarCuotas   from "./components/GenerarCuotas";
import MostrarCuotas   from "./components/MostrarCuotas";
import PagarCuotas     from "./components/PagarCuotas";
import AgregarPruebas from "./components/AgregarPruebas";
import Plantilla from "./components/Plantilla";
import InformacionTotal from "./components/InformacionTotal";

function App() {
  return (
    <div className="App">
   <BrowserRouter>
      <Routes>

      <Route path="/" element={<HomeTopEducation/>} />
      <Route path="/guardar" element={<EstudianteForm/>} />
      <Route path="/estudiante" element={<InfoEstudiantes/>} />
      <Route path="/generar" element={<GenerarCuotas/>} />
      <Route path="/mostrar" element={<MostrarCuotas/>} />
      <Route path="/pagar" element={<PagarCuotas/>} />
      <Route path="/prueba" element={<AgregarPruebas/>} />
      <Route path="/arancel" element={<Plantilla/>} />
      <Route path="/informacion" element={<InformacionTotal/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
