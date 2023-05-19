package com.digitalbooking.digitalbooking.infrastructure.product.adapter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.nio.ByteBuffer;
import java.util.Base64;

import static software.amazon.awssdk.core.sync.RequestBody.fromByteBuffer;

@Component
public class ProductS3 {
    private S3Client s3Client = S3Client.builder()
            .region(Region.US_EAST_2)
            .credentialsProvider(DefaultCredentialsProvider.builder().profileName("default").build())
            .build();
    @Value("${aws.s3.bucketname}")
    private String bucketName;
    @Value("${aws.s3.imagepath}")
    private String folderName;


    public String saveImage(String fileName, String image){
        try{
            byte[] imageBytes = Base64.getDecoder().decode(image);
            String fileKey = String.format("%s/%s", folderName, fileName);

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileKey)
                    .acl(ObjectCannedACL.PUBLIC_READ)
                    .build();

            s3Client.putObject(putObjectRequest,
                    fromByteBuffer(ByteBuffer.wrap(imageBytes)));

            String imageUrl = String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, Region.US_EAST_2, fileKey);

            return imageUrl;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al subir la imagen";
        }
    }
}
