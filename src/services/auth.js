import axios from 'axios';

export async function register(data){
    try {
        const response = await axios.post('/api/users', data)
        return response.data;
    } catch (error) {
        console.error(error)
    }
}