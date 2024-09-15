import "./CheckOut.scss";
import { useState } from "react";
import { countiesData } from '../../countiesData';
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiRequests } from "../../utils/requestMethods";
import { resetCart } from "../../redux/cartRedux";
import CircularProgress from '@mui/material/CircularProgress';

const CheckOut = () => {
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [selectedConstituency, setSelectedConstituency] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [direction,setDirection] = useState("")
  const [customerID,setCustomerID] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cart = useSelector((state) => state.cart);
  const businesses = useSelector((state) => state.business.businesses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCountyChange = (e) => {
    const selected = countiesData.find(county => county.code === e.target.value);
    setSelectedCounty(selected);
    setSelectedConstituency(selected ? selected.constituencies[0] : null);
    setSelectedWard(selected ? selected.constituencies[0].Wards[0] : null);
  };

  const handleConstituencyChange = (e) => {
    const selected = selectedCounty.constituencies.find(c => c.constituencyName === e.target.value);
    setSelectedConstituency(selected);
    setSelectedWard(selected ? selected.Wards[0] : null);
  };

  const handleWardChange = (e) => {
    const selected = selectedConstituency.Wards.find(w => w.wardName === e.target.value);
    setSelectedWard(selected);
  };

  const handlePickupLocationChange = (e) => {
    setPickupLocation(e.target.value);
  };

  const handleContactNoChange = (e) => {
    setContactNo(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleCustomerIDChange = (e) => {
    setCustomerID(e.target.value);
  };

  const handleDirectionChange = (e) => {
    setDirection(e.target.value);
  };

  const validateForm = () => {
    if (!selectedCounty) {
      setErrorMessage("County is required");
      setTimeout(() => setErrorMessage(""), 1000);
      return false;
    }
    if (!selectedConstituency) {
      setErrorMessage("Constituency is required");
      setTimeout(() => setErrorMessage(""), 1000);
      return false;
    }
    if (!selectedWard) {
      setErrorMessage("Ward is required");
      setTimeout(() => setErrorMessage(""), 1000);
      return false;
    }
    if (!pickupLocation) {
      setErrorMessage("Pickup location is required");
      setTimeout(() => setErrorMessage(""), 1000);
      return false;
    }
    if (!direction) {
      setErrorMessage("direction is required");
      setTimeout(() => setErrorMessage(""), 1000);
      return false;
    }
    if (!contactNo) {
      setErrorMessage("Contact number is required");
      setTimeout(() => setErrorMessage(""), 1000);
      return false;
    }
    setErrorMessage(""); 
    return true;
  };

  const submitOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const order = {
      //customerId: user._id,
      products: cart.products.map(product => ({
        productId: product._id,
        quantity: product.quantity,
        productsTotal: product.price * product.quantity,
      })),
      amount: cart.total,
      county: selectedCounty.countyName,
      constituency: selectedConstituency.constituencyName,
      ward: selectedWard.wardName,
      pickupLocation,
      contactNo,
      firstName,
      lastName,
      customerID,
      direction
    };

    try {
      const res = await apiRequests.post("orders", order);
      console.log("Order created successfully", res.data);
      setSuccessMessage("Order created successfully");
      setTimeout(() => {
        setSuccessMessage("");
        dispatch(resetCart());
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Error creating order", err);
      setErrorMessage("Error creating order");
      setTimeout(() => setErrorMessage(""), 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkOut">
      <div className="checkOutTop">
        <h3>Here is your order Summary</h3>
      </div>
      <div className="checkOutContainer">
        <div className="checkoutLeft">
          <h4>Order Products</h4>
          <div className="orderProducts">
            {cart.products.map((product) => {
              const business = businesses.find(biz => biz._id === product.business);
              return (
                <div className="orderProduct" key={product._id}>
                  <img src={product.img} alt={product.name} />
                  <h3 className="orderProductName">{product.name}</h3>
                  <h4>Price, Ksh {product.price.toLocaleString()}</h4>
                  <h5>x {product.quantity}</h5>
                  <h3 className="orderproductPrice">Sub Total, Ksh {(product.price * product.quantity).toLocaleString()}</h3>
                  <p>from, {business ? business.businessName : 'Unknown Business'}</p>
                </div>
              );
            })}
          </div>
          <h3>Total, Ksh {cart?.total.toLocaleString()}</h3>
        </div>
        <div className="checkOutRight">
          <h3>Delivery Details</h3>
          <h3>Payments will be made after placing your order</h3>
          <div className="checkOutDeliveryDetails">
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            {successMessage && <p className="successMessage">{successMessage}</p>}
            <div className="checkoutDeliveryData">
              <span>County:</span>
              <select onChange={handleCountyChange} value={selectedCounty ? selectedCounty.code : ""} required>
                <option value="">All</option>
                {countiesData.map(county => (
                  <option key={county.code} value={county.code}>
                    {county.countyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="checkoutDeliveryData">
              <span>Constituency:</span>
              <select onChange={handleConstituencyChange} value={selectedConstituency ? selectedConstituency.constituencyName : ""} required>
                <option value="">All</option>
                {selectedCounty && selectedCounty.constituencies.map(c => (
                  <option key={c.constituencyNo} value={c.constituencyName}>
                    {c.constituencyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="checkoutDeliveryData">
              <span>Ward:</span>
              <select onChange={handleWardChange} value={selectedWard ? selectedWard.wardName : ""} required>
                <option value="">All</option>
                {selectedConstituency && selectedConstituency.Wards.map(w => (
                  <option key={w.wardId} value={w.wardName}>
                    {w.wardName}
                  </option>
                ))}
              </select>
            </div>
            <div className="checkoutDeliveryData">
              <span>First Name</span>
              <input type="text" placeholder="" value={firstName} onChange={handleFirstNameChange} required />
            </div>
            <div className="checkoutDeliveryData">
              <span>Last Name</span>
              <input type="text" placeholder="" value={lastName} onChange={handleLastNameChange} required />
            </div>
            <div className="checkoutDeliveryData">
              <span>ID Number</span>
              <input type="text" placeholder="" value={customerID} onChange={handleCustomerIDChange} required />
            </div>
            <div className="checkoutDeliveryData">
              <span>PickUp Location</span>
              <input type="text" placeholder="Area/Estate/ApartmentName/All" value={pickupLocation} onChange={handlePickupLocationChange} required />
            </div>
            <div className="checkoutDeliveryData">
              <span>Directions</span>
              <input type="text" placeholder="Street/Market/Landmark/All" value={direction} onChange={handleDirectionChange} required />
            </div>
            <div className="checkoutDeliveryData">
              <span>Phone Number</span>
              <input type="text" placeholder="" value={contactNo} onChange={handleContactNoChange} required />
            </div>
            <h3>Delivery fees will be charged based on PickUp location</h3>
          </div>
          <div className="checkOutButtons">
            <button onClick={submitOrder} disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={20} />  : 'Place Order'}
            </button>
            <Link to="/"><button disabled={isSubmitting}>Continue Shopping</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
