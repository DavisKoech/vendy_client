/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from 'react';
import '../topbar/Topbar.scss';
import { Link } from 'react-router-dom';
import { BusinessContext } from '../../businessContext/BusinessContext';
import CreateProduct from '../createProduct/CreateProduct';
import { useSelector } from 'react-redux';

const Topbar = ({ cartOpen, setCartOpen, mobileOpen, setMobileOpen }) => {
  const { business, dispatch } = useContext(BusinessContext);
  const [createPost, setCreatePost] = useState(false);
  const [scrolled, setScrolled] = useState(false);  
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 65) {  
        setScrolled(true);
        if (mobileOpen) {
          setMobileOpen(false); // Close MobileTopBar on scroll
        }
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileOpen,setMobileOpen]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const closeCreate = () => {
    setCreatePost(!createPost);
  };

  const closeCart = () => {
    setCartOpen(!cartOpen);
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
    <div className={`topBar ${scrolled ? 'scrolled' : ''} ${mobileOpen ? 'mobileOpen' : ''}`}>
      <img src="/menu.png" alt="menu" className='bars' onClick={toggleMobileMenu} />
      <div className="left">
        <Link to="/" className='links'><h2 className='logo'>Vendy</h2></Link>
      </div>
      <div className="right">
        <h4 className="creator" onClick={() => setCreatePost(!createPost)}>
          Create Post
        </h4>
        <div className="storesWrapper">
        <Link to="/stores" className="links">
           <img src="/name.jpeg" alt="" />
          </Link>
        <Link to="/stores" className="links">
          <h3 className="storesLink">All Stores</h3>
        </Link>
        </div>
        <div className="loggedInAccount">
          <div className="cart">
            <img src="/cart.jpeg" alt="cart" onClick={closeCart} />
            <div className="cartItems">{cart.quantity}</div>
          </div>
          <div className="notification">
            <img src="/notification.png" alt="" />
            <span>0</span>
          </div>
          {business && <img src="/post.png" alt="" className='mobilePost' onClick={() => setCreatePost(!createPost)}/>}
          <div className="accountOrders">
            <h4>My Orders</h4>
          </div>
          <div className="accountDetails">
            {business ? (
              <>
                <img src={business?.profilePhoto || "/business.png"} alt="user" />
                <Link to={`/store/${business?._id}`} className='links'><h3>{business.businessName}</h3></Link>
                <button onClick={handleLogout} className='logOut'>Log Out</button>
              </>
            ) : (
              <Link to="/accounts" className='links'>
                <h4 className='createAccount'>Create Account</h4>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
    {createPost && <CreateProduct close={closeCreate} />}
    </>
  );
};

export default Topbar;
