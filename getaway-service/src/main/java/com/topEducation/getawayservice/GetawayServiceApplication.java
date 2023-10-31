package com.topEducation.getawayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class GetawayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GetawayServiceApplication.class, args);
	}

}
