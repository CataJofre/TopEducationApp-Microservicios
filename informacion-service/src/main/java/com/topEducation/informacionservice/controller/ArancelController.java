package com.topEducation.informacionservice.controller;

import com.topEducation.informacionservice.entity.ArancelEntity;
import com.topEducation.informacionservice.service.ArancelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/informacion")
@RestController
public class ArancelController {
    @Autowired
    ArancelService arancelService;

    @GetMapping("/arancel/{rut_estudiante}")
    public ArancelEntity getRut_estudiante(@RequestParam Long rut_estudiante) {
      return arancelService.obtenerArancelPorRut(rut_estudiante);
    }

}
