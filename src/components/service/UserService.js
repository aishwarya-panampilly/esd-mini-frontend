import axios from "axios";

class UserService{
    static BASE_URL = "http://localhost:8080"
    static async login(email,password){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`,{email,password})
            return response.data;
        } catch(err){
            throw err;
        }
    }

    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/auth/get-all-users`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserById(employeeId, token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/auth/get-users/${employeeId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async updateUser(employeeId, userData, token){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/auth/update/${employeeId}`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            console.error('Error:', err.response ? err.response.data : err.message);
            throw err;
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        window.dispatchEvent(new Event('storage'));
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }
}

export default UserService;