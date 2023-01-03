package com.example.postgresqlspringboot.service;

import com.example.postgresqlspringboot.entity.PostEntity;
import com.example.postgresqlspringboot.entity.dto.PostDTO;
import com.example.postgresqlspringboot.repository.PostRepository;
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
