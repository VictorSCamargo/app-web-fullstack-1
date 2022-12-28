package com.example.postgresqlspringboot.entity;

import jakarta.persistence.*;

//TODO limitar tamanho dos textos de envio no front ou back? ver.

@Entity
@Table(name = "posts")
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String titulo;
    private String texto;

    public PostEntity() {
    }

    public PostEntity(Long id, String username, String titulo, String texto) {
        this.id = id;
        this.username = username;
        this.titulo = titulo;
        this.texto = texto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }
}
