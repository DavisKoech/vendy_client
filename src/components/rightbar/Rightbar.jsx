/* eslint-disable react/prop-types */
import  { useContext, useEffect, useState } from 'react'
import '../rightbar/Rightbar.css';
import { UserContext } from '../../context/UserContext';
import { apiRequests } from '../../utils/requestMethods';
import { Add, Remove } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { ads } from '../../DummyData';

const Rightbar = ({user}) => {
  const [friends,setFriends] = useState([])
  const {user:currentUser,dispatch} = useContext(UserContext)
  const [followed,setFollowed] = useState(currentUser?.followings?.includes(user?.id))

  //useEffect to get current user followed businesses/friends
  useEffect(() => {
    const getFriends = async () => {
        try{
          const friendList = await apiRequests.get("/users/friends/" + user._id)
          setFriends(friendList.data)
        }
        catch(err){
         console.log(err)
        }
    }
    getFriends()
  },[user])

  console.log(friends)

  //function to handle follow or unfollow when the respective button is clicked
  const handleFollow = async () => {
     try{
      if(!followed){
        await apiRequests.put(`/users/${user._id}/follow`,{userId:currentUser._id})
        dispatch({type:"FOLLOW",payload:user._id})

      }else{
        await apiRequests.put(`/users/${user._id}/unfollow`,{userId:currentUser._id})
        dispatch({type:"UNFOLLOW",payload:user._id})
      }
      setFollowed(!followed)

     }catch(err){
      console.log(err)
     }
  }

const HomeRightbar = () => {
    return (
      <>
      <h1 className='ad'>Advertisments</h1>
      <div className="ardsContainer">
               {ads.map((ad) => (
                  <div className="singleAd" key={ad.id}>
                     <span className="ardsText">{ad.brand}</span>
                   <img src={ad.img} alt="" className="ardsImage" />
                  
              </div>
               ))}
      </div>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
     <>
     {/*buttons to facilitate following of a certain business or user */}
     {user.username !== currentUser.username && (
       <button className="rightbarFollowButton" onClick={handleFollow}>
        {followed ? "Unfollow" :"Follow"}
        {followed ? <Remove/> : <Add/>}
       </button>
     )}
     <h4 className="rightbarTitle">User Information</h4>
     <div className="rightbarInfo">
       <div className="rightbarInfoItem">
         <span className="rightbarInfoKey">Town:</span>
         <span className="rightbarInfoValue">{user.town? user.town : "Anywhere"}</span>
       </div>

       <div className="rightbarInfoItem">
         <span className="rightbarInfoKey">Contact:</span>
         <span className="rightbarInfoValue">Coming Soon</span>
       </div>

       <div className="rightbarInfoItem">
         <span className="rightbarInfoKey">Business Type:</span>
         <span className="rightbarInfoValue">{user.category ? user.category : "General User"}</span>
       </div>
     </div>
     <h4 className="rightbarTitle">Business i follow</h4>
     <div className="rightbarFollowings">
        {friends.map((friend) => (
          <Link to={"/profile/" + friend?.username} style={{textDecoration:"none"}} key={friend?._id}>
            <div className="rightbarFollowing" key={friend._id}>
             <img src={friend?.profilePicture ? friend?.profilePicture : "/noavatar.png"} alt="" className="rightbarFollowingImg" />
             <span className="rightbarFollowingName">{friend?.username}</span>
          </div>
          </Link>
        ))}
     </div>
     
     </>
      
    );
  };
 
  return (
    <div className='rightbar'>
        <div className="rightbarWrapper">
         {user ? <ProfileRightbar/> : <HomeRightbar/>}
        </div>
    </div>
  )
}


export default Rightbar