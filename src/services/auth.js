import axios from 'axios';

export async function register(data){
    try {
        const response = await axios.post('/api/register', data)
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

export async function login(data){
    try {
        const response = await axios.post('/api/auth/login', data) 
        return response.data;
    } catch (error) {
        console.error(error)
    }
}   