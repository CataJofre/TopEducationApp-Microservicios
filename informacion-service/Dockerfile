FROM openjdk:21
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} informacion-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/informacion-service-0.0.1-SNAPSHOT.jar"]