import axios from "axios"

//const BASE_URL = "https://vendy-api.onrender.com/api/"
const BASE_URL = "http://localhost:8000/api/"


export const apiRequests = axios.create({
    baseURL:BASE_URL,withCredentials:true
})


//login process
export const loginCall = async (userCredentials,dispatch) => {
    dispatch({type:"LOGIN_START"})

    try{
        const res = await apiRequests.post("auth/login",userCredentials)
        console.log(res.data)
        dispatch({type:"LOGIN_SUCCESS",payload:res.data})
    }catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err})
    }
}


