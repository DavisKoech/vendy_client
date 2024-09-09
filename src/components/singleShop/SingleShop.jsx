/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import "./SingleShop.scss"

// Helper function to capitalize only the first letter of a string
const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const SingleShop = ({store}) => {
    console.log(store)
  return (
    <div className='singleShop'>
        <div className="singleShopTop">
            <img src={store?.coverPhoto || "cover.jpg"} alt=""  className="singleShopCoverImg"/>
            <img src={store?.profilePhoto || "business.png"} alt="" className="singleShopProfileImg"/>
        </div>
        <div className="singleShopCenter">
            <div className="singleShopCenterData">
                <h3>Store Name:</h3>
                <h4>{store?.businessName}</h4>
            </div>
            <div className="singleShopCenterData">
                <h3>Deals With:</h3>
                <h4>{store?.category}</h4>
            </div>
            <div className="singleShopCenterData">
                <h3>County Located:</h3>
                <h4>{capitalizeFirstLetter(store?.county)}</h4>
            </div>
            <div className="singleShopCenterData">
                <h3>Town:</h3>
                <h4>{capitalizeFirstLetter(store?.constituency)}</h4>
            </div>
            <div className="singleShopCenterData">
                <h3>Ward:</h3>
                <h4>{capitalizeFirstLetter(store?.ward)}</h4>
            </div>
            <div className="singleShopCenterData">
                <h3>Business Center:</h3>
                <h4>{capitalizeFirstLetter(store?.businessCenter)}</h4>
            </div>
        </div>
        <div className="singleShopBottom">
            <div className="activity">
                <div className="followers">
                    <img src="/followers.png" alt="" />
                    <span>1090 active customers</span>
                </div>
            </div>
            <Link to={`/store/${store._id}`}><button>View Profile</button></Link>
        </div>
    </div>
  )
}

export default SingleShop
