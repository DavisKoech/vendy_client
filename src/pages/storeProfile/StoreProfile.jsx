import "./StoreProfile.scss";
import Footer from "../../components/footer/Footer";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { apiRequests } from "../../utils/requestMethods";
import UpdateBusiness from "../../components/profileUpdate/UpdateBusiness";
import { BusinessContext } from "../../businessContext/BusinessContext";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { addProduct } from "../../redux/cartRedux"; 

const StoreProfile = () => {
  const { business: loggedInBusiness } = useContext(BusinessContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [business, setBusiness] = useState({});
  const [stores, setStores] = useState([]);
  const location = useLocation();
  const businessId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [buttonTexts, setButtonTexts] = useState({});
  const [openLocationDetails, setOpenLocationDetails] = useState(false);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await apiRequests.get(`/businesses/${businessId}`);
        setBusiness(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBusiness();
  }, [businessId]);

  const filteredProducts = products.filter(
    (product) => product.business === businessId
  );

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await apiRequests.get(`/businesses`);
        setStores(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBusinesses();
  }, [businessId]);

  const relatedStores = stores.filter(
    (store) => store.category === business.category && store?._id !== businessId
  );

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const handleAddToCart = (product) => {
    dispatch(addProduct({ ...product, quantity: 1 }));
    setButtonTexts((prev) => ({ ...prev, [product._id]: "Added" }));
    setTimeout(() => {
      setButtonTexts((prev) => ({ ...prev, [product._id]: "Add to Cart" }));
    }, 300);
  };

 
  function formatPhoneNumber(phoneNumber) {
    // Remove any spaces or dashes from the phone number
    phoneNumber = phoneNumber.replace(/\s|-/g, '');
  
    // Check if the phone number starts with '0'
    if (phoneNumber.startsWith('0')) {
      // Replace the leading '0' with the Kenyan country code '+254'
      return `+254${phoneNumber.substring(1)}`;
    }
    // If the phone number already starts with a '+', return it as is
    if (phoneNumber.startsWith('+')) {
      return phoneNumber;
    }
    // Otherwise, return the phone number as is
    return phoneNumber;
  }
  

  return (
    <>
      <div className="storeProfile">
        {loggedInBusiness?._id === businessId && (
          <button
            className="updateBusinessDetails"
            onClick={() => setOpenUpdate(!openUpdate)}
          >
            Update
          </button>
        )}
        <div className="storeProfileTop">
          <img
            src={business?.coverPhoto || "/cover.jpg"}
            alt=""
            className="storeProfileCoverImg"
          />
          <img
            src={business?.profilePhoto || "/business.png"}
            alt=""
            className="storeProfileImg"
          />
        </div>
        <div className="aboutStore">
          <div className="aboutStoreData">
            <img src="/name.jpeg" alt="" className="before"/>
            <h5>{capitalizeFirstLetter(business?.businessName)}</h5>
            <img src="/verified.png" alt="" />
          </div>
          <div className="aboutStoreData">
          <img src="/category.png" alt="" className="before"/>
            <h5>{capitalizeFirstLetter(business?.category)}</h5>
          </div>
        </div>
        <hr />
        <div className="storeData">
        <div className="storeDataleft">
            <button 
              className="locationDetailsButton" 
              onClick={() => setOpenLocationDetails(!openLocationDetails)}
            >
              <img src="/location.png" alt=""  className="location"/>
            </button>
            <div 
              className={`locationDetailsContainer ${openLocationDetails ? "show" : ""}`}
            >
              <h3>Location Details</h3>
              <div className="locationData">
                <h5>County Located:</h5>
                <h5>{capitalizeFirstLetter(business?.county)}</h5>
              </div>
              <div className="locationData">
                <h5>Constituency:</h5>
                <h5>{capitalizeFirstLetter(business?.constituency)}</h5>
              </div>
              <div className="locationData">
                <h5>Ward:</h5>
                <h5>{capitalizeFirstLetter(business?.ward)}</h5>
              </div>
              <div className="locationData">
                <h5>Business Center:</h5>
                <h5>{capitalizeFirstLetter(business?.businessCenter)}</h5>
              </div>
            </div>
          </div>
          <div className="storeDataRight">
            <div className="contactData">
              <h5>
                {business?.website ? (
                  <a href={`https://${business.website}`} target="_blank" rel="noopener noreferrer" className="links" style={{color:"green"}}>
                    <img src="/chrome.png" alt="" />
                  </a>
                ) : (
                  <img src="/chrome.png" alt="" />
                )}
              </h5>
            </div>
            <div className="contactData">
              <h5>
                {business?.phoneNo ? (
                  <a href={`tel:${business.phoneNo}`} className="links" style={{color:"green"}}><img src="/call.jpeg" alt="" /></a>
                ) : (
                  <img src="/call.jpeg" alt="" />
                )}
              </h5>
            </div>
            <div className="contactData">
              <h5>
  {business?.whatsappNo ? (
    <a 
      href={`whatsapp://send?phone=${formatPhoneNumber(business.whatsappNo)}`} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="links" 
      style={{ color: "green" }}
    >
      <img src="/whatsapp.png" alt="" />
    </a>
  ) : (
    <img src="/whatsapp.png" alt="" />
  )}
</h5>

            </div>
            <div className="contactData">
              <h5>
                {business?.xAccount ? (
                  <a href={`https://x.com/${business.xAccount}`} target="_blank" rel="noopener noreferrer" className="links" style={{color:"green"}}>
                    <img src="/twitter.png" alt="" />
                  </a>
                ) : (
                  <img src="/twitter.png" alt="" />
                )}
              </h5>
            </div>
            <div className="contactData">
              <h5>
                {business?.tiktokAccount ? (
                   <a href={`https://tiktok.com/@${business.tiktokAccount}`} target="_blank" rel="noopener noreferrer" className="links" style={{color:"green"}}>
                    <img src="/tiktok.png" alt="" />
                  </a>
                ) : (
                  <img src="/tiktok.png" alt="" />
                )}
              </h5>
            </div>
            <div className="contactData">
              <h5>
                {business?.igAccount ? (
                  <a href={`https://instagram.com/${business.igAccount}`} target="_blank" rel="noopener noreferrer" className="links" style={{color:"green"}}>
                    <img src="/instagram.png" alt="" />
                  </a>
                ) : (
                  <img src="/instagram.png" alt="" />
                )}
              </h5>
            </div>
            <div className="contactData">
              <h5>
                {business?.facebookAccount ? (
                  <a href={`https://facebook.com/${business.facebookAccount}`} target="_blank" rel="noopener noreferrer" className="links" style={{color:"green"}}>
                    <img src="/facebook.png" alt="" />
                  </a>
                ) : (
                  <img src="/facebook.png" alt="" />
                )}
              </h5>
            </div>
            <div className="contactData">
              <h5>
                {business?.facebookAccount ? (
                  <a href={`https://youtube.com/${business.facebookAccount}`} target="_blank" rel="noopener noreferrer" className="links" style={{color:"green"}}>
                    <img src="/youtubeother.png" alt="" />
                  </a>
                ) : (
                  <img src="/youtubeother.png" alt="" />
                )}
              </h5>
            </div>
          </div>
        </div>
        <div className="storeProfileBottom">
          <div className="storeProfileBottomLeft">
            <h3>All products</h3>
            <div className="search">
              <input type="text" placeholder="search product here" />
              <img src="/search.png" alt="" />
            </div>
            <div className="allStoreProducts">
              {filteredProducts.map((product) => (
                <div className="storeProduct" key={product?._id}>
                  <img src={product.img} alt="" />
                  {loggedInBusiness?._id === businessId && (
                    <div className="editProductDetails">
                      <img src="/edit.png" alt="" />
                      <img src="/delet.png" alt="" onClick={() => handleDelete(product._id)} />
                    </div>
                  )}
                  <button
                    className="viewDesc"
                    onMouseEnter={() => setHoveredProductId(product._id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  >
                    View Desc
                  </button>
                  <p
                    className={`description ${
                      hoveredProductId === product._id ? "show" : ""
                    }`}
                  >
                    {product?.desc}
                  </p>
                  <div className="storeProductprice">
                    <div className="price">
                      <span>Ksh {product?.price.toLocaleString()}</span>
                    </div>
                    <button onClick={() => handleAddToCart(product)}>
                      {buttonTexts[product._id] || "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="storeProfileBottomRight">
            <div className="activeCustomers">
              <div className="active">
                <img src="/followers.png" alt="" />
                <span>1096 Followers</span>
              </div>
              <button>Follow</button>
            </div>
            <div className="relatedStores">
              <h3>Related stores</h3>
              <div className="relatedStoresContainer">
                {relatedStores.map((store) => (
                  <Link to={`/store/${store._id}`} className="links" key={store._id}>
                    <div className="relatedStore">
                      <img src={store.profilePhoto || "/business.png"} alt="" />
                      <span>{store.businessName}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openUpdate && <UpdateBusiness business={business} />}
      <Footer />
    </>
  );
};

export default StoreProfile;
