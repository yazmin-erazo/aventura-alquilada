FROM openjdk:11-jre-slim

WORKDIR /app

COPY target/equipamiento-deportivo.jar .

EXPOSE 8080

CMD ["java", "-jar", "my-api.jar"]
