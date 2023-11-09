package com.topEducation.estudianteservice.repository;

import com.topEducation.estudianteservice.entity.EstudianteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EstudianteRepository extends JpaRepository<EstudianteEntity, Long> {
   public Optional<EstudianteEntity> findById(Long rut);
}
