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

export async function userAuth(){
    try {
        const response = await axios.get('/api/userAuth')
        return response.data;
    } catch (error) {
        if(error.response?.status === 401){
            console.error(error.data.message)
        }else{
            console.error(error)
        }
    }
}

export async function logout() {
    try {
        const response = await axios.post('api/auth/logout')
    } catch (error) {
        console.error(error)
    }
}