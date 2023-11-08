import axios from 'axios'; 

const ESTUDIANTE_API_URL = "http://localhost:8080/estudiante";

class EstudianteService {
    guardarEstudiante(estudiante) {
        return axios.post(ESTUDIANTE_API_URL, estudiante);
    }
}

const estudianteService = new EstudianteService(); 

export default estudianteService; 
