import axios from 'axios'; // Importa Axios u otra biblioteca

const ESTUDIANTE_API_URL = "http://localhost:8080/estudiante";

class EstudianteService {
    guardarEstudiante(estudiante) {
        return axios.post(ESTUDIANTE_API_URL, estudiante);
    }
}

export default new EstudianteService();
