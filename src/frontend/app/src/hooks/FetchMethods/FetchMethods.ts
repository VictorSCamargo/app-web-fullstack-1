import { BackendPath } from "../BackendPaths/BackendPath";

import { UserObjectType } from "../../types/UserObjectType";
import { PostObjectType } from "../../types/PostObjectType";

export class FetchMethods {

    static async post(backendPath: BackendPath, object: UserObjectType | PostObjectType) {
        const requestOptions: RequestInit = {
            method: "POST",
            mode: 'cors',
            cache: "default",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        };
    
        try {
            const response = await fetch(backendPath.getPath(), requestOptions);
            return response;
        }
        catch(e) {
            console.log("Fetch falhou.", e)
            return null;
        }
    }

    static async get(backendPath: BackendPath) {
        try {    
            const response = await fetch(backendPath.getPath());
            return response;
        }
        catch(e) {
            console.log("Fetch falhou.", e)
            return null;
        }
    }

    static async delete(backendPath: BackendPath) {    
        try {
            const response = await fetch(backendPath.getPath());
            return response;
        }
        catch(e) {
            console.log("Fetch falhou.", e)
            return null;
        }
    }

    static async put(backendPath: BackendPath, object: any) {
        const requestOptions: RequestInit = {
            method: "PUT",
            mode: 'cors',
            cache: "default",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        };
    
        try {
            const response = await fetch(backendPath.getPath(), requestOptions);
            return response;
        }
        catch(e) {
            console.log("Fetch falhou.", e)
            return null;
        }
    }
}
