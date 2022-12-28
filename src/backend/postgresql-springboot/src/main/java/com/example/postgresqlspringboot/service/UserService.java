package com.example.postgresqlspringboot.service;

import com.example.postgresqlspringboot.entity.User;
import com.example.postgresqlspringboot.entity.dto.UserDTO;
import com.example.postgresqlspringboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findALl() { return userRepository.findAll(); }

    public List<User> findAllByUsername(String username) {
        return userRepository.findAllByUsername(username);
    }

    public User findById(Long id) {
        Optional<User> entity = userRepository.findById(id);
        if (entity.isPresent()){
            return entity.get();
        }
        throw new RuntimeException();
    }

//    public User findByUsername(String username){
//        Optional<User> entity = userRepository.findBy()
//    }

    public User save(UserDTO dto) {
        User entity = new User();
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword());

        return userRepository.save(entity);
    }

    public User update(User entity, UserDTO dto) {
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword());

        return userRepository.save(entity);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
