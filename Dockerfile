FROM openjdk:11-jre-slim

WORKDIR /app

COPY target/my-api.jar .

EXPOSE 8080

CMD ["java", "-jar", "my-api.jar"]
