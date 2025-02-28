import React, { useContext } from "react";
import "./BuyTicket.css";
import { StoreContext } from "../../context/StoreContext";

const BuyTicket = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Ticket Booking Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>
        <input type="email" placeholder="College name" required />
        <input type="text" placeholder="email address" />
        <div className="multi-fields">
          <input type="text" placeholder="Branch" required />
          <input type="text" placeholder="Team Name" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Team Leader Name" />
          <input type="text" placeholder="Team Size" />
        </div>
        <input type="text" placeholder="phone (+91 989-767-0000)" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Processing fee</p>
              <p>Rs.{getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <p>
                Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}
              </p>
            </div>
            <button>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BuyTicket;
