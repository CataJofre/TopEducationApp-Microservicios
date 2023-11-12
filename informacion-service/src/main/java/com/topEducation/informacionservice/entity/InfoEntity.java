package com.topEducation.informacionservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "informacion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long rutEstudiante;
    private String nombreEstudiante;
    private int numeroExamenesRendidos;
    private double promedioPuntajeExamenes;
    private double montoTotalArancel;
    private String tipoPago;
    private int numeroTotalCuotasPactadas;
    private int numeroCuotasPagadas;
    private double montoTotalPagado;
    private LocalDate fechaUltimoPago;
    private double saldoPorPagar;
    private int numeroCuotasConRetraso;
}
