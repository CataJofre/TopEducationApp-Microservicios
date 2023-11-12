package com.topEducation.informacionservice.controller;

import com.topEducation.informacionservice.entity.ArancelEntity;
import com.topEducation.informacionservice.service.ArancelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

@RequestMapping("/informacion")
@RestController
public class ArancelController {
    @Autowired
    ArancelService arancelService;

    @PostMapping("/arancel/crear/{rut_estudiante}")
    public ArancelEntity actualizarPlanilla(@PathVariable Long rut_estudiante) {
        return arancelService.generar(rut_estudiante);
    }


}
