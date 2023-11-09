package com.topEducation.estudianteservice.Controller;

import com.topEducation.estudianteservice.Entity.EstudianteEntity;
import com.topEducation.estudianteservice.Service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/estudiante")
public class EstudianteController {

    @Autowired
    private EstudianteService estudianteService;
    @PostMapping()
    public ResponseEntity<EstudianteEntity> save(@RequestBody EstudianteEntity estudiante){
        estudianteService.guardar(estudiante);
        return ResponseEntity.ok(estudiante);
    }

}
