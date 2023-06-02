package com.digitalbooking.digitalbooking.infrastructure.product;

import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.infrastructure.product.adapter.ProductEntity;
import org.springframework.beans.BeanUtils;

public class MapToProduct {

    public static ProductDTO mapToProduct(ProductEntity productEntity){
        ProductDTO product = new ProductDTO();
        BeanUtils.copyProperties(productEntity,product);
        product.setCategory(productEntity.getCategory().getName());
<<<<<<< HEAD
        product.setSecondaryImages(productEntity.getImageProductEntity().stream().map(MapToProduct::mapToImageProductDTO).collect(Collectors.toList()));
=======
>>>>>>> c745d2fd0d4da77d38337c252e93018b79633e50
        return product;
    }

}
