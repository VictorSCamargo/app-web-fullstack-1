package com.example.demo.service;

import com.example.demo.entity.PostEntity;
import com.example.demo.entity.dto.PostDTO;
import com.example.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<PostEntity> findALl() { return postRepository.findAll(); }

    public PostEntity save(PostDTO postDTO) {
        PostEntity postEntity = new PostEntity();
        postEntity.setUsername(postDTO.getUsername());
        postEntity.setTitulo(postDTO.getTitulo());
        postEntity.setTexto(postDTO.getTexto());

        return postRepository.save(postEntity);
    }
}
