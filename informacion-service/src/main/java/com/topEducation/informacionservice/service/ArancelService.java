package com.topEducation.informacionservice.service;

import com.topEducation.informacionservice.entity.ArancelEntity;
import com.topEducation.informacionservice.model.CuotasModel;
import com.topEducation.informacionservice.model.EstudianteModel;
import com.topEducation.informacionservice.repository.ArancelRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.List;
@Service
public class ArancelService {
    @Autowired
    ArancelRepository arancelRepository;

    @Autowired
    private RestTemplate restTemplate;
    public EstudianteModel getEstudiante(Long rut_estudiante) {
        ResponseEntity<EstudianteModel> responseEntity = restTemplate.exchange(
                "http://estudiante-service/estudiante/" + rut_estudiante,
                HttpMethod.GET,
                null,
                EstudianteModel.class
        );
        return responseEntity.getBody();
    }
    public CuotasModel getCuotas(Long rut_estudiante) {
        ResponseEntity<CuotasModel> responseEntity = restTemplate.exchange(
                "http://cuotas-service/cuotas/" + rut_estudiante,
                HttpMethod.GET,
                null,
                CuotasModel.class
        );
        return responseEntity.getBody();
    }
    public int getSumaCuotasPagadas(Long rut_estudiante) {
        ResponseEntity<List<CuotasModel>> responseEntity = restTemplate.exchange(
                "http://cuotas-service/cuotas/" + rut_estudiante,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<CuotasModel>>() {}
        );

        List<CuotasModel> cuotasList = responseEntity.getBody();

        if (cuotasList != null) {
            return cuotasList.stream()
                    .mapToInt(CuotasModel::getCuotas_pagadas)
                    .sum();
        } else {
            return 0;
        }
    }
    public void guardarArancel(ArancelEntity arancel) {
        arancelRepository.save(arancel);
    }
    public ArancelEntity generarArancel(Long rut_estudiante) {
        // Obtener información del estudiante
        EstudianteModel estudiante = getEstudiante(rut_estudiante);

        // Obtener información de las cuotas
        CuotasModel cuotas = getCuotas(rut_estudiante);

        // Construir la instancia de ArancelEntity
        ArancelEntity arancel = new ArancelEntity();
        arancel.setRut_estudiante(rut_estudiante);
        arancel.setTipo_colegio(estudiante.getTipo_colegio());
        if (estudiante.getTipo_colegio().equals("Municipal")) {
            arancel.setDcto_colegio_procedencia(20);
        } else if (estudiante.getTipo_colegio().equals("Subvencionado")) {
            arancel.setDcto_colegio_procedencia(10);
        } else {
            arancel.setDcto_colegio_procedencia(0);
        }
        if (estudiante.getTipo_pago().equals("Contado")) {
            arancel.setDcto_tipo_pago(0);
        } else {
            arancel.setDcto_tipo_pago(10);
        }
       if (estudiante.getEgreso_colegio() >= 2022) {
            arancel.setDcto_tiempo_egreso(15);
        } else if (estudiante.getEgreso_colegio() >= 2021) {
            arancel.setDcto_tiempo_egreso(8);
        }else if (estudiante.getEgreso_colegio() >= 2019) {
           arancel.setDcto_tiempo_egreso(4);
       }
       else {
            arancel.setDcto_tiempo_egreso(0);
        }
        arancel.setDcto_media_examenes(0);
        arancel.setDcto_colegio_procedencia(estudiante.getArancel());
        arancel.setTipo_de_pago(estudiante.getTipo_pago());
        arancel.setMonto_pagar(cuotas.getValor_de_cuota() * cuotas.getCuotas_totales()); // Ejemplo de cálculo del monto a pagar
        arancel.setCantidad_cuotas(cuotas.getCuotas_totales());

        // Guardar el arancel en la base de datos
        guardarArancel(arancel);
        return arancel;
    }

    public List<ArancelEntity> obtenerTodosLosAranceles() {
        return arancelRepository.findAll();
    }
    public ArancelEntity obtenerArancelPorRut(Long rut_estudiante) {
        return arancelRepository.findByRutEstudiante(rut_estudiante);
    }
}
