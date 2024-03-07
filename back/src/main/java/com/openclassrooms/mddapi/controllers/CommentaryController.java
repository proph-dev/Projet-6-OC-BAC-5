package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.dto.CommentaryDto;
import com.openclassrooms.mddapi.services.CommentaryService;
import com.openclassrooms.mddapi.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/commentaries")
public class CommentaryController {

    private final CommentaryService commentaryService;

    private final UserService userService;

    @Autowired
    public CommentaryController(CommentaryService commentaryService, UserService userService) {
        this.commentaryService = commentaryService;
        this.userService = userService;
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentaryDto>> getCommentariesByPostId(@PathVariable Long postId) {
        List<CommentaryDto> commentaries = commentaryService.findCommentariesByPostId(postId);
        return ResponseEntity.ok(commentaries);
    }

    @PostMapping("/create")
    public ResponseEntity<CommentaryDto> createCommentary(@RequestBody CommentaryDto commentaryDto, HttpServletRequest request) {
        Long userId = userService.getUserIdFromAuth(request);
        CommentaryDto createdCommentary = commentaryService.createCommentary(commentaryDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCommentary);
    }
}