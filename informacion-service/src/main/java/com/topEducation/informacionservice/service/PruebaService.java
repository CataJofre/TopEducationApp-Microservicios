package com.topEducation.informacionservice.service;

import com.topEducation.informacionservice.entity.PruebaEntity;
import com.topEducation.informacionservice.model.EstudianteModel;
import com.topEducation.informacionservice.repository.PruebaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PruebaService {
    @Autowired
    PruebaRepository pruebaRepository;

    @Autowired
    private RestTemplate restTemplate;
    public EstudianteModel getEstudiante(Long rut) {
        ResponseEntity<EstudianteModel> responseEntity = restTemplate.exchange(
                "http://estudiante-service/estudiante/" + rut,
                HttpMethod.GET,
                null,
                EstudianteModel.class  // Cambia aquí para que coincida con el tipo de respuesta esperado
        );
        return responseEntity.getBody();
    }
    public List<PruebaEntity> obtenerTodasLasPruebas() {
        return pruebaRepository.findAll();
    }
    public void procesarArchivoCSV(MultipartFile file) throws IOException {
        // Leer el archivo CSV y guardar los datos en la base de datos
        List<PruebaEntity> pruebas = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] datos = line.split(",");
                if (datos.length == 4) {
                    PruebaEntity prueba = new PruebaEntity();
                    prueba.setRut_estudiante(Long.parseLong(datos[1]));
                    prueba.setPuntaje_obtenido(Integer.parseInt(datos[2]));
                    prueba.setFecha_examen(LocalDate.parse(datos[3]));
                    pruebas.add(prueba);
                }
            }
        }
        pruebaRepository.saveAll(pruebas);
    }
}

