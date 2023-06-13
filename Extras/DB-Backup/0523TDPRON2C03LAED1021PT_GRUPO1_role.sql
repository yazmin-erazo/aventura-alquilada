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
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_create` bit(1) DEFAULT NULL,
  `category_delete` bit(1) DEFAULT NULL,
  `category_list` bit(1) DEFAULT NULL,
  `category_update` bit(1) DEFAULT NULL,
  `is_delete` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `product_create` bit(1) DEFAULT NULL,
  `product_delete` bit(1) DEFAULT NULL,
  `product_list` bit(1) DEFAULT NULL,
  `product_update` bit(1) DEFAULT NULL,
  `rent_create` bit(1) DEFAULT NULL,
  `rent_delete` bit(1) DEFAULT NULL,
  `rent_list` bit(1) DEFAULT NULL,
  `rent_update` bit(1) DEFAULT NULL,
  `role_create` bit(1) DEFAULT NULL,
  `role_delete` bit(1) DEFAULT NULL,
  `role_list` bit(1) DEFAULT NULL,
  `role_update` bit(1) DEFAULT NULL,
  `user_create` bit(1) DEFAULT NULL,
  `user_delete` bit(1) DEFAULT NULL,
  `user_list` bit(1) DEFAULT NULL,
  `user_update` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (19,_binary '',_binary '',_binary '',_binary '',_binary '\0','Admin',_binary '',_binary '',_binary '',_binary '',_binary '',_binary '',_binary '',_binary '',_binary '',_binary '',_binary '',_binary '',_binary '',_binary '',_binary '',_binary ''),(20,_binary '',_binary '',_binary '',_binary '',_binary '\0','Contribuidor',_binary '',_binary '',_binary '',_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0'),(21,_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '\0','Registrado',_binary '\0',_binary '\0',_binary '',_binary '\0',_binary '',_binary '\0',_binary '',_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
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

-- Dump completed on 2023-06-07 23:01:04
