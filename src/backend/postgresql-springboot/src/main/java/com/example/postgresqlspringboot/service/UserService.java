package com.example.postgresqlspringboot.service;

import com.example.postgresqlspringboot.entity.UserEntity;
import com.example.postgresqlspringboot.entity.dto.UserDTO;
import com.example.postgresqlspringboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserEntity> findALl() { return userRepository.findAll(); }

    public List<UserEntity> findAllByUsername(String username) {
        return userRepository.findAllByUsername(username);
    }

    public UserEntity findById(Long id) {
        Optional<UserEntity> entity = userRepository.findById(id);
        if (entity.isPresent()){
            return entity.get();
        }
        throw new RuntimeException();
    }

//    public User findByUsername(String username){
//        Optional<User> entity = userRepository.findBy()
//    }

    public UserEntity save(UserDTO dto) {
        UserEntity entity = new UserEntity();
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword());

        return userRepository.save(entity);
    }

    public UserEntity update(UserEntity entity, UserDTO dto) {
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword());

        return userRepository.save(entity);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
