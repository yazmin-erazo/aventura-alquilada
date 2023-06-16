package com.digitalbooking.digitalbooking.infrastructure.product;

import com.digitalbooking.digitalbooking.domain.product.dto.CommentProductDTO;
import com.digitalbooking.digitalbooking.domain.product.dto.ImageProductDTO;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.infrastructure.city.MapToCity;
import com.digitalbooking.digitalbooking.infrastructure.product.adapter.CommentsEntity;
import com.digitalbooking.digitalbooking.infrastructure.product.adapter.ImageProductEntity;
import com.digitalbooking.digitalbooking.infrastructure.product.adapter.ProductEntity;
import com.digitalbooking.digitalbooking.infrastructure.rent.MapToRent;
import org.springframework.beans.BeanUtils;

import java.util.stream.Collectors;

public class MapToProduct {

    public static ProductDTO mapToProduct(ProductEntity productEntity){
        ProductDTO product = new ProductDTO();
        BeanUtils.copyProperties(productEntity,product);
        product.setCategory(productEntity.getCategory().getName());
        product.setSecondaryImages(productEntity.getImageProductEntity().stream().map(MapToProduct::mapToImageProductDTO).collect(Collectors.toList()));
        product.setRents(productEntity.getRentEntityList().stream().map(MapToRent::mapToRentWithoutProduct).collect(Collectors.toList()));
        product.setCommentProducts(productEntity.getCommentsEntities().stream().map(MapToProduct::mapToCommentProductDTO).collect(Collectors.toList()));
        product.setCity(MapToCity.mapToCity(productEntity.getCity()));
        return product;
    }

    public static ImageProductDTO mapToImageProductDTO(ImageProductEntity imageProductEntity){
        ImageProductDTO imageProductDTO = new ImageProductDTO();
        imageProductDTO.setImageURL(imageProductEntity.getImageURL());
        imageProductDTO.setId(imageProductEntity.getId());
        return imageProductDTO;
    }

    public static ProductDTO mapToProductWithOutRent(ProductEntity productEntity){
        ProductDTO product = new ProductDTO();
        BeanUtils.copyProperties(productEntity,product);
        product.setCategory(productEntity.getCategory().getName());
        product.setSecondaryImages(productEntity.getImageProductEntity().stream().map(MapToProduct::mapToImageProductDTO).collect(Collectors.toList()));
        product.setCity(MapToCity.mapToCity(productEntity.getCity()));
        return product;
    }

    public static CommentProductDTO mapToCommentProductDTO(CommentsEntity commentsEntity){
        CommentProductDTO commentProductDTO = new CommentProductDTO();
        commentProductDTO.setComment(commentsEntity.getComment());
        commentProductDTO.setScore(commentsEntity.getScore());
        commentProductDTO.setUserId(commentsEntity.getUserEntity().getId());
        return commentProductDTO;
    }

}
