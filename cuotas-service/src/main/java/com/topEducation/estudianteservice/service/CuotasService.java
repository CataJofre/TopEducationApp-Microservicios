package com.topEducation.estudianteservice.service;

import com.topEducation.estudianteservice.entity.CuotasEntity;
import com.topEducation.estudianteservice.model.EstudianteModel;
import com.topEducation.estudianteservice.repository.CuotasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CuotasService {
    @Autowired
    CuotasRepository cuotasRepository;
    @Autowired
    private RestTemplate restTemplate;
    public List<EstudianteModel> getEstudiante(Long rut) {
        ResponseEntity<List<EstudianteModel>> responseEntity = restTemplate.exchange(
                "http://estudiante-service/estudiante/" + rut,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<EstudianteModel>>() {}
        );
        return responseEntity.getBody();
    }


    public Optional<CuotasEntity> obtenerEstudiantePorRut(Long rutEstudiante) {
        return cuotasRepository.findById(rutEstudiante);
    }


    }

