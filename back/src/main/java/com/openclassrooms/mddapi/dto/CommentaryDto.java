package com.openclassrooms.mddapi.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class CommentaryDto {
    private Long id;

    @NotBlank
    @Size(max = 1000)
    private String content;

    @NotNull
    private Long postId;

    @NotNull
    UserDto user;

}
