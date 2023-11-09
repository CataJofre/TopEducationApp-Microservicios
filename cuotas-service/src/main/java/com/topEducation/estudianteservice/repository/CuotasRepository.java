package com.topEducation.estudianteservice.repository;

import com.topEducation.estudianteservice.entity.CuotasEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CuotasRepository extends JpaRepository<CuotasEntity, Long> {
   public Optional<CuotasEntity> findById(Long rut);
}
