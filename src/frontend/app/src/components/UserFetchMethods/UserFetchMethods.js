import React from "react";

const URL_USERS_BACKEND = "http://localhost:3333/users"

export class UserFetchMethods  {
    constructor() {
        this.url_backend = URL_USERS_BACKEND
    }

    async validateLogin(data) {
        const requestOptions = {
            method: "POST",
            mode: 'cors',
            cache: "default",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(`${this.url_backend}/login`, requestOptions);
            return response;
        }
        catch(e) {
            console.log("Fetch falhou.", e)
            return null;
        }
    }

    async post(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(data)
        };
    
        try {
            const response = await fetch(this.url_backend, requestOptions);
            return response;
        }
        catch(e) {
            console.log("Fetch falhou.", e)
            return null;
        }
    }

    async get() {
        try {    
            const response = await fetch(this.url_backend);
            return response;
        }
        catch(e) {
            console.log("Fetch falhou.", e)
            return null;
        }
    }
}
