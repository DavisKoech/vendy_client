import { useEffect, useState } from 'react'
import '../sidebar/Sidebar.css';
import { apiRequests } from '../../utils/requestMethods';
import {Link} from "react-router-dom"
import {categories} from "../../DummyData"

const Sidebar = () => {
  const [business,setBusiness] = useState([])

  //fetching businesses
  useEffect(() => {
    const fetchBiz = async () => {
      const res = await apiRequests.get("/businesses")
      setBusiness(res.data)
    }
    fetchBiz()
  },[])

  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <h3 className='servicesTitle'>Categories</h3>
          {categories.map((category) => (
             <li className="sidebarListItem" key={category.id}>
             <img src={category.img || "./store.png"} alt="" className='sidebarIcon'/>
             <span className="sidebarListItemText">{category.name}</span>
           </li>
          ))}
        </ul>
        <button className="sidebarButton">Top Businesses</button>
        <hr className='sidebarHr'/>
        
      </div>
    </div>
  )
}

export default Sidebar