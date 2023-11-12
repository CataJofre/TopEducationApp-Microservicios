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
    public ResponseEntity<String> generarCuotas(@RequestParam("rut_estudiante") Long rut_estudiante) {


        try {
            cuotasService.generarCuotasParaEstudiante(rut_estudiante);
            return new ResponseEntity<>("Cuotas generadas exitosamente", HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>("Estudiante no encontrado", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al generar cuotas: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("{rut_estudiante}")
    public List<CuotasEntity> obtenerCuotasPorRut(@PathVariable Long rut_estudiante) {
        return cuotasService.obtenerCuotasPorRut(rut_estudiante);
    }

    @PostMapping("/procesar")
    public void procesarCuotasVencidas() {
        cuotasService.procesarCuotasVencidas();
    }

    @PostMapping("/pagar")
    public ResponseEntity<String> registrarPago(@RequestBody List<Long> cuotasPagadasIds) {
        try {
            cuotasService.registrarPago(cuotasPagadasIds);
            return ResponseEntity.ok("Pagos registrados exitosamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al registrar pagos: " + e.getMessage());
        }
    }

}

