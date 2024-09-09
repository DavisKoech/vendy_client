/* eslint-disable react/prop-types */
import "./Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, increaseQuantity, decreaseQuantity } from "../../redux/cartRedux";
import { Link } from "react-router-dom";

const Cart = ({ cartOpen, setCartOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeProduct(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleCheckout = () => {
    setCartOpen(false);
  };

  return (
    <div className={"cartC " + (cartOpen ? "active" : "")}>
      <div className="cartTop">
        <h1>My Cart</h1>
        <img src="/cancel.png" alt="" onClick={() => setCartOpen(!cartOpen)} />
      </div>
      {cart.products.length > 0 ? (
        <div className="cartProducts">
          {cart.products.map((product) => (
            <div className="cartProduct" key={product._id}>
              <img src={product.img} alt="" />
              <h5>{product.name}</h5>
              <h5>Ksh {product.price.toLocaleString()}</h5>
              <h5>Sub Total {(product.price * product.quantity).toLocaleString()}</h5>
              <div className="quantity">
                <button onClick={() => handleDecreaseQuantity(product._id)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(product._id)}>+</button>
              </div>
              <img src="/delete.png" alt="" onClick={() => handleRemove(product._id)} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <span>No products yet, start shopping</span>
          <img src="/shopping.gif" alt="" />
        </div>
      )}
      <div className="summary">
        <div className="total">
          <h5>Sub Total</h5>
          <h3>ksh {cart.total.toLocaleString()}</h3>
        </div>
        {cart.products.length > 0 ? (
          <Link to="/checkout">
            <button onClick={handleCheckout}>Check Out</button>
          </Link>
        ) : (
          <button disabled>Check Out</button>
        )}
      </div>
    </div>
  );
};

export default Cart;
