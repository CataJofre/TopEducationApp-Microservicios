import axios from 'axios'; 

const ESTUDIANTE_API_URL = "http://localhost:8080/estudiante/";

class EstudianteService {

    createEstudiante(data){
        return axios.post(ESTUDIANTE_API_URL, data);
    }
    infoEstudiante(id){
        return axios.get(ESTUDIANTE_API_URL + id);
    }

}

const estudianteService = new EstudianteService(); 

export default estudianteService; 
