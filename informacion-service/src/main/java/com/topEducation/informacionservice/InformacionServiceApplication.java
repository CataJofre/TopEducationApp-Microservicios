package com.topEducation.informacionservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class InformacionServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InformacionServiceApplication.class, args);
	}

}
