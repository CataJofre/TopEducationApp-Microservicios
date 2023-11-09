package com.topEducation.estudianteservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name="estudiante")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EstudianteModel{
    @Id
    @Column(unique = true, nullable = false)
    private Long rut_estudiante;
    private String nombres;
    private String apellidos;
    private LocalDate fecha_nacimiento;
    private int egreso_colegio;
    private String nombre_colegio;
    private String tipo_colegio;
    private String tipo_pago;
    private int arancel;
    private int cantidad_cuotas;
}