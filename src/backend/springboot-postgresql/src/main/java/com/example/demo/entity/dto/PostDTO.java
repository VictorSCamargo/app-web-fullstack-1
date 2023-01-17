package com.example.demo.entity.dto;

public class PostDTO {

    private String username;
    private String titulo;
    private String texto;

    public PostDTO() {
    }

    public PostDTO(String username, String titulo, String texto) {
        this.username = username;
        this.titulo = titulo;
        this.texto = texto;
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
