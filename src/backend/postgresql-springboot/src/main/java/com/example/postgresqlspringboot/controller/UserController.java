package com.example.postgresqlspringboot.controller;

import com.example.postgresqlspringboot.entity.User;
import com.example.postgresqlspringboot.entity.dto.UserDTO;
import com.example.postgresqlspringboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        List<User> usersWithSameUsername = userService.findAllByUsername(dto.getUsername());

        if(usersWithSameUsername.isEmpty()) {
            return new ResponseEntity<>(userService.save(dto), HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
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

    @PostMapping("/verify-user")
    public ResponseEntity<User> verifyUser(@RequestBody UserDTO dto){
        try {
            List<User> usersWithSameUsername = userService.findAllByUsername(dto.getUsername());

            if(usersWithSameUsername.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            User foundUser = usersWithSameUsername.get(0);

            if(foundUser.getPassword().equals(dto.getPassword())) {
                return new ResponseEntity<>(foundUser, HttpStatus.OK);
            }
        }
        catch (Exception e) {}

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/update-password")
    public ResponseEntity<User> updatePassword(@RequestBody UserDTO dto){
        try {
            List<User> usersWithSameUsername = userService.findAllByUsername(dto.getUsername());

            if(usersWithSameUsername.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            User foundUser = usersWithSameUsername.get(0);

            return new ResponseEntity<>(userService.update(foundUser, dto), HttpStatus.OK);
        }
        catch (Exception e) {}

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}

