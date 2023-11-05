package com.topEducation.estudianteservice.Controller;

import com.topEducation.estudianteservice.Entity.EstudianteEntity;
import com.topEducation.estudianteservice.Service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/estudiante")
public class EstudianteController {

    @Autowired
    private EstudianteService estudianteService;

    @PostMapping("/guardar")
    public ResponseEntity<EstudianteEntity> guardarEstudiante(@RequestBody EstudianteEntity estudiante) {
        estudiante.setPromedio(1.0); // Establece el promedio en 1
        EstudianteEntity estudianteGuardado = estudianteService.guardarEstudiante(estudiante);
        return new ResponseEntity<>(estudianteGuardado, HttpStatus.CREATED);
    }

}
