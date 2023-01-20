package com.example.demo.controller;

import com.example.demo.entity.UserEntity;
import com.example.demo.entity.dto.UserDTO;
import com.example.demo.service.UserService;
import com.example.demo.utils.AlertMessages;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.*;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

@WebMvcTest(controllers = UserController.class)
public class UserControllerTest {

    @MockBean
    private UserService userService;

    @Autowired
    private MockMvc mockMvc;

    @Nested
    @DisplayName("findAll method")
    class MethodFindAll {

        @Test
        @DisplayName("should return list with any found objects and status 200")
        void shouldReturnListAndStatus200() throws Exception {

            List<UserEntity> list = new ArrayList<>();
            list.add(new UserEntity(1L, "admin1", "123"));
            list.add(new UserEntity(2L, "admin2", "123"));

            Mockito.when(userService.findAll()).thenReturn(list);

            mockMvc.perform(MockMvcRequestBuilders.get("/api/users"))
                    .andExpect(MockMvcResultMatchers.status().is(200))
                    .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers.jsonPath("$[0].username", Matchers.is("admin1")))
                    .andExpect(MockMvcResultMatchers.jsonPath("$[0].password", Matchers.is("123")))
                    .andExpect(MockMvcResultMatchers.jsonPath("$[1].username", Matchers.is("admin2")))
                    .andExpect(MockMvcResultMatchers.jsonPath("$[1].password", Matchers.is("123")));
        }
    }

    @Nested
    @DisplayName("findById method")
    class MethodFindById {

        @Test
        @DisplayName("should return json if found with status 200")
        void shouldReturnIfFound() throws Exception {

            Mockito.when(userService.findById(1L))
                    .thenReturn(new UserEntity(1L, "Joao", "123"));

            mockMvc.perform(MockMvcRequestBuilders.get("/api/users/1"))
                    .andExpect(MockMvcResultMatchers.status().is(200))
                    .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.id", Matchers.is(1)))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.username", Matchers.is("Joao")))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.password", Matchers.is("123")));
        }

        @Test
        @DisplayName("should return status 404 if not found")
        void shouldReturnStatus404IfNotFound() throws Exception {

            Mockito.when(userService.findById(2L)).thenThrow(RuntimeException.class);

            mockMvc.perform(MockMvcRequestBuilders.get("/api/users/2"))
                    .andExpect(MockMvcResultMatchers.status().is(404));
        }
    }

    @Nested
    @DisplayName("save method")
    class MethodSave {

        private UserDTO existingUser = new UserDTO( "Joao", "123");
        private UserDTO newUser = new UserDTO("Victor", "123");

        @BeforeEach
        void beforeEach() {

            List<UserEntity> emptyList = new ArrayList<>();
            List<UserEntity> existingUserList = new ArrayList<>();

            existingUserList.add(new UserEntity(1L, existingUser.getUsername(), existingUser.getPassword()));

            Mockito.when(userService.findAllByUsername(existingUser.getUsername())).thenReturn(existingUserList);
            Mockito.when(userService.findAllByUsername(newUser.getUsername())).thenReturn(emptyList);

            Mockito.when(userService.save(any()))
                    .thenReturn(new UserEntity(1L, newUser.getUsername(), newUser.getPassword()));
        }

        @Test
        @DisplayName("should save if no user found with same username and return saved user")
        void shouldSaveWithSucess() throws Exception {

            RequestBuilder request = MockMvcRequestBuilders
                    .post("/api/users")
                    .accept(MediaType.APPLICATION_JSON)
                    .content("{\"username\":\""
                            + newUser.getUsername()
                            + "\",\"password\":\""
                            + newUser.getPassword()
                            + "\"}")
                    .contentType(MediaType.APPLICATION_JSON);

            mockMvc.perform(request)
                    .andExpect(MockMvcResultMatchers.status().is(201))
                    .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers
                            .jsonPath("$.username", Matchers.is(newUser.getUsername())))
                    .andExpect(MockMvcResultMatchers
                            .jsonPath("$.password", Matchers.is(newUser.getPassword())));
        }

        @Test
        @DisplayName("should fail if user with same username already exists and return custom message")
        void shouldFailIfUserWithSameUsernameExists() throws Exception {

            RequestBuilder request = MockMvcRequestBuilders
                    .post("/api/users")
                    .accept(MediaType.APPLICATION_JSON)
                    .content("{\"username\":\""
                            + existingUser.getUsername()
                            + "\",\"password\":\""
                            + existingUser.getPassword()
                            + "\"}")
                    .contentType(MediaType.APPLICATION_JSON);

            mockMvc.perform(request)
                    .andExpect(MockMvcResultMatchers.status().is(400))
                    .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.message").exists());
        }
    }

    @Nested
    @DisplayName("verifyUser method")
    class MethodVerifyUser {

        private UserDTO existingUser = new UserDTO( "Joao", "123");
        private UserDTO newUser = new UserDTO("Victor", "123");

        @BeforeEach
        void beforeEach() {

            List<UserEntity> emptyList = new ArrayList<>();
            List<UserEntity> existingUserList = new ArrayList<>();

            existingUserList.add(new UserEntity(1L, existingUser.getUsername(), existingUser.getPassword()));

            Mockito.when(userService.findAllByUsername(existingUser.getUsername())).thenReturn(existingUserList);
            Mockito.when(userService.findAllByUsername(newUser.getUsername())).thenReturn(emptyList);
        }

        @Test
        @DisplayName("should return user if found with same username and password")
        void shouldReturnUserIfFoundWithSameUsernameAndPassword() throws Exception {

            RequestBuilder request = MockMvcRequestBuilders
                    .post("/api/users/verify-user")
                    .accept(MediaType.APPLICATION_JSON)
                    .content("{\"username\":\""
                            + existingUser.getUsername()
                            + "\",\"password\":\""
                            + existingUser.getPassword()
                            + "\"}")
                    .contentType(MediaType.APPLICATION_JSON);

            mockMvc.perform(request)
                    .andExpect(MockMvcResultMatchers.status().is(200))
                    .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers
                            .jsonPath("$.username", Matchers.is(existingUser.getUsername())))
                    .andExpect(MockMvcResultMatchers
                            .jsonPath("$.password", Matchers.is(existingUser.getPassword())));
        }

        @Test
        @DisplayName("should fail and return custom message if username was found but password is wrong")
        void shouldFailIfPasswordIsWrong() throws Exception {

            RequestBuilder request = MockMvcRequestBuilders
                    .post("/api/users/verify-user")
                    .accept(MediaType.APPLICATION_JSON)
                    .content("{\"username\":\""
                            + existingUser.getUsername()
                            + "\",\"password\":\""
                            + "WRONGPASSWORD12321"
                            + "\"}")
                    .contentType(MediaType.APPLICATION_JSON);

            mockMvc.perform(request)
                    .andExpect(MockMvcResultMatchers.status().is(404))
                    .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers
                            .jsonPath("$.message", Matchers.is(AlertMessages.SENHA_INCORRETA)));
        }

        @Test
        @DisplayName("should fail and return custom message if username was not found")
        void shouldFailIfUsernameNotFound() throws Exception {

            RequestBuilder request = MockMvcRequestBuilders
                    .post("/api/users/verify-user")
                    .accept(MediaType.APPLICATION_JSON)
                    .content("{\"username\":\""
                            + newUser.getUsername()
                            + "\",\"password\":\""
                            + newUser.getPassword()
                            + "\"}")
                    .contentType(MediaType.APPLICATION_JSON);

            mockMvc.perform(request)
                    .andExpect(MockMvcResultMatchers.status().is(404))
                    .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers
                            .jsonPath("$.message", Matchers.is(AlertMessages.USER_NAO_ENCONTRADO)));
        }
    }

    @Nested
    @DisplayName("updatePassword method")
    class MethodUpdatePassword {

        private UserDTO existingUser = new UserDTO( "Joao", "123");
        private UserDTO newUser = new UserDTO("Victor", "123");

        private String newPassword = "example";

        @BeforeEach
        void beforeEach() {

            List<UserEntity> emptyList = new ArrayList<>();
            List<UserEntity> existingUserList = new ArrayList<>();

            existingUserList.add(new UserEntity(1L, existingUser.getUsername(), existingUser.getPassword()));

            Mockito.when(userService.findAllByUsername(existingUser.getUsername())).thenReturn(existingUserList);
            Mockito.when(userService.findAllByUsername(newUser.getUsername())).thenReturn(emptyList);

            Mockito.when(userService.update(Mockito.any(), Mockito.any()))
                    .thenReturn(new UserEntity(1L, existingUser.getUsername(), newPassword));
        }

        @Test
        @DisplayName("should return code 404 if can not find user by username")
        void shouldFailIfCannotFindUserByUsername() throws Exception {

            RequestBuilder request = MockMvcRequestBuilders
                    .post("/api/users/update-password")
                    .accept(MediaType.APPLICATION_JSON)
                    .content("{\"username\":\""
                            + newUser.getUsername()
                            + "\",\"password\":\""
                            + newUser.getPassword()
                            + "\"}")
                    .contentType(MediaType.APPLICATION_JSON);

            mockMvc.perform(request)
                    .andExpect(MockMvcResultMatchers.status().is(404))
                    .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers
                            .jsonPath("$.message", Matchers.is(AlertMessages.USER_NAO_ENCONTRADO)));
        }

        @Test
        @DisplayName("should return user with new password if found")
        void shouldReturnUserWithNewPasswordIfSucess() throws Exception {

            RequestBuilder request = MockMvcRequestBuilders
                    .post("/api/users/update-password")
                    .accept(MediaType.APPLICATION_JSON)
                    .content("{\"username\":\""
                            + existingUser.getUsername()
                            + "\",\"password\":\""
                            + newPassword
                            + "\"}")
                    .contentType(MediaType.APPLICATION_JSON);

            mockMvc.perform(request)
                    .andExpect(MockMvcResultMatchers.status().is(200))
                    .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers
                            .jsonPath("$.username", Matchers.is(existingUser.getUsername())))
                    .andExpect(MockMvcResultMatchers
                            .jsonPath("$.password", Matchers.is(newPassword)));
        }
    }
}