package com.topEducation.informacionservice.repository;

import com.topEducation.informacionservice.entity.InfoEntity;
import com.topEducation.informacionservice.entity.PruebaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoRepository extends JpaRepository<InfoEntity, Long> {
}
