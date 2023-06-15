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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `generating_date` datetime(6) DEFAULT NULL,
  `role_entity_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcgvlbw3uxs532jje6xsul0v8o` (`role_entity_id`),
  CONSTRAINT `FKcgvlbw3uxs532jje6xsul0v8o` FOREIGN KEY (`role_entity_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (23,'jul.cruizz@gmail.com','Caicedo','Julian','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '','683a05d8-b5ba-411a-b033-022e2a8b1b07',NULL,21),(24,'micaela.chattah@digitalhouse.com','Chattat','Mica','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','f42f1fab-9d16-4fc1-b570-91404b729e66',NULL,21),(29,'sgsgonzalez@gmail.com','Gonzalez','Sergio','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','7490bda1-b47d-45e6-81c9-39efd9d1f626',NULL,21),(30,'TestRunner@gmail.com','TestRunner UserLastName','TestRunner UserName','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','c7db603e-b8cb-4800-b2a8-8d2c1330ab96',NULL,21),(31,'TestRunner2@gmail.com','TestRunner UserLastName2','TestRunner UserName2','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','2f8eddf3-ab1c-433a-9347-8a4570a061e6',NULL,21),(32,'ana@hotmail.com','Campos','Analia','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','9fc5c2e8-6ca1-47e1-8676-0e91561370a3',NULL,21),(33,'sol@hotmail.com','Vera','Soledad','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','36df3200-bc80-4451-9f2b-35626fad0051',NULL,21),(34,'car@hotmail.com','Peralta','Carlos','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','dda052bf-e6a6-495a-afba-b961232b37c7',NULL,21),(35,'diego@gmail.com','Ramos','Diego','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','c584900e-7364-41ae-a7c4-2ce4736058a4',NULL,21),(36,'diegoF@gmail.com','Freytes','Diego','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','f81b05b7-ff76-4c26-90d5-d6a7cfe832e1',NULL,21),(37,'lorraine@gmail.com','Sánchez','Héctor','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','1e0b52ba-9517-4c4e-9fe6-2fc259bf58ff',NULL,21),(38,'lorraine123@gmail.com','Sánchez','Ana','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','d6980be3-fc4b-4a83-8d26-e9f477c526c8',NULL,21),(39,'mi@gmail.com','Montes','Miguel','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','691c977b-428a-4b55-8fb9-d09415823d7f',NULL,21),(40,'lorraine1@gmail.com','Sánchez','Ana María','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','5058d63c-be5e-4443-9961-302f36dc1821',NULL,21),(43,'luismi@gmail.com','Miguel','Luis','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','dd5664a2-9658-454c-8308-ba3c252166e6',NULL,21),(44,'andre@gmail.com','Abantos','Andrea','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','00152343-407e-4f44-bd6d-98019d884fa6',NULL,19),(45,'mar@gmail.com','Vila','Maria','$2a$10$QKFHELrAUSzJwigOl6871ecx7vbaC.EORn6qOLrg5vLxdVbHRMeCm',_binary '\0','52847f20-bedc-41b9-ad6c-3007be5e045f',NULL,19),(49,'ser@mail.com','Gimenez','Sergio','123bB',_binary '\0','f4ce3ae0-f6f7-4dd9-bde2-cb0579bf4a94',NULL,19),(52,'mafe-21@hotmail.com','Garcia Pineda','Maria','$2a$10$eVZvZbd4B0BB3mkqxkWyWOOKdadMvFFPFnbwThQILMgKtJTo73k7.',_binary '','5308dc24-d17b-45b9-9932-ce2d51236e7d','2023-05-30 21:46:46.877341',19),(53,'belenguilla@hotmail.com','Guillamondegui','Belén','$2a$10$UgoLi9vuXeowWh2YOPxY5utKdUjkCJwFT9gbO1R.FqZIdyB/Ob6v6',_binary '','9ceddd21-6d8b-447d-8ff6-cf9952b824ca','2023-05-31 11:49:03.017944',19),(58,'lorraines3@gmail.com','House','Digital','$2a$10$ELrSoosjyyIke3QQ7aFsNuVnYF26RTuGwHo7qnlBOLOu0GwxbRkPG',_binary '\0','30a2d4e6-a83a-4791-8aa3-b872990c0053','2023-05-31 23:26:53.494451',21),(63,'lore@gmail.com','Sánchez','Lorena','$2a$10$GmQV2PWUs0gSHFPUZBJmVuUT1bCvi1FJ6HNugTn3z7Om3MO1DYBN6',_binary '\0','73d42c6b-96f2-4012-a05a-4d6329f65ae2','2023-06-01 13:51:40.474751',19),(67,'digitalhouse.dh123@gmail.com','House','Digital','$2a$10$d8V6IDTu4FPCzQO4hqqdseg.kn5B/rqeGlUDN9tSJ3LY434baLT3C',_binary '','d1fb2bc5-3106-4d68-a0d0-77bfbe7988d0','2023-06-01 17:30:43.014878',19),(69,'test1@yopmail.com','testuser','testuser','$2a$10$CduyQ2u7sI1Le1v3ADU7p.MRQuRo6wIkllv8WRQw5xfwtcLdpQXB2',_binary '','09ee1a3a-9a91-4ece-a2c2-fd618c02ad76','2023-06-01 21:46:35.297203',21),(72,'test2@yopmail.com','User','Test','$2a$10$Q4t94faQIvcUXLbPJm3UBuevm2E0fclfkPnjZGt2LESdMwsOIFcpi',_binary '','084a69ce-78a8-4510-8232-73addab0e63a','2023-06-02 23:55:40.508458',21),(74,'nataliajmoreira@gmail.com','Moreira','Natalia','$2a$10$ezg0BXlq/tjajYcbELdnB.vHUQrils6cyA/HMa2rKcYMRBP9Q/d3K',_binary '','3a818676-caae-44bd-a9b4-c41cedcc56da','2023-06-03 01:46:40.813678',19),(75,'andresjbilbao@hotmail.com','Bilbao','Andrés','$2a$10$E7MHms43Ro2KLoHPlBTjTe15lzqAA/FDqWjf15ImnCnhe8AH2oFEe',_binary '','0182a730-f68c-4642-8659-5eeeb99cd89f','2023-06-05 18:20:57.877599',21),(76,'lorraines690.ls@gmail.com','Sanchez','Lorena','$2a$10$0rPgExyhMHF92/x/qFYcIuwExUVs6AkXOC7bciIwWhEaZMeA5uB.2',_binary '','bd75f07b-fe7f-45f0-b7cc-aa252a99bcca','2023-06-06 11:09:32.766776',21);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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

-- Dump completed on 2023-06-07 23:00:55
