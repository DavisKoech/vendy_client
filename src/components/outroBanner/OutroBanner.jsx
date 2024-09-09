import "./OutroBanner.scss"
import {Link} from "react-router-dom"
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"

const OutroBanner = () => {
  useEffect(() => {
    AOS.init({duration:2000})
   },[])



  return (
    <div className='outroBanner'>
        <div className="outroBannerContainer">
            <div className="left">
                <img src="/outro.jpeg" alt="" />
            </div>
            <div className="right">
                <h1 data-aos="fade-left" data-aos-duration="500">Get Everything you want under one roof</h1>
                <h2 data-aos="fade-right" data-aos-duration="1000">Quality is what we promise</h2>
                <h3 data-aos="fade-left" data-aos-duration="1500">A smile is guaranteed.Create an account and start Shopping now.</h3>
                <Link to="/userRegister"><button>Create Account</button></Link>
            </div>
        </div>
    </div>
  )
}

export default OutroBanner