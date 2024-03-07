package com.openclassrooms.mddapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.models.Commentary;

@Repository
public interface CommentaryRepository extends JpaRepository<Commentary, Long> {

     @Query("SELECT c FROM Commentary c WHERE c.postId = :postId")
    List<Commentary> findByPostId(Long postId);

}
