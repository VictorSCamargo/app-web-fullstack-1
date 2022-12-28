package com.example.postgresqlspringboot.controller;

import com.example.postgresqlspringboot.entity.User;
import com.example.postgresqlspringboot.entity.dto.UserDTO;
import com.example.postgresqlspringboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> findAll() {
        return userService.findALl();
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable Long id){
        return userService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User save(@RequestBody UserDTO dto){
        return userService.save(dto);
    }

    @PutMapping("/{id}")
    public User updateBook(@RequestBody UserDTO dto, @PathVariable Long id){
        User userEntity = userService.findById(id);
        return userService.update(userEntity, dto);

    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        userService.delete(id);
    }
}
