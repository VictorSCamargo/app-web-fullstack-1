package com.example.demo.service;

import com.example.demo.entity.UserEntity;
import com.example.demo.entity.dto.UserDTO;
import com.example.demo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Nested
    @DisplayName("findById method")
    class MethodFindByIdTest {

        @Test
        @DisplayName("should return user entity if found")
        void shouldReturnUserEntityIfFound() {
            UserService userService = new UserService(userRepository);
            Long exampleId = 123L;

            UserEntity userEntity = new UserEntity(exampleId, "Admin", "12345");

            Mockito.when(userRepository.findById(exampleId)).thenReturn(Optional.of(userEntity));

            assertThat(userService.findById(exampleId))
                    .usingRecursiveComparison()
                    .ignoringFields("id")
                    .isEqualTo(userEntity);
        }

        @Test
        @DisplayName("should throw RuntimeException if cannot find")
        void shouldThrowRuntimeExpectionIfCannotFind() {
            UserService userService = new UserService(userRepository);

            assertThatThrownBy(() -> {
                userService.findById(5L);
            }).isInstanceOf(RuntimeException.class);
        }
    }

    @Nested
    @DisplayName("save method")
    class MethodSaveTest {

        @Test
        @DisplayName("should save UserDTO and return UserEntity")
        void shouldSaveUserDTOAndReturnUserEntity() {
            UserService userService = new UserService(userRepository);
            UserEntity userEntity = new UserEntity(1L, "admin", "12345");

            Mockito.when(userRepository.save(Mockito.any(UserEntity.class))).thenReturn(userEntity);

            UserEntity returnedUser = userService.save(new UserDTO("admin", "password"));

            assertThat(returnedUser).usingRecursiveComparison().ignoringFields("id").isEqualTo(userEntity);
        }
    }

    @Nested
    @DisplayName("update method")
    class MethodUpdateTest {

        @Test
        @DisplayName("should update UserEntity with UserDTO values")
        void shouldUpdateUserEntityWithUserDTOValues() {
            UserService userService = new UserService(userRepository);

            UserEntity userEntity = new UserEntity(1L, "admin", "12345");
            UserDTO newUserValues = new UserDTO("generic", "321");

            Mockito.when(userRepository.save(Mockito.any(UserEntity.class))).thenReturn(userEntity);

            UserEntity returnedUser = userService.update(userEntity, newUserValues);

            assertThat(returnedUser).usingRecursiveComparison().ignoringFields("id").isEqualTo(newUserValues);
        }
    }
}