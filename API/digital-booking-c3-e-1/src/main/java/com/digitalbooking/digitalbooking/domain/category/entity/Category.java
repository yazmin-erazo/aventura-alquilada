package com.digitalbooking.digitalbooking.domain.category.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class Category {
    private Long id;
    private String name;
    private String imageURL;

    public static Category create(Long id) throws Exception {
        return new Category(id, "", "");
    }

    public static Category reBuild(Long id, String name, String imageURL)  {
        return new Category(id, name, imageURL);
    }
}
