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
import java.time.Period;
import java.util.List;
import java.util.Optional;

@Service
public class CuotasService {
    @Autowired
    CuotasRepository cuotasRepository;
    @Autowired
    private RestTemplate restTemplate;

    public EstudianteModel getEstudiante(Long rut) {
        ResponseEntity<EstudianteModel> responseEntity = restTemplate.exchange(
                "http://estudiante-service/estudiante/" + rut,
                HttpMethod.GET,
                null,
                EstudianteModel.class
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
        EstudianteModel estudiante = getEstudiante(rut_estudiante);
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
        } else {
            throw new IllegalArgumentException("Estudiante no encontrado");
        }
    }

    public List<CuotasEntity> obtenerCuotasPorRut(Long rut_estudiante) {
        return cuotasRepository.findByRutEstudiante(rut_estudiante);
    }

    public void procesarCuotasVencidas() {
        LocalDate fechaActual = LocalDate.now();
        List<CuotasEntity> cuotasPendientes = cuotasRepository.findByEstadoCuota("Pendiente"); // Obtener cuotas pendientes
        for (CuotasEntity cuota : cuotasPendientes) {
            LocalDate fechaPago = cuota.getFechaPago();
            int mesesAtraso = Period.between(fechaPago, fechaActual).getMonths();
            if (mesesAtraso > 0) {
                int interesPorcentaje = obtenerInteresPorMesesAtraso(mesesAtraso);
                int valorConInteres = cuota.getValor_de_cuota() + cuota.getValor_de_cuota() * interesPorcentaje / 100;
                cuota.setInteres_aplicado(interesPorcentaje);
                cuota.setValor_de_cuota(valorConInteres);
                cuota.setEstadoCuota("Vencida");
            }
            cuotasRepository.save(cuota);
        }
    }

    public int obtenerInteresPorMesesAtraso(int mesesAtraso) {
        if (mesesAtraso == 1) {
            return 3; // 3% de interés para 1 mes de atraso
        } else if (mesesAtraso == 2) {
            return 6; // 6% de interés para 2 meses de atraso
        } else if (mesesAtraso == 3) {
            return 9; // 9% de interés para 3 meses de atraso
        } else {
            return 15; // 15% de interés para más de 3 meses de atraso
        }
    }

    public void registrarPago(List<Long> cuotasPagadasIds) {
        for (Long cuotaId : cuotasPagadasIds) {
            CuotasEntity cuota = cuotasRepository.findById(cuotaId).orElse(null);
            if (cuota != null) {
                cuota.setEstadoCuota("Pagada");
                cuota.setCuotas_pagadas(cuota.getCuotas_pagadas() + 1);
                cuotasRepository.save(cuota);
            }
        }
    }

    public void aplicarDescuentosEnCuotasPendientes() {
        List<CuotasEntity> cuotasPendientes = cuotasRepository.findByEstadoCuota("Pendiente");
        for (CuotasEntity cuota : cuotasPendientes) {
            int descuentoEstudiante = cuota.getDcto_media_examenes();
            double descuentoAplicado = (double) descuentoEstudiante;
            cuota.setDcto_media_examenes(descuentoEstudiante);
            double valorConDescuento = cuota.getValor_de_cuota() * (1 - descuentoAplicado / 100);
            int valorRedondeado = (int) Math.round(valorConDescuento);
            cuota.setValor_de_cuota(valorRedondeado);
            cuotasRepository.save(cuota);
        }
    }
}

