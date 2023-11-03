package com.topEducation.estudianteservice.Service;

import com.topEducation.estudianteservice.Entity.EstudianteEntity;
import com.topEducation.estudianteservice.Repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstudianteService {
    @Autowired
    EstudianteRepository estudianteRepository;
    public EstudianteEntity guardarEstudiante(EstudianteEntity estudiante) {
        return estudianteRepository.save(estudiante);
    }
}
