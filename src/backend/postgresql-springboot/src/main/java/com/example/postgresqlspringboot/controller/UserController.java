package com.example.postgresqlspringboot.controller;

import com.example.postgresqlspringboot.entity.User;
import com.example.postgresqlspringboot.entity.dto.UserDTO;
import com.example.postgresqlspringboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> findAll() {
        return new ResponseEntity<>(userService.findALl(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id){
        try {
            User userEntity = userService.findById(id);
            return new ResponseEntity<>(userEntity, HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<User> save(@RequestBody UserDTO dto){
        return new ResponseEntity<>(userService.save(dto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> delete(@PathVariable Long id){
        try {
            userService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@RequestBody UserDTO dto, @PathVariable Long id){
        try {
            User userEntity = userService.findById(id);
            return new ResponseEntity<>(userService.update(userEntity, dto), HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    @GetMapping("/verify-user")
//    @ResponseStatus(HttpStatus.OK)
//    public User verifyUser(){
//        User user = new User();
//        user.setUsername("Teste!");
//        return user;
//    }

//    @PostMapping("/verify-user")
//    @ResponseStatus(HttpStatus.OK)
//    public User verifyUser(@RequestBody UserDTO userDTO){
//        User user = new User();
//        user.setUsername("Teste!");
//        return user;
//    }
}

