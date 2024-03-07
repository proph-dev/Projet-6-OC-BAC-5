package com.openclassrooms.mddapi.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class ThemeDto {
    private Long id;

    @NotBlank
    @Size(max = 250)
    private String title;

    @NotBlank
    @Size(max = 2000)
    private String description;

}
