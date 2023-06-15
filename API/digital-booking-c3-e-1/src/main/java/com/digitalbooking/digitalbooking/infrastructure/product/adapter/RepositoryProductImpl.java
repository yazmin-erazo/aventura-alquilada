package com.digitalbooking.digitalbooking.infrastructure.product.adapter;

import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.CommentProduct;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import com.digitalbooking.digitalbooking.infrastructure.category.adapter.CategoryEntity;
import com.digitalbooking.digitalbooking.infrastructure.city.adapter.CityEntity;
import com.digitalbooking.digitalbooking.infrastructure.product.MapToProduct;
import com.digitalbooking.digitalbooking.infrastructure.user.adapter.UserEntity;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.digitalbooking.digitalbooking.infrastructure.product.adapter.RepositoryProductMySql.Specs.*;
import static org.springframework.data.jpa.domain.Specification.where;

@Repository
public class RepositoryProductImpl implements RepositoryProduct {

    @Autowired
    ProductS3 productS3;
    @Autowired
    RepositoryProductMySql repositoryProductMySql;
    @Autowired
    RepositoryCommentProductMySql repositoryCommentProductMySql;

    @Override
    public Long save(Product product, String imageURL, List<String> secondaryImages) {
        ProductEntity productEntity = new ProductEntity();
        BeanUtils.copyProperties(product, productEntity);
        CategoryEntity category = new CategoryEntity();
        category.setId(product.getCategory().getId());
        CityEntity city = new CityEntity();
        city.setId(product.getCityId());
        productEntity.setCity(city);
        productEntity.setCategory(category);
        productEntity.setImageURL(imageURL);
        productEntity.setIsDelete(Boolean.FALSE);
        productEntity.setImageProductEntity(secondaryImages.stream().map(secondaryImage -> ImageProductEntity.builder().imageURL(secondaryImage).productEntity(productEntity).build()).collect(Collectors.toList()));
        return repositoryProductMySql.save(productEntity).getId();
    }

    @Override
    public void updateProduct(Product product) {
        ProductEntity productEntity = repositoryProductMySql.findById(product.getId()).orElseThrow(() -> new ExceptionNullValue("Producto no encontrado"));
        CategoryEntity category = new CategoryEntity();
        category.setId(product.getCategory().getId());
        productEntity.setCategory(category);
        repositoryProductMySql.save(productEntity);
    }

    @Override
    public String saveImage(String fileName, String image) {
        return productS3.saveImage(fileName, image);
    }

    @Override
    public List<ProductDTO> getAll(String brandFilter, String nameFilter, String genderFilter, BigDecimal priceLessThan, BigDecimal priceGreaterThan, String sizeFilter, String stateFilter, String colorFilter, String materialFilter,Long cityId, String search) {
        var query = where(byDelete((byte) 0));
        if (StringUtils.isNotEmpty(search)) {
            query = where(byNameContains(search)
                    .or(byBrandContains(search))
                    .or(byGenderContains(search))
                    .or(bySizeContains(search))
                    .or(byColorContains(search))
                    .or(byMaterialContains(search))
                    .or(byDescriptionContains(search))
                    .or(byCityContains(search)))
                    .and(byDelete((byte) 0));
        }
        if (StringUtils.isNotEmpty(brandFilter)) {
            query = query.and(byBrand(brandFilter));
        }
        if (StringUtils.isNotEmpty(nameFilter)) {
            query = query.and(byNameContains(nameFilter));
        }
        if (StringUtils.isNotEmpty(genderFilter)) {
            query = query.and(byGender(genderFilter));
        }
        if (ObjectUtils.isNotEmpty(priceLessThan)) {
            query = query.and(byPriceLessThan(priceLessThan));
        }
        if (ObjectUtils.isNotEmpty(priceGreaterThan)) {
            query = query.and(byPriceGreaterThan(priceGreaterThan));
        }
        if (StringUtils.isNotEmpty(sizeFilter)) {
            query = query.and(bySize(sizeFilter));
        }
        if (StringUtils.isNotEmpty(stateFilter)) {
            query = query.and(byState(stateFilter));
        }
        if (StringUtils.isNotEmpty(colorFilter)) {
            query = query.and(byColor(colorFilter));
        }
        if (StringUtils.isNotEmpty(materialFilter)) {
            query = query.and(byMaterial(materialFilter));
        }if(ObjectUtils.isNotEmpty(cityId)){
            query = query.and(byCityId(cityId));
        }

        return repositoryProductMySql.findAll(query).stream().map(MapToProduct::mapToProduct).collect(Collectors.toList());
    }

    @Override
    public ProductDTO findById(Long id) {
        return repositoryProductMySql.findByIdAndIsDelete(id, Boolean.FALSE).map(MapToProduct::mapToProduct).orElseThrow(() -> new ExceptionNullValue("Producto no encontrado"));
    }

    @Override
    public Optional<ProductDTO> findByNameAndIsDelete(String name) {
        return repositoryProductMySql.findByNameAndIsDelete(name, false).map(MapToProduct::mapToProduct);
    }

    @Override
    public Optional<ProductDTO> findByIdAndIsDelete(Long id) {
        return repositoryProductMySql.findByIdAndIsDelete(id, Boolean.FALSE).map(MapToProduct::mapToProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        ProductEntity productEntity = repositoryProductMySql.findByIdAndIsDelete(id, Boolean.FALSE).orElseThrow(() -> new ExceptionNullValue("Producto no encontrado"));
        productEntity.setIsDelete(Boolean.TRUE);
        repositoryProductMySql.save(productEntity);
    }

    @Override
    public void createComment(CommentProduct commentProduct, Long userId) {
        CommentsEntity commentsEntity = new CommentsEntity();
        UserEntity userEntity = new UserEntity();
        userEntity.setId(userId);
        ProductEntity productEntity = new ProductEntity();
        productEntity.setId(commentProduct.getProductId());
        commentsEntity.setComment(commentProduct.getComment());
        commentsEntity.setScore(commentProduct.getScore());
        commentsEntity.setUserEntity(userEntity);
        commentsEntity.setProductEntity(productEntity);
        repositoryCommentProductMySql.save(commentsEntity);
    }
}
