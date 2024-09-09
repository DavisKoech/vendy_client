import "./BusinessLogin.scss";
import { useNavigate } from "react-router-dom";
import { BusinessContext } from "../../businessContext/BusinessContext";
import { useContext, useEffect, useState } from "react";
import { apiRequests } from "../../utils/requestMethods";
import CircularProgress from '@mui/material/CircularProgress';

const BusinessLogin = () => {
  const { isFetching, error, dispatch } = useContext(BusinessContext);
  const [credentials, setCredentials] = useState({ username: undefined, password: undefined });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Handling the changes in input as typed by user
  const handleChange = (e) => {
    e.preventDefault();
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Setting timeout for success to disappear after 3 seconds
  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [success]);

  // Setting timeout for error to disappear after 2 seconds
  useEffect(() => {
    let errorTimeout;
    if (error) {
      errorTimeout = setTimeout(() => {
        dispatch({ type: "RESET_ERROR" });
      }, 2000);
    }
    return () => clearTimeout(errorTimeout);
  }, [error, dispatch]);

  // Handling the login process
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await apiRequests.post("businesses/login", credentials);
      console.log(res.data.details);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      setSuccess(true);

      // Introduce a delay of 1 second (1000 milliseconds) before navigating
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="businessLogin">
      <div className="wrapper">
        <form>
          <div className="left">
            <img src="https://pbs.twimg.com/media/FUtzRecWUAA7S5F?format=jpg&name=large" alt="" />
          </div>
          <div className="right">
            <span>Access your store</span>
            <div className="data">
              <input
                type="text"
                placeholder="Business Name"
                required
                id="businessName"
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                id="password"
                required
                onChange={handleChange}
              />
              <button
                disabled={isFetching}
                onClick={handleClick}
              >
                {isFetching ? <CircularProgress size={20} /> : "Login"}
              </button>
            </div>
          </div>
        </form>
        {success && (
          <div className="success">
            <h6>Login Successful</h6>
            <img src="success.png" alt="" />
          </div>
        )}
        {error && (
          <div className="error">
            <h6>{error.message}</h6>
            <img src="wrong.png" alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessLogin;
