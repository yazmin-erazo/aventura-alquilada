package com.digitalbooking.digitalbooking.application.product.handler;

import com.digitalbooking.digitalbooking.application.product.request.CommandCommentProduct;
import com.digitalbooking.digitalbooking.application.product.request.CommandCreateProduct;
import com.digitalbooking.digitalbooking.application.product.request.CommandUpdateProduct;
import com.digitalbooking.digitalbooking.application.user.request.CommandAddToFavoritesProductsRequest;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.CommentProduct;
import com.digitalbooking.digitalbooking.domain.product.entity.ImageProduct;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.service.ServiceProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductHandler {

    @Autowired
    ServiceProduct serviceProduct;

    public Long createProduct(CommandCreateProduct createProduct) throws Exception {
        return serviceProduct.createProduct(Product.create(createProduct.getName(),
                createProduct.getBrand(),
                createProduct.getState(),
                createProduct.getPrice(),
                createProduct.getDescription(),
                createProduct.getSize(),
                createProduct.getGender(),
                createProduct.getDeposit(),
                createProduct.getIdCategory(),
                createProduct.getImage(),
                createProduct.getFileName(),
                createProduct.getColor(),
                createProduct.getMaterial(),
                createProduct.getSecondaryImages().stream().map(p -> ImageProduct.create(p.getImage(),p.getFileName())).collect(Collectors.toList()),
                createProduct.getCityId()
        ));
    }

    public String updateProduct(Long id, CommandUpdateProduct updateProduct) throws Exception {
        return serviceProduct.updateProduct(Product.update(id, updateProduct.getIdCategory()
        ));
    }

    public List<ProductDTO> getProduct(String brandFilter, String genderFilter, String nameFilter, BigDecimal priceLessThan, BigDecimal priceGreaterThan, String sizeFilter, String stateFilter, String colorFilter, String materialFilter,Long cityId, String search) {
        return serviceProduct.getProducts(brandFilter, genderFilter, nameFilter, priceLessThan, priceGreaterThan, sizeFilter, stateFilter, colorFilter, materialFilter, cityId, search);
    }

    public ProductDTO findById(Long id) {
        return serviceProduct.getProduct(id);
    }

    public String deleteProduct(Long id) {
        return serviceProduct.deleteProduct(Product.createById(id));
    }

    public String addProductToFavorite(CommandAddToFavoritesProductsRequest commandAddToFavoritesProductsRequest, String email) {
        return serviceProduct.addProductToFavorite(Product.createById(commandAddToFavoritesProductsRequest.getProductId()), email);
    }

    public String deleteProductFromFavorite(Long productId, String email) {
        return serviceProduct.deleteProductTFromFavorite(Product.createById(productId), email);
    }

    public String commentProduct(CommandCommentProduct commandCommentProduct, String email) throws Exception {
        return serviceProduct.commentProduct(CommentProduct.create(commandCommentProduct.getProductId(),commandCommentProduct.getComment(),commandCommentProduct.getScore()), email);
    }
}
