import { FIND_USER_BY_ID_REQUEST, FIND_USER_BY_ID_SUCCESS, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, GET_USER_PROFILE_FAILURE, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT, REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, SEARCH_USER_FAILURE, SEARCH_USER_REQUEST, SEARCH_USER_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from "./ActionType"

const initialState = {
    user:null,
    loading: false,
    error:null,
    jwt:null,
    updateUser:false,
    searchResult:[]

}

export const authReducer = (state = initialState, action)=>{
    switch(action.type){
        case LOGIN_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case GET_USER_PROFILE_REQUEST:
        case FIND_USER_BY_ID_REQUEST:
        case FOLLOW_USER_REQUEST:
            return {...state, loading:true, error:null}

        case SEARCH_USER_REQUEST:
             return {...state,searchResult:[],loading:true,error:null}
        
        case UPDATE_USER_REQUEST:
                return { ...state, loading: true, error: null,updateUser:false };
                
            case LOGIN_USER_SUCCESS:
            case REGISTER_USER_SUCCESS:
                return {...state, loading:false, error:null, jwt:action.payload}

            case GET_USER_PROFILE_SUCCESS:
            return {...state, loading:false, error:null, user:action.payload}

            case FIND_USER_BY_ID_SUCCESS:
                return{...state, loading:false, findUser:action.payload, error:null}

            case SEARCH_USER_SUCCESS:
                return{...state, loading:false, searchResult:action.payload, error:null};

            case UPDATE_USER_SUCCESS:
            return {...state, loading:false, error:null, user:action.payload, updateUser:true}

            case FOLLOW_USER_SUCCESS:
            return {...state, loading:false, error:null, findUser:action.payload}

            // case UPDATE_USER_SUCCESS:
            // return {...state, loading:false, error:null, user:action.payload, updateUser:true}




            
            case LOGOUT:
            return initialState;

            case LOGIN_USER_FAILURE:
            case REGISTER_USER_FAILURE:
            case GET_USER_PROFILE_FAILURE:
            case SEARCH_USER_FAILURE:
                return {...state, loading:false, error:action.payload}

            default:
                return state;
    }
}