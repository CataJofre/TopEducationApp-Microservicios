import axios from "axios";
const PRUEBA_API_URL = "http://localhost:8080/informacion";

const informacionService = {
  procesarArchivoCSV: async (file) => {
    try {
       await axios.post(`${PRUEBA_API_URL}/ingresarPrueba`, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return { success: true, message: 'Archivo CSV procesado exitosamente' };

    } catch (error) {
        console.error('Error al procesar el archivo CSV:', error);
        console.error('Detalles del error:', error.response);
    }
  },

  obtenerExamenes: async () => {
    try {
      const response = await axios.get(`${PRUEBA_API_URL}/verPruebas`);
      console.log("Response Data from obtenerExamenes:", response.data); // Agrega este log
      return response.data;
    } catch (error) {
      console.error('Error al obtener los exámenes:', error);
      console.error('Detalles del error:', error.response);
    }
  },
  
  plantilla: async (id) => {
    try {
      const response = await axios.post(`${PRUEBA_API_URL}/arancel/crear/${id}`);
      console.log("Response Data from plantilla:", response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el arancel:', error);
      console.error('Detalles del error:', error.response);
    }
  },
infoEstudiante(id){
  return axios.post(PRUEBA_API_URL + id);
}
}

export default informacionService;
