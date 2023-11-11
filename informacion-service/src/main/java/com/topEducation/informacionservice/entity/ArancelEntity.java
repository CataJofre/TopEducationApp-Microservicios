package com.topEducation.informacionservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Table(name = "arancel")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArancelEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(unique = true, nullable = false)
    private Long id_arancel;
    private Long rut_estudiante;
    private String tipo_colegio;
    private int dcto_tipo_pago;
    private int dcto_tiempo_egreso;
    private int dcto_media_examenes;
    private int dcto_colegio_procedencia;
    private String tipo_de_pago;
    private int monto_pagar;
    private int cantidad_cuotas;
    private double promedio;


}
