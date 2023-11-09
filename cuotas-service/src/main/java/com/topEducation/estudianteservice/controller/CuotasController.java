package com.topEducation.estudianteservice.controller;

import com.topEducation.estudianteservice.entity.CuotasEntity;
import com.topEducation.estudianteservice.service.CuotasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/estudiante")
@RestController
public class CuotasController {
    @Autowired
    CuotasService cuotasService;


    @GetMapping()
    public ResponseEntity<List<CuotasEntity>> todos(){
        List<CuotasEntity>estudiantes = cuotasService.getAll();
        return ResponseEntity.ok(estudiantes);
    }

    @PostMapping()
    public ResponseEntity<CuotasEntity> save(@RequestBody CuotasEntity cuotasEntity){
        cuotasService.guardar(cuotasEntity);
        return ResponseEntity.ok(cuotasEntity);
    }
    @GetMapping("/{rutEstudiante}")
    public Optional<CuotasEntity> obtenerEstudiantePorRut(@PathVariable Long rutEstudiante) {
        return cuotasService.obtenerEstudiantePorRut(rutEstudiante);
    }

}
