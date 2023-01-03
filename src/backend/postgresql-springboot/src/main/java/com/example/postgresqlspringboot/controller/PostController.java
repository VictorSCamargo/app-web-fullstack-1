package com.example.postgresqlspringboot.controller;

import com.example.postgresqlspringboot.entity.PostEntity;
import com.example.postgresqlspringboot.entity.dto.PostDTO;
import com.example.postgresqlspringboot.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<List<PostEntity>> findAll() {
        return new ResponseEntity<>(postService.findALl(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PostEntity> save(@RequestBody PostDTO postDTO){
        return new ResponseEntity<>(postService.save(postDTO), HttpStatus.CREATED);
    }
}
