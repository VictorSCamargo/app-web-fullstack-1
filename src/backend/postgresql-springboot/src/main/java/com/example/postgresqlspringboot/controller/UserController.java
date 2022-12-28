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
    public ResponseEntity<UserEntity> save(@RequestBody UserDTO dto){
        List<UserEntity> usersWithSameUsername = userService.findAllByUsername(dto.getUsername());

        if(usersWithSameUsername.isEmpty()) {
            return new ResponseEntity<>(userService.save(dto), HttpStatus.CREATED);
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
    public ResponseEntity<UserEntity> updateUser(@RequestBody UserDTO dto, @PathVariable Long id){
        try {
            UserEntity userEntity = userService.findById(id);
            return new ResponseEntity<>(userService.update(userEntity, dto), HttpStatus.OK);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/verify-user")
    public ResponseEntity<UserEntity> verifyUser(@RequestBody UserDTO dto){
        try {
            List<UserEntity> usersWithSameUsername = userService.findAllByUsername(dto.getUsername());

            if(usersWithSameUsername.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            UserEntity foundUserEntity = usersWithSameUsername.get(0);

            if(foundUserEntity.getPassword().equals(dto.getPassword())) {
                return new ResponseEntity<>(foundUserEntity, HttpStatus.OK);
            }
        }
        catch (Exception e) {}

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/update-password")
    public ResponseEntity<UserEntity> updatePassword(@RequestBody UserDTO dto){
        try {
            List<UserEntity> usersWithSameUsername = userService.findAllByUsername(dto.getUsername());

            if(usersWithSameUsername.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            UserEntity foundUserEntity = usersWithSameUsername.get(0);

            return new ResponseEntity<>(userService.update(foundUserEntity, dto), HttpStatus.OK);
        }
        catch (Exception e) {}

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}

