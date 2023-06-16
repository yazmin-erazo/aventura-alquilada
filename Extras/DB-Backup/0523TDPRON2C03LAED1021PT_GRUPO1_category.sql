CREATE DATABASE  IF NOT EXISTS `0523TDPRON2C03LAED1021PT_GRUPO1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `0523TDPRON2C03LAED1021PT_GRUPO1`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: db.ctd.academy    Database: 0523TDPRON2C03LAED1021PT_GRUPO1
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `imageurl` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `is_delete` bit(1) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Camping','https://c3-e1-digital-booking.s3.us-east-2.amazonaws.com/img/category/camping.png','Sumérgete en la majestuosidad de la naturaleza con nuestro equipo de camping de alquiler de alta calidad.',_binary '\0','TbTent'),(2,'Esquí','https://c3-e1-digital-booking.s3.us-east-2.amazonaws.com/img/category/ski.png','Deslízate por las pistas con nuestros equipos de esquí de alquiler.',_binary '\0','MdDownhillSkiing'),(3,'Snowboard','https://c3-e1-digital-booking.s3.us-east-2.amazonaws.com/img/category/snowboard.png','Domina las montañas con nuestros equipos de snowboard de alquiler.',_binary '\0','MdOutlineSnowboarding'),(4,'Bicicletas','https://c3-e1-digital-booking.s3.us-east-2.amazonaws.com/img/category/bikes.png','Explora la ciudad o los senderos de montaña con nuestras bicicletas de alquiler.',_binary '\0','MdOutlineDirectionsBike'),(5,'Surf','https://c3-e1-digital-booking.s3.us-east-2.amazonaws.com/img/category/surf.png','Conquista las olas con nuestras tablas de surf de alquiler.',_binary '\0','MdSurfing'),(6,'Escalada','https://c3-e1-digital-booking.s3.us-east-2.amazonaws.com/img/category/climb.png','Alcanza nuevas alturas con nuestro equipo de escalada de alquiler.',_binary '\0','FaMountain'),(7,'Deportes acuáticos','https://c3-e1-digital-booking.s3.us-east-2.amazonaws.com/img/category/aquatic.png','Sumérgete en la diversión con nuestro equipo de deportes acuáticos de alquiler.',_binary '\0','FaSwimmer');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-07 23:00:46
