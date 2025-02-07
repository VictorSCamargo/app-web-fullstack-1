package com.example.demo.controller;

import com.example.demo.entity.ErrorMessage;
import com.example.demo.entity.UserEntity;
import com.example.demo.entity.dto.UserDTO;
import com.example.demo.service.UserService;
import com.example.demo.utils.AlertMessages;
import javafx.scene.control.Alert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService service) {
        this.userService = service;
    }

    @GetMapping
    public ResponseEntity<List<UserEntity>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> findById(@PathVariable Long id){
        try {
            UserEntity userEntity = userService.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(userEntity);
        }
        catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody UserDTO userDTO){
        List<UserEntity> usersWithSameUsername = userService.findAllByUsername(userDTO.getUsername());

        if(usersWithSameUsername.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(userDTO));
        }
        else {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorMessage(AlertMessages.USERNAME_EM_USO));
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
    public ResponseEntity<?> verifyUser(@RequestBody UserDTO userDTO){

        List<UserEntity> usersWithSameUsername = userService.findAllByUsername(userDTO.getUsername());

        if(usersWithSameUsername.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ErrorMessage(AlertMessages.USER_NAO_ENCONTRADO));
        }

        UserEntity foundUserEntity = usersWithSameUsername.get(0);

        if(!foundUserEntity.getPassword().equals(userDTO.getPassword())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorMessage(AlertMessages.SENHA_INCORRETA));
        }

        return ResponseEntity.status(HttpStatus.OK).body(foundUserEntity);
    }

    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody UserDTO userDTO){

        List<UserEntity> usersWithSameUsername = userService.findAllByUsername(userDTO.getUsername());

        if(usersWithSameUsername.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ErrorMessage(AlertMessages.USER_NAO_ENCONTRADO));
        }

        UserEntity foundUserEntity = usersWithSameUsername.get(0);

        return ResponseEntity.status(HttpStatus.OK).body(userService.update(foundUserEntity, userDTO));
    }
}
