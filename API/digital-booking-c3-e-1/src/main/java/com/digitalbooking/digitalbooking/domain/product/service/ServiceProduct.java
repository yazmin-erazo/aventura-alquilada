package com.digitalbooking.digitalbooking.domain.product.service;

import com.digitalbooking.digitalbooking.common.exception.ExceptionInvalidValue;
import com.digitalbooking.digitalbooking.common.exception.ExceptionNullValue;
import com.digitalbooking.digitalbooking.domain.category.dto.CategoryDTO;
import com.digitalbooking.digitalbooking.domain.category.repository.CategoryRepository;
import com.digitalbooking.digitalbooking.domain.product.dto.CommentProductDTO;
import com.digitalbooking.digitalbooking.domain.product.dto.ProductDTO;
import com.digitalbooking.digitalbooking.domain.product.entity.CommentProduct;
import com.digitalbooking.digitalbooking.domain.product.entity.Product;
import com.digitalbooking.digitalbooking.domain.product.repository.RepositoryProduct;
import com.digitalbooking.digitalbooking.domain.user.dto.UserDTO;
import com.digitalbooking.digitalbooking.domain.user.repository.RepositoryUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServiceProduct {

    @Autowired
    RepositoryProduct repositoryProduct;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    RepositoryUser repositoryUser;

    public Long createProduct(Product product){
        Optional<CategoryDTO> category = categoryRepository.findById(product.getCategory().getId());
        category.orElseThrow(() -> new ExceptionInvalidValue("category not found"));
        repositoryProduct.findByNameAndIsDelete(product.getName()).ifPresent(productDTO -> {throw new ExceptionInvalidValue("El nombre del producto: "+productDTO.getName()+", ya existe");});
        String mainImageURL = repositoryProduct.saveImage(String.format("%s%s%s",product.getName().trim().replace(" ",""),product.getBrand().replace(" ",""),product.getFileName().trim().replace(" ","")), product.getImage());
        List<String> secondaryImages = product.getImageProducts().stream().map(imageProduct -> repositoryProduct.saveImage(String.format("%s%s%s",product.getName().trim().replace(" ",""),product.getBrand().replace(" ",""),imageProduct.getFileName().trim().replace(" ","")), imageProduct.getImage())).collect(Collectors.toList());
        return repositoryProduct.save(product,mainImageURL,secondaryImages);
    }

    public String updateProduct(Product product) throws Exception {
        Optional<CategoryDTO> category = categoryRepository.findById(product.getCategory().getId());
        category.orElseThrow(() -> new ExceptionInvalidValue("category not found"));
        repositoryProduct.updateProduct(product);
        return "Producto actualizado correctamente";
    }

    public List<ProductDTO> getProducts(String brandFilter, String nameFilter, String genderFilter, BigDecimal priceLessThan, BigDecimal priceGreaterThan, String sizeFilter, String stateFilter, String colorFilter, String materialFilter){
        var products = repositoryProduct.getAll(brandFilter, genderFilter, nameFilter, priceLessThan, priceGreaterThan, sizeFilter, stateFilter, colorFilter, materialFilter);
        return products.stream().map(this::filterRentByYesterday).map(this::calculateScore).collect(Collectors.toList());
    }

    public ProductDTO getProduct(Long id) {
        ProductDTO productDTO = repositoryProduct.findById(id);
        calculateScore(productDTO);
        return filterRentByYesterday(productDTO);
    }

    public String deleteProduct(Product product){
        repositoryProduct.deleteProduct(product.getId());
        return "Producto eliminado correctamente";
    }

    private Date getYesterdayDate(){
        Date currentDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.DATE, -1);
        return calendar.getTime();
    }

    private ProductDTO filterRentByYesterday(ProductDTO productDTO){
        Date yesterday = getYesterdayDate();
        var rents = productDTO.getRents().stream()
                .filter(rent -> rent.getEndDate().after(yesterday))
                .filter(rent -> !rent.getState().equals("CANCELADO"))
                .collect(Collectors.toList());
        productDTO.setRents(rents);
        return productDTO;
    }

    private ProductDTO calculateScore(ProductDTO productDTO){
        productDTO.setScore(productDTO.getCommentProducts().stream().mapToDouble(CommentProductDTO::getScore).average().orElse(5.0));
        return productDTO;
    }

    public String addProductToFavorite(Product product, String email) {
        ProductDTO productDTO = repositoryProduct.findByIdAndIsDelete(product.getId()).orElseThrow(() -> new ExceptionInvalidValue("Producto no encontrado"));
        UserDTO user = repositoryUser.findByEmail(email).orElseThrow(()->new ExceptionNullValue("Usuario no encontrado"));
        boolean contains = user.getFavoriteProducts().stream().anyMatch(id -> id.equals(product.getId()));
        if (contains){
            throw  new ExceptionInvalidValue("El producto ya existe en la lista de favoritos");
        }
        repositoryUser.addProductToFavorite(user.getId(), productDTO.getId());
        return "Producto Agregado Correctamente a favoritos";
    }

    public String deleteProductTFromFavorite(Product product, String email) {
        ProductDTO productDTO = repositoryProduct.findByIdAndIsDelete(product.getId()).orElseThrow(() -> new ExceptionInvalidValue("Producto no encontrado"));
        UserDTO user = repositoryUser.findByEmail(email).orElseThrow(()->new ExceptionNullValue("Usuario no encontrado"));
        repositoryUser.deleteProductFromFavorite(user.getId(), productDTO.getId());
        return "Producto Eliminado Correctamente de favoritos";
    }

    public String commentProduct(CommentProduct commentProduct, String email) {
        repositoryProduct.findByIdAndIsDelete(commentProduct.getProductId()).orElseThrow(() -> new ExceptionInvalidValue("Producto no encontrado"));
        UserDTO user = repositoryUser.findByEmail(email).orElseThrow(()->new ExceptionNullValue("Usuario no encontrado"));
        repositoryProduct.createComment(commentProduct,user.getId());
        return "Comentario guardado exitosamente";
    }
}
