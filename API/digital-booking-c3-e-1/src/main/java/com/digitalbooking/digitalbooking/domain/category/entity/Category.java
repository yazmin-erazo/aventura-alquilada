package com.digitalbooking.digitalbooking.domain.category.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Category {
    private Long id;
    private String name;

    public static Category create(Long id) throws Exception {
        return new Category(id, "");
    }

    public static Category reBuild(Long id, String name)  {
        return new Category(id, name);
    }
}
