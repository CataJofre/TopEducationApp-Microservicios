package com.topEducation.estudianteservice.Controller;

import com.topEducation.estudianteservice.Entity.EstudianteEntity;
import com.topEducation.estudianteservice.Service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/estudiante")
public class EstudianteController {

    @Autowired
    private EstudianteService estudianteService;

    @PostMapping
    public void guardarEstudiante(@RequestBody EstudianteEntity estudiante) {
        estudiante.setPromedio(1.0);
        estudianteService.guardarEstudiante(estudiante);
    }

}
