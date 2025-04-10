const UserReducer = (state,action) => {

    switch(action.type){
      case "LOGIN_START":
        return{
            user:null,
            isFetching:true,
            error:false
        };
      case "LOGIN_SUCCESS":
        return {
            user:action.payload,
            isFetching:false,
            error:false
        };
      case "LOGIN_FAILURE":
        return {
            user:null,
            isFetching:false,
            error:true
        }
      case "FOLLOW":
        return {
          //shallow coping the existing state using spread operator
            ...state,
            /*creating new user with the copied state and
            create a new followings array by coping the existing one and add 
            a new following the action.payload */
            user:{...state.user,followings:[...state.user.followings,action.payload]}
        }
      case "UNFOLLOW":
        return {
            ...state,
            user:{ ...state.user,followings:state.user.followings.filter((following)=> following !== action.payload)
            }
        } 
        default:
            return state 
    }
}

export default UserReducer