package com.example.postgresqlspringboot.controller;

import com.example.postgresqlspringboot.entity.UserEntity;
import com.example.postgresqlspringboot.entity.dto.UserDTO;
import com.example.postgresqlspringboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserEntity>> findAll() {
        return new ResponseEntity<>(userService.findALl(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> findById(@PathVariable Long id){
        try {
            UserEntity userEntity = userService.findById(id);
            return new ResponseEntity<>(userEntity, HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<UserEntity> save(@RequestBody UserDTO userDTO){
        List<UserEntity> usersWithSameUsername = userService.findAllByUsername(userDTO.getUsername());

        if(usersWithSameUsername.isEmpty()) {
            return new ResponseEntity<>(userService.save(userDTO), HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserEntity> delete(@PathVariable Long id){
        try {
            userService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserEntity> updateUser(@RequestBody UserDTO userDTO, @PathVariable Long id){
        try {
            UserEntity userEntity = userService.findById(id);
            return new ResponseEntity<>(userService.update(userEntity, userDTO), HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/verify-user")
    public ResponseEntity<UserEntity> verifyUser(@RequestBody UserDTO userDTO){
        try {
            List<UserEntity> usersWithSameUsername = userService.findAllByUsername(userDTO.getUsername());

            if(usersWithSameUsername.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            UserEntity foundUserEntity = usersWithSameUsername.get(0);

            if(foundUserEntity.getPassword().equals(userDTO.getPassword())) {
                return new ResponseEntity<>(foundUserEntity, HttpStatus.OK);
            }
        }
        catch (Exception e) {}

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/update-password")
    public ResponseEntity<UserEntity> updatePassword(@RequestBody UserDTO userDTO){
        try {
            List<UserEntity> usersWithSameUsername = userService.findAllByUsername(userDTO.getUsername());

            if(usersWithSameUsername.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            UserEntity foundUserEntity = usersWithSameUsername.get(0);

            return new ResponseEntity<>(userService.update(foundUserEntity, userDTO), HttpStatus.OK);
        }
        catch (Exception e) {}

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}

