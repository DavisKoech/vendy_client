import { useContext, useRef } from "react";
import "./login.css";
import {Link,useNavigate} from "react-router-dom"
import {UserContext} from "../../context/UserContext.jsx"
import {loginCall} from "../../utils/requestMethods"
import { CircularProgress } from "@material-ui/core";

const Login = () => {
    const email = useRef()
    const password = useRef()
    const {isFetching,dispatch} = useContext(UserContext)
    const navigate = useNavigate()


//sending data to server
 const handleSubmit = (e) => {
    e.preventDefault()
    loginCall(
      {email:email.current.value,password:password.current.value},dispatch
    )
    navigate("/")
 }




  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Vendy</h3>
                <div className="loginDesc">Making it easier to buy and sell,relax we gat everything you need. </div>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <input placeholder="Email" className="loginInput"  type="email" required ref={email}/>
                    <input placeholder="Password" className="loginInput" type="password" required ref={password}/>
                    <button className="loginButton" type="submit" disabled={isFetching}>
                    {isFetching ? (<CircularProgress color="white" size="20px" /> ) : ("Log In")}
                    </button>
                    <span className="loginForgot">Forgot Password?</span>
                    <Link to="/userRegister"><button className="loginRegisterButton">Create a New Account</button></Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login