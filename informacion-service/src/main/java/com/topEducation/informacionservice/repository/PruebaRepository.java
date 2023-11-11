package com.topEducation.informacionservice.repository;

import com.topEducation.informacionservice.entity.PruebaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PruebaRepository extends JpaRepository<PruebaEntity, Long> {
   @Query("SELECT MAX(MONTH(p.fecha_examen)) FROM PruebaEntity p")
   Integer encontrarMesMasGrande();

   @Query("SELECT p FROM PruebaEntity p WHERE MONTH(p.fecha_examen) = :mesMasGrande")
   List<PruebaEntity> obtenerPruebasPorMesMasGrande(@Param("mesMasGrande") int mesMasGrande);

   @Query("SELECT COUNT(p) FROM PruebaEntity p WHERE p.rut_estudiante.rut_estudiante = :rut_estudiante")
   int countExamenesRendidosByRutEstudiante(@Param("rut_estudiante") Long rutEstudiante);

}
