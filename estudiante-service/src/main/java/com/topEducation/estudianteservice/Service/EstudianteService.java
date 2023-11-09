package com.topEducation.estudianteservice.service;

import com.topEducation.estudianteservice.entity.EstudianteEntity;
import com.topEducation.estudianteservice.repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteService {
    @Autowired
    EstudianteRepository estudianteRepository;

    public void guardar(EstudianteEntity newEstudiante){
        if (newEstudiante != null){
            if (newEstudiante.getTipo_pago().equals("Contado")){
                newEstudiante.setArancel(750000);
                estudianteRepository.save(newEstudiante);
                return;
            }
            newEstudiante.setArancel(0);
            estudianteRepository.save(newEstudiante);
        }
    }

    public List<EstudianteEntity> getAll(){
        return estudianteRepository.findAll();
    }
    public Optional<EstudianteEntity> obtenerEstudiantePorRut(Long rutEstudiante) {
        return estudianteRepository.findById(rutEstudiante);
    }
}
