import "../register/register.css";
import { useRef } from 'react'
import {Link, useNavigate} from "react-router-dom"
import {apiRequests} from "../../utils/requestMethods"

const Register = () => {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("passwords dont match !")
        }else{
            const user = {
                username:username.current.value,
                email:email.current.value,
                password:password.current.value
            }
            try{
                await apiRequests.post("auth/register",user)
                navigate("/login")
            }catch(err){
                console.log(err)
            }
        }
    }

  return (
    <div className="register">
        <div className="registerWrapper">
            <div className="registerLeft">
                <h3 className="registerLogo">Vendy</h3>
                <div className="registerDesc">Connect with businesses and business people in your area </div>
            </div>
            <div className="registerRight">
                <form className="registerBox" onSubmit={handleSubmit}>
                    <input placeholder="Username" className="registerInput" required ref={username}/>
                    <input placeholder="Email" className="registerInput" type="email" required ref={email}/>
                    <input placeholder="Password" className="registerInput" type="password" required ref={password}/>
                    <input placeholder="Repeat Password" className="registerInput" type="password" required ref={passwordAgain}/>
                    <button className="registerButton" type="submit">Sign Up</button>
                    <Link to="/userAuth"><button className="registerRegisterButton">log into your Account</button></Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register