package com.topEducation.estudianteservice.service;

import com.topEducation.estudianteservice.entity.CuotasEntity;
import com.topEducation.estudianteservice.model.EstudianteModel;
import com.topEducation.estudianteservice.repository.CuotasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class CuotasService {
    @Autowired
    CuotasRepository cuotasRepository;
    @Autowired
    private RestTemplate restTemplate;
    public List<EstudianteModel> getEstudiante(Long rut) {
        ResponseEntity<List<EstudianteModel>> responseEntity = restTemplate.exchange(
                "http://estudiante-service/estudiante/" + rut,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<EstudianteModel>>() {}
        );
        return responseEntity.getBody();
    }


    public Optional<CuotasEntity> obtenerEstudiantePorRut(Long rutEstudiante) {
        return cuotasRepository.findById(rutEstudiante);
    }

    public int descuentoTipoColegio(String tipoColegio) {
        if ("Municipal".equals(tipoColegio)) {
            return 20;
        } else if ("Subvencionado".equals(tipoColegio)) {
            return 10;
        } else if ("Privado".equals(tipoColegio)) {
            return 0;
        } else {
            throw new IllegalArgumentException("Tipo de colegio desconocido: " + tipoColegio);
        }
    }
    public int descuentoEgreso(int egreso) {
        int actual = 2023;
        int diferencia = actual - egreso;

        if (diferencia < 1) {
            return 15;
        } else if (diferencia <= 2) {
            return 8;
        } else if (diferencia <= 4) {
            return 4;
        } else {
            return 0;
        }
    }

    public void generarCuotasParaEstudiante(Long rut_estudiante) {
        EstudianteModel estudiante = getEstudiante(rut_estudiante).get(0);
        if (estudiante != null) {
            int cantidadCuotas = estudiante.getCantidad_cuotas();
            int descuentoEgreso = descuentoEgreso(estudiante.getEgreso_colegio());
            int descuentoColegio = descuentoTipoColegio(estudiante.getTipo_colegio());
            double descuentoTotal = 1.0 - (descuentoColegio / 100.0) - (descuentoEgreso / 100.0);
            double montoDespuesDescuento = 1500000 * descuentoTotal;
            LocalDate fechaActual = LocalDate.now();
            LocalDate fechaCuota = fechaActual.withDayOfMonth(5);
            for (int i = 1; i <= cantidadCuotas; i++) {
                CuotasEntity cuota = new CuotasEntity();
                cuota.setRut_estudiante(estudiante.getRut_estudiante());
                cuota.setEstadoCuota("Pendiente");
                cuota.setCuotas_totales(cantidadCuotas);
                cuota.setValor_de_cuota((int) (montoDespuesDescuento / cantidadCuotas));
                cuota.setFechaPago(fechaCuota.plusMonths(i));
                cuota.setDcto_media_examenes(0);
                cuota.setCuotas_pagadas(0);
                cuota.setInteres_aplicado(0);
                cuotasRepository.save(cuota);
            }
        }

    }
}

