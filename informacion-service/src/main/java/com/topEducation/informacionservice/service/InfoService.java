package com.topEducation.informacionservice.service;

import com.topEducation.informacionservice.entity.ArancelEntity;
import com.topEducation.informacionservice.entity.InfoEntity;
import com.topEducation.informacionservice.model.CuotasModel;
import com.topEducation.informacionservice.model.EstudianteModel;
import com.topEducation.informacionservice.repository.ArancelRepository;
import com.topEducation.informacionservice.repository.InfoRepository;
import com.topEducation.informacionservice.repository.PruebaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class InfoService {
    @Autowired
    ArancelRepository arancelRepository;
    @Autowired
    PruebaRepository pruebaRepository;
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private InfoRepository infoRepository;

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
            return cuotasList.get(0);
        } else {
            return null; // O podrías lanzar una excepción, dependiendo de tus requisitos
        }
    }

    public InfoEntity mostrarInfo(Long rut_estudiante) {
        EstudianteModel estudiante = getEstudiante(rut_estudiante);
        CuotasModel cuotas = getPrimeraCuota(rut_estudiante);
        InfoEntity info = new InfoEntity();
        ArancelEntity arancel = new ArancelEntity();
        info.setNombreEstudiante(estudiante.getNombres() + " " + estudiante.getApellidos());
        info.setRutEstudiante(rut_estudiante);
        info.setNumeroExamenesRendidos(3);
        info.setPromedioPuntajeExamenes(700);
        if (arancel.getTipo_de_pago().equals("Contado")) {
            info.setMontoTotalArancel(750000);
        } else {
            double montoBase = 1500000.0;
            double descuentoColegio = 1 - arancel.getDcto_colegio_procedencia() / 100.0;
            double descuentoTiempoEgreso = 1 - arancel.getDcto_tiempo_egreso() / 100.0;

            info.setMontoTotalArancel((int) (montoBase * descuentoColegio * descuentoTiempoEgreso));
        }
        info.setTipoPago(estudiante.getTipo_pago());
        info.setNumeroTotalCuotasPactadas(estudiante.getCantidad_cuotas());
        info.setNumeroCuotasPagadas(2);
        info.setMontoTotalPagado(cuotas.getValor_de_cuota() * 2);
        info.setFechaUltimoPago(cuotas.getFechaPago());
        info.setSaldoPorPagar(info.getMontoTotalArancel() - info.getMontoTotalPagado());
        info.setNumeroCuotasConRetraso(0);
        infoRepository.save(info);
        return info;
    }
}
