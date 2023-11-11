package com.topEducation.informacionservice.repository;

import com.topEducation.informacionservice.entity.ArancelEntity;
import com.topEducation.informacionservice.entity.PruebaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ArancelRepository extends JpaRepository<ArancelEntity, Long> {
    @Query("SELECT a FROM ArancelEntity a WHERE a.rut_estudiante = :rut_estudiante")
    ArancelEntity findByRutEstudiante(@Param("rut_estudiante") Long rut_Estudiante);
}