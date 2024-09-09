const BusinessReducer = (state,action) => {

    switch(action.type){
      case "LOGIN_START":
        return{
            business:null,
            isFetching:true,
            error:false
        };
      case "LOGIN_SUCCESS":
        return {
            business:action.payload,
            isFetching:false,
            error:false
        };
      case "LOGIN_FAILURE":
        return {
            business:null,
            isFetching:false,
            error:action.payload
        }
        case "UPDATE_START":
          return {
            ...state,
            isFetching:true
          };
        case "UPDATE_SUCCESS":
          return {
            business: action.payload,
            isFetching: false,
            error: false,
          };
        case "UPDATE_FAILURE":
          return {
            business: state.business,
            isFetching: false,
            error: true,
          };
        case "LOGOUT":
          return {
            business: null,
           isFetching: false,
           error: false,
         };
        case "RESET_ERROR":
          return {
            ...state,
            error: null,
        };
        default:
            return state 
    }
}

export default BusinessReducer