package com.topEducation.estudianteservice.controller;

import com.topEducation.estudianteservice.entity.CuotasEntity;
import com.topEducation.estudianteservice.service.CuotasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RequestMapping("/cuotas")
@RestController
public class CuotasController {
    @Autowired
    CuotasService cuotasService;



    @PostMapping()
    public ResponseEntity<String> generarCuotas(@RequestParam Long rutEstudiante) {
        try {
            cuotasService.generarCuotasParaEstudiante(rutEstudiante);
            return new ResponseEntity<>("Cuotas generadas exitosamente", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Estudiante no encontrado", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al generar cuotas: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
