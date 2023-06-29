package com.digitalbooking.digitalbooking.infrastructure.product.adapter;

import com.digitalbooking.digitalbooking.infrastructure.category.adapter.CategoryEntity;
import com.digitalbooking.digitalbooking.infrastructure.rent.adapter.RentEntity;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface RepositoryProductMySql extends JpaRepository< ProductEntity, Long >, JpaSpecificationExecutor<ProductEntity> {

    List<ProductEntity> findAllByCategoryAndIsDelete(CategoryEntity category , Boolean isDelete);

    Optional<ProductEntity> findByIdAndIsDelete(Long id, Boolean isDelete);

    Optional<ProductEntity> findByNameAndIsDelete(String name, Boolean isDelete);

    interface Specs{
        static Specification<ProductEntity> byId(Long id) {
            return (root, query, builder) ->
                    builder.equal(root.get("id"), id);
        }
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
        static Specification<ProductEntity> byRentsNotBetweenDates(Date startDate, Date endDate) {
            return (root, query, builder) -> {
                Subquery<RentEntity> rentSubquery = query.subquery(RentEntity.class);
                Root<RentEntity> rentRoot = rentSubquery.from(RentEntity.class);
                rentSubquery.select(rentRoot);
                rentSubquery.where(
                        builder.equal(rentRoot.get("productEntity"), root), // join with product
                        builder.or(
                                builder.and(
                                        builder.greaterThanOrEqualTo(rentRoot.get("starDate"), startDate),
                                        builder.lessThanOrEqualTo(rentRoot.get("starDate"), endDate)
                                ),
                                builder.and(
                                        builder.greaterThanOrEqualTo(rentRoot.get("endDate"), startDate),
                                        builder.lessThanOrEqualTo(rentRoot.get("endDate"), endDate)
                                ),
                                builder.and(
                                        builder.lessThanOrEqualTo(rentRoot.get("starDate"), startDate),
                                        builder.greaterThanOrEqualTo(rentRoot.get("endDate"), endDate))

                        )
                );
                return builder.not(builder.exists(rentSubquery));
            };
        }

    }

}
