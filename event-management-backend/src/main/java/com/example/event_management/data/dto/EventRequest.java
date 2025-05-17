package com.example.event_management.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventRequest {
    private String name;
    private String description;
    private Integer categoryId;  // just the category id here
    private Date date;
    private String venue;
    private float price;

}
