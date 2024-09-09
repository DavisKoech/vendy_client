import React from 'react'
import '../online/Online.css';

const Online = ({user}) => {
  return (
    <li className="rightBarFriend">
              <div className="rightbarProfileImgContaniner">
              <img src={user.profilepicture} alt="" className="rightbarProfileImg" />
              <span className="rightbarOnline"></span>
              <span className="rightbarUsername">{user.username}</span>
              </div>
            </li>
  )
}

export default Online