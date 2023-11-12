package com.topEducation.informacionservice.controller;

import com.topEducation.informacionservice.entity.ArancelEntity;
import com.topEducation.informacionservice.entity.InfoEntity;
import com.topEducation.informacionservice.service.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/informacion")
@RestController
public class InfoController {
    @Autowired
    InfoService infoService;
    @PostMapping("/mostrar/{rut_estudiante}")
    public InfoEntity mostrarInfo (@PathVariable Long rut_estudiante) {
        return   infoService.mostrarInfo(rut_estudiante);
    }
}
