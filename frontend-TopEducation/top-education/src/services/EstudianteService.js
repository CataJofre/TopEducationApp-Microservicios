import axios from 'axios'; // Importa Axios u otra biblioteca

const ESTUDIANTE_API_URL = "http://localhost:8080/estudiante";

class EstudianteService {
    guardarEstudiante(estudiante) {
        return axios.post(ESTUDIANTE_API_URL, estudiante);
    }
}

const estudianteService = new EstudianteService(); // Asigna la instancia a una variable

export default estudianteService; // Exporta la variable como módulo por defecto
