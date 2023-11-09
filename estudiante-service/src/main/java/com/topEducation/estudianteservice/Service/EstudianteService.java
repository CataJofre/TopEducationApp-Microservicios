package com.topEducation.estudianteservice.Service;

import com.topEducation.estudianteservice.Entity.EstudianteEntity;
import com.topEducation.estudianteservice.Repository.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstudianteService {
    @Autowired
    EstudianteRepository estudianteRepository;

    public EstudianteEntity guardar(EstudianteEntity newEstudiante){
        if (newEstudiante != null){
            if (newEstudiante.getTipo_pago().equals("Contado")){
                newEstudiante.setArancel(750000);
                return estudianteRepository.save(newEstudiante);
            }
            newEstudiante.setArancel(0);
            return estudianteRepository.save(newEstudiante);
        }
        return null;
    }
}
