

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeTopEducation from './components/HomeTopEducation'; // Importa tu componente HomeTopEducation

function App() {
  return (
    <div className="App">
   <BrowserRouter>
      <Routes>

      <Route path="/" element={<HomeTopEducation/>} />

  
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
