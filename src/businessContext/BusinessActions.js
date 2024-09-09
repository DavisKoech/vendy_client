export const BusinessLoginStart = () => (
    {type:"LOGIN_START"}
)

export const BusinessLoginSuccess = (business) => (
    {type:"LOGIN_SUCCESS",payload:business}
)

export const BusinessLoginFailure = () => (
    {type:"LOGIN_FAILURE"}
)

export const BusinessLogout = () => ({
    type: "LOGOUT",
  });
  
  export const BusinessUpdateStart = () => ({
    type: "UPDATE_START",
  });
  
  export const BusinessUpdateSuccess = (business) => ({
    type: "UPDATE_SUCCESS",
    payload: business,
  });
  
  export const BusinessUpdateFailure = () => ({
    type: "UPDATE_FAILURE",
  });

  export const BusinessResetError = () => ({
    type: "RESET_ERROR",
  });
  