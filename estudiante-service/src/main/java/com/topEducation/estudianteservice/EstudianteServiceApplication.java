package com.topEducation.estudianteservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class EstudianteServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EstudianteServiceApplication.class, args);
	}

}
