package com.digitalbooking.digitalbooking.infrastructure.product.adapter;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface RepositoryProductMySql extends JpaRepository< ProductEntity, Long >, JpaSpecificationExecutor<ProductEntity> {

    List<ProductEntity> findAllByIsDelete(Boolean isDelete);

    Optional<ProductEntity> findByIdAndIsDelete(Long id, Boolean isDelete);

    Optional<ProductEntity> findByNameAndIsDelete(String name, Boolean isDelete);

    interface Specs{
        static Specification<ProductEntity> byDelete(byte delete) {
            return (root, query, builder) ->
                    builder.equal(root.get("isDelete"), delete);
        }
        static Specification<ProductEntity> byBrand(String brand) {
            return (root, query, builder) ->
                    builder.equal(builder.lower(root.get("brand")), brand);
        }
        static Specification<ProductEntity> byGender(String gender) {
            return (root, query, builder) ->
                    builder.equal(builder.lower(root.get("gender")), gender);
        }
        static Specification<ProductEntity> byPriceLessThan(BigDecimal price) {
            return (root, query, builder) ->
                    builder.lessThanOrEqualTo(root.get("price"), price);
        }
        static Specification<ProductEntity> byPriceGreaterThan(BigDecimal price) {
            return (root, query, builder) ->
                    builder.greaterThanOrEqualTo(root.get("price"), price);
        }
        static Specification<ProductEntity> byNameContains(String name) {
            return (root, query, builder) -> builder.like(builder.lower(root.get("name")), "%" + name.toLowerCase() + "%");
        }
        static Specification<ProductEntity> bySize(String size) {
            return (root, query, builder) ->
                    builder.equal(builder.lower(root.get("size")), size);
        }
        static Specification<ProductEntity> byState(String state) {
            return (root, query, builder) ->
                    builder.equal(builder.lower(root.get("state")), state);
        }
        static Specification<ProductEntity> byColor(String color) {
            return (root, query, builder) ->
                    builder.equal(builder.lower(root.get("color")), color);
        }
        static Specification<ProductEntity> byMaterial(String material) {
            return (root, query, builder) ->
                    builder.equal(builder.lower(root.get("material")), material);
        }
        static Specification<ProductEntity> byCityId(Long cityId) {
            return (root, query, builder) ->
                    builder.equal(builder.lower(root.get("city").get("id")), cityId);
        }
        static Specification<ProductEntity> byBrandContains(String brand) {
            return (root, query, builder) -> builder.like(builder.lower(root.get("brand")), "%" + brand.toLowerCase() + "%");
        }
        static Specification<ProductEntity> byGenderContains(String gender) {
            return (root, query, builder) -> builder.like(builder.lower(root.get("gender")), "%" + gender.toLowerCase() + "%");
        }
        static Specification<ProductEntity> bySizeContains(String size) {
            return (root, query, builder) -> builder.like(builder.lower(root.get("size")), "%" + size.toLowerCase() + "%");
        }
        static Specification<ProductEntity> byColorContains(String color) {
            return (root, query, builder) -> builder.like(builder.lower(root.get("color")), "%" + color.toLowerCase() + "%");
        }
        static Specification<ProductEntity> byMaterialContains(String material) {
            return (root, query, builder) -> builder.like(builder.lower(root.get("material")), "%" + material.toLowerCase() + "%");
        }
        static Specification<ProductEntity> byDescriptionContains(String description) {
            return (root, query, builder) -> builder.like(builder.lower(root.get("description")), "%" + description.toLowerCase() + "%");
        }
        static Specification<ProductEntity> byCityContains(String cityName) {
            return (root, query, builder) -> builder.like(builder.lower(root.get("city").get("name")), "%" + cityName.toLowerCase() + "%");
        }

    }

}
