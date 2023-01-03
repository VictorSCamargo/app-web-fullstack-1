
export class FetchMethods {

    static async post(url, object) {
        const requestOptions = {
            method: "POST",
            mode: 'cors',
            cache: "default",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        };
    
        try {
            const response = await fetch(url, requestOptions);
            return response;
        }
        catch(e) {
            console.log("Fetch falhou.", e)
            return null;
        }
    }

    static async get(url) {
        try {    
            const response = await fetch(url);
            return response;
        }
        catch(e) {
            console.log("Fetch falhou.", e)
            return null;
        }
    }

    static async delete(url) {
        const requestOptions = {
            method: "DELETE",
            mode: 'cors',
            cache: "default",
            headers: {
              'Content-Type': 'application/json'
            }
        };
    
        try {
            const response = await fetch(url, requestOptions);
            return response;
        }
        catch(e) {
            console.log("Fetch falhou.", e)
            return null;
        }
    }

    static async put(url, object) {
        const requestOptions = {
            method: "PUT",
            mode: 'cors',
            cache: "default",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        };
    
        try {
            const response = await fetch(url, requestOptions);
            return response;
        }
        catch(e) {
            console.log("Fetch falhou.", e)
            return null;
        }
    }
}
