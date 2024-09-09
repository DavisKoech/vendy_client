import { useEffect, useState } from "react"
import "./TopStores.scss"
import {apiRequests} from "../../utils/requestMethods"
import {Link} from "react-router-dom"
import AOS from "aos"
import "aos/dist/aos.css"

const TopStores = () => {
 const [stores,setStores] = useState([])

 //fetching stores from db
useEffect(() => {
    const fetchStores = async () => {
        try{
            const res = await apiRequests.get("businesses")
            setStores(res.data)

        }catch(err){
            console.log(err)
        }
    }
    fetchStores()
},[])

useEffect(() => {
    AOS.init({duration:2000})
   },[])



  return (
    <div className="topStores">
        <h6>Top Stores as Rated by our Customers</h6>
        <div className="storesWrapper">
            {stores.map((store) => (
                 <Link key={store?._id} className="links" to={`/store/${store._id}`}>
                     <div className="store" key={store?._id}>
                    <img src={store?.profilePhoto || "/bz.png"} alt="" />
                    <p>{store?.businessName}</p>
                    
                 </div>
                 </Link>
            ))}
        </div>
    </div>
  )
}

export default TopStores