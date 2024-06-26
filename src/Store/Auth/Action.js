import axios from "axios"
import { API_BASE_URL, api } from "../../config/api"
import { FIND_USER_BY_ID_FAILURE, FIND_USER_BY_ID_REQUEST, FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_FAILURE, FOLLOW_USER_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_SUCCESS, GOOGLE_LOGIN_FAILURE, GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_SUCCESS } from "./ActionType"

export const loginUser = (loginData)=>async(dispatch)=>{
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signin`,loginData)

        console.log("Logged in User ",data)
       
        if(data.jwt){
            localStorage.setItem("jwt", data.jwt)
        }
        dispatch({type:LOGIN_USER_SUCCESS,payload:data.jwt})
    } catch (error) {

        console.log("error", error)
        dispatch({type:LOGIN_USER_FAILURE, payload:error.message})
        
    }
}

// /signin/google

export const loginWithGoogleAction = (data) => async (dispatch) => {
    dispatch({type:GOOGLE_LOGIN_REQUEST});
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signin/google`, data);
      const user = response.data;
      console.log("login with google user -: ", user);
      if (user.jwt) {
        localStorage.setItem("jwt", user.jwt);
      }
      dispatch({type:GOOGLE_LOGIN_SUCCESS,payload:user.jwt});
    } catch (error) {
      dispatch({type:GOOGLE_LOGIN_FAILURE, payload: error.message || "An error occurred during login."});
    }
  };


export const registerUser = (registerData)=>async(dispatch)=>{
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/signup`, registerData)
        console.log("Signup User ",data)
       
        if(data.jwt){
            localStorage.setItem("jwt", data.jwt)
        }
        dispatch({type:REGISTER_USER_SUCCESS,payload:data.jwt})
    } catch (error) {

        console.log("error", error)
        dispatch({type:REGISTER_USER_REQUEST, payload:error.message})
        
    }
}

export const getUserProfile = (jwt)=>async(dispatch)=>{
    try {
        const {data} = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers:{
                "Authorization" : `Bearer ${jwt}`
            }
        })
       
    
        dispatch({type:GET_USER_PROFILE_SUCCESS,payload:data})
    } catch (error) {

        console.log("error", error)
        dispatch({type:GET_USER_PROFILE_FAILURE, payload:error.message})
        
    }
}


export const findUserById = (userId)=>async(dispatch)=>{
    dispatch({type:FIND_USER_BY_ID_REQUEST})
    try {
        const {data} = await api.get(`/api/users/${userId}`)
        console.log("find user by id", data)
       
    
        dispatch({type:FIND_USER_BY_ID_SUCCESS,payload:data})
    } catch (error) {

        console.log("error", error)
        dispatch({type:FIND_USER_BY_ID_FAILURE, payload:error.message})
        
    }
}

export const searchUser = (query) => async (dispatch) => {
    dispatch({type:SEARCH_USER_REQUEST})
    try {
      const response = await api.get(`/api/users/search?query=${query}`);
      const users = response.data;
      console.log("search result -: ", users);
     
      dispatch({type:SEARCH_USER_SUCCESS,payload:users});
    } catch (error) {
      dispatch(
        {type:SEARCH_USER_FAILURE,error:error.message}
      );
    }
  };

export const updateUserProfile= (reqData)=>async(dispatch)=>{
    try {
        const {data} = await api.put(`/api/users/update`,reqData)
        console.log("updated user ",data)
       
    
        dispatch({type:UPDATE_USER_SUCCESS,payload:data})
    } catch (error) {

        console.log("error", error)
        dispatch({type:UPDATE_USER_FAILURE, payload:error.message})
        
    }
}

// giving uski userid jise the logged in user wants to follow
export const followUserAction= (userId)=>async(dispatch)=>{
    try {
        const {data} = await api.put(`/api/users/${userId}/follow`)
        console.log("followed user ",data)
       
    
        dispatch({type:FOLLOW_USER_SUCCESS,payload:data})
    } catch (error) {

        console.log("error", error)
        dispatch({type:FOLLOW_USER_FAILURE, payload:error.message})
        
    }
}



export const logout = ()=>async(dispatch)=>{

        localStorage.removeItem("jwt")
       
    
        dispatch({type:LOGOUT,payload:null})
    

}


