package com.topEducation.informacionservice.controller;

import com.topEducation.informacionservice.entity.PruebaEntity;
import com.topEducation.informacionservice.service.PruebaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@RequestMapping("/informacion")
@RestController
public class PruebaController {
    @Autowired
    PruebaService pruebaService;
    @GetMapping("/verPruebas")
    public ResponseEntity<List<PruebaEntity>> obtenerTodasLasPruebas() {
        List<PruebaEntity> pruebas = pruebaService.obtenerTodasLasPruebas();
        return ResponseEntity.ok(pruebas);
    }
    @PostMapping("/ingresarPrueba")
    public ResponseEntity<String> procesarArchivoCSV(@RequestParam("file") MultipartFile file) {
        try {
            pruebaService.procesarArchivoCSV(file);
            return ResponseEntity.ok("Archivo CSV procesado exitosamente");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error al procesar el archivo CSV: " + e.getMessage());
        }
    }

}

