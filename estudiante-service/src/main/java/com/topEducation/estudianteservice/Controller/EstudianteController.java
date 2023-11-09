package com.topEducation.estudianteservice.controller;

import com.topEducation.estudianteservice.entity.EstudianteEntity;
import com.topEducation.estudianteservice.service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/estudiante")
@RestController
public class EstudianteController {
    @Autowired
    EstudianteService estudianteService;


    @GetMapping()
    public ResponseEntity<List<EstudianteEntity>> todos(){
        List<EstudianteEntity>estudiantes = estudianteService.getAll();
        return ResponseEntity.ok(estudiantes);
    }

    @PostMapping()
    public ResponseEntity<EstudianteEntity> save(@RequestBody EstudianteEntity estudianteEntity){
        estudianteService.guardar(estudianteEntity);
        return ResponseEntity.ok(estudianteEntity);
    }

}
