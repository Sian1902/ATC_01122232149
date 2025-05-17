package com.example.event_management.service;

import com.example.event_management.data.entities.Category;

import java.util.List;

public interface CategoryService {
    Category createCategory(Category category);
    List<Category> getAllCategories();
    Category getCategoryById(int id);
    Category getCategoryByName(String name);
    void deleteCategory(int id);
}
