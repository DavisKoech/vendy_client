/* eslint-disable react/prop-types */

import { useContext } from 'react';
import { BusinessContext } from '../../businessContext/BusinessContext';
import './MobileTopBar.scss';
import {Link} from "react-router-dom"

const MobileTopBar = ({ mobileOpen, setMobileOpen }) => {
  const {dispatch } = useContext(BusinessContext);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    setMobileOpen(false);
  };



  return (
    <div className={`mobileTopBar ${mobileOpen ? 'open' : ''}`}>
      <div className="mobileTopBarWrapper">
        <img src="/cancel.png" alt="close" onClick={() => setMobileOpen(false)} />
        <div className="topBarItems">
          <div className="topBarItem">
            <h3 onClick={() => setMobileOpen(false)}>MY ORDERS</h3>
             <Link className='links' to="/stores"><h3 onClick={() => setMobileOpen(false)}>ALL STORES</h3></Link>
            <h3 onClick={() => setMobileOpen(false)}>RENT A SHELF</h3>
            <h3 onClick={() => setMobileOpen(false)}>LIPIA POLEPOLE</h3>
            <h3 onClick={() => setMobileOpen(false)}>ABOUT US</h3>
            <h3 onClick={() => setMobileOpen(false)}>CONTACT INFO</h3>
            <h3 onClick={() => setMobileOpen(false)}>TERMS AND CONDITIONS</h3>
            <h3 onClick={handleLogout}>LOG OUT</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTopBar;
