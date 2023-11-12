package com.topEducation.informacionservice.service;

import com.topEducation.informacionservice.entity.ArancelEntity;
import com.topEducation.informacionservice.entity.PruebaEntity;
import com.topEducation.informacionservice.model.CuotasModel;
import com.topEducation.informacionservice.model.EstudianteModel;
import com.topEducation.informacionservice.repository.ArancelRepository;
import com.topEducation.informacionservice.repository.PruebaRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ArancelService {
    @Autowired
    ArancelRepository arancelRepository;
    @Autowired
    PruebaRepository pruebaRepository;
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

    public CuotasModel getPrimeraCuota(Long rut_estudiante) {
        ResponseEntity<List<CuotasModel>> responseEntity = restTemplate.exchange(
                "http://cuotas-service/cuotas/" + rut_estudiante,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<CuotasModel>>() {
                }
        );

        List<CuotasModel> cuotasList = responseEntity.getBody();

        if (cuotasList != null && !cuotasList.isEmpty()) {
            // Devuelve la primera cuota encontrada
            return cuotasList.get(0);
        } else {
            // Maneja el caso donde no se encontraron cuotas
            return null; // O podrías lanzar una excepción, dependiendo de tus requisitos
        }
    }


    public ArancelEntity generarfsdfas(Long rut_estudiante) {
        EstudianteModel estudiante = getEstudiante(rut_estudiante);
        CuotasModel cuotas = getPrimeraCuota(rut_estudiante);
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
        arancel.setDcto_tipo_pago(10);
        arancel.setDcto_tiempo_egreso(15);
        arancel.setDcto_media_examenes(0);
        arancel.setTipo_de_pago(estudiante.getTipo_pago());
        arancel.setMonto_pagar(750000);
        arancel.setCantidad_cuotas(cuotas.getValor_de_cuota());
        double promedio = calcularPromedio(rut_estudiante);
        arancel.setPromedio(promedio);

        arancelRepository.save(arancel);
        return arancel;
    }

    public ArancelEntity generar(Long rut_estudiante) {
        EstudianteModel estudiante = getEstudiante(rut_estudiante);
        CuotasModel cuotas = getPrimeraCuota(rut_estudiante);
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
        } else if (estudiante.getEgreso_colegio() >= 2019) {
            arancel.setDcto_tiempo_egreso(4);
        } else {
            arancel.setDcto_tiempo_egreso(0);
        }
        arancel.setDcto_media_examenes(0);
        arancel.setTipo_de_pago(estudiante.getTipo_pago());
        if (arancel.getTipo_de_pago().equals("Contado")) {
            arancel.setMonto_pagar(750000);
        } else {
            double montoBase = 1500000.0;
            double descuentoColegio = 1 - arancel.getDcto_colegio_procedencia() / 100.0;
            double descuentoTiempoEgreso = 1 - arancel.getDcto_tiempo_egreso() / 100.0;

            arancel.setMonto_pagar((int) (montoBase * descuentoColegio * descuentoTiempoEgreso));
        }

        arancel.setPromedio(calcularPromedio(rut_estudiante));
        arancel.setCantidad_cuotas(cuotas.getCuotas_totales());
        arancelRepository.save(arancel);
        return arancel;
    }

    public List<ArancelEntity> obtenerTodosLosAranceles() {
        return arancelRepository.findAll();
    }

    public ArancelEntity obtenerArancelPorRut(Long rut_estudiante) {
        return arancelRepository.findByRutEstudiante(rut_estudiante);
    }

    public double calcularPromedio(Long rutEstudiante) {
        Integer mesMasGrande = pruebaRepository.encontrarMesMasGrande();
        List<PruebaEntity> pruebas = pruebaRepository.obtenerPruebasPorMesMasGrande(mesMasGrande);
        Map<Long, Double> promedios = new HashMap<>();

        for (PruebaEntity prueba : pruebas) {
            Long estudiante = prueba.getRut_estudiante();
            double puntaje = prueba.getPuntaje_obtenido();
            promedios.merge(estudiante, puntaje, (existing, newPuntaje) -> existing + newPuntaje);
        }

        // Verifica si el estudiante tiene pruebas asociadas antes de calcular el promedio
        if (promedios.containsKey(rutEstudiante)) {
            double totalPuntajes = promedios.get(rutEstudiante);
            int cantidadPruebas = pruebas.size(); // Si pruebas es la lista de pruebas
            double promedio = totalPuntajes / cantidadPruebas;
            return promedio;
        } else {
            // Devuelve un valor especial o maneja el caso donde no hay pruebas para el estudiante
            return 0.0; // O cualquier otro valor que consideres apropiado
        }
    }


    public int calcularDescuento(double promedio) {
        int descuento;
        if (promedio >= 950 && promedio <= 1000) {
            descuento = 10;
        } else if (promedio >= 900 && promedio <= 949) {
            descuento = 5;
        } else if (promedio >= 850 && promedio <= 899) {
            descuento = 2;
        } else {
            descuento = 0;
        }
        return descuento;
    }

    public ArancelEntity actualizarPlanilla(Long rut_estudiante) {
        ArancelEntity arancel = obtenerArancelPorRut(rut_estudiante);
        double promedio = calcularPromedio(rut_estudiante);
        int descuento = calcularDescuento(promedio);
        arancel.setPromedio(promedio);
        arancel.setDcto_media_examenes(descuento);
        arancel.setMonto_pagar(arancel.getMonto_pagar() * (1 - descuento / 100));
        arancelRepository.save(arancel);
        return arancel;
    }
}

