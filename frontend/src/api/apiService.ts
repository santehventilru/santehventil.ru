import axios, { AxiosResponse } from 'axios';

abstract class BaseApi {

    abstract post<T>(url: string, body: any): Promise<T>;

    abstract get<T>(url: string): Promise<T>;
    
    abstract put<T>(url: string, body: any): Promise<T>;
}

class api extends BaseApi{

    async post<T>(url: string, body: any): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.post(url, body);
            return response.data; 
        } catch (error) {
            console.error('Server Error', error);
            // throw new Error('API POST request failed');
            throw error;
        }
    }

    async get<T>(url: string): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.get(url);
            return response.data; 
        } catch (error) {
            console.error('Server Error', error);
            // throw new Error('API GET request failed');
            throw error;
        }
    }

    async put<T>(url: string, body: any): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios.put(url, body);
            return response.data; 
        } catch (error) {
            console.error('Server Error', error);
            throw error;
        }
    }
}


const Api  = new api()
export default Api
