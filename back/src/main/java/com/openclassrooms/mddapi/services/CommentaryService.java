package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.CommentaryDto;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.models.Commentary;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.repository.CommentaryRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentaryService {

    private final CommentaryRepository commentaryRepository;
    private final UserRepository userRepository;

    @Autowired
    public CommentaryService(CommentaryRepository commentaryRepository, UserRepository userRepository) {
        this.commentaryRepository = commentaryRepository;
        this.userRepository = userRepository;
    }

    public List<CommentaryDto> findCommentariesByPostId(Long postId) {
        List<Commentary> commentaries = commentaryRepository.findByPostId(postId);
        return commentaries.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public CommentaryDto createCommentary(CommentaryDto commentaryDto, Long userId) {
        Commentary commentary = convertToEntity(commentaryDto);
        LocalDateTime now = LocalDateTime.now();
        commentary.setUserId(userId);
        commentary.setCreatedAt(now);
        Commentary savedCommentary = commentaryRepository.save(commentary);
        return convertToDto(savedCommentary);
    }

    private CommentaryDto convertToDto(Commentary commentary) {
        CommentaryDto commentaryDto = new CommentaryDto();
        User user = userRepository.getReferenceById(commentary.getUserId());
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        commentaryDto.setId(commentary.getId());
        commentaryDto.setContent(commentary.getContent());
        commentaryDto.setPostId(commentary.getPostId());
        commentaryDto.setUser(userDto);
        return commentaryDto;
    }

    private Commentary convertToEntity(CommentaryDto commentaryDto) {
        Commentary commentary = new Commentary();
        commentary.setContent(commentaryDto.getContent());
        commentary.setPostId(commentaryDto.getPostId());
        return commentary;
    }
}
