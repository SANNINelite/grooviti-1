import React, { useContext, useState } from "react";
import "./BuyTicket.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const BuyTicket = () => {
  const { getTotalCartAmount, token, myevents_list, url, cartItems } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    college_name: "",
    Branch: "",
    Team_name: "",
    Team_leader_name: "",
    Team_size: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const buyTicket = async (event) => {
    event.preventDefault();

    let eventitems = [];
    myevents_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        eventitems.push(itemInfo);
      }
    });

    let eventData = {
      address: data,
      items: eventitems,
      amount: getTotalCartAmount() + 20,
    };

    try {
      let response = await axios.post(`${url}/api/booking/ticket`, eventData, {
        headers: { token },
      });

      console.log("API Response:", response.data);

      if (response.data.success && response.data.order_id) {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          alert("Failed to load Razorpay. Check your internet connection.");
          return;
        }
        const options = {
          key: "rzp_live_K7OkJunWoTKDuV",
          amount: eventData.amount * 1,
          currency: "INR",
          name: "Event Booking",
          description: "Ticket Purchase",
          order_id: response.data.order_id,
          handler: function (response) {
            alert(
              "Payment Successful! Payment ID: " + response.razorpay_payment_id
            );
            window.location.href = `${url}/verify?success=true&orderId=${response.razorpay_payment_id}`;
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone,
          },
          theme: { color: "#3399cc" },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        console.error("Booking failed", response.data);
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error booking ticket:", error);
      alert("An error occurred while booking the ticket.");
    }
  };

  return (
    <form onSubmit={buyTicket} className="place-order">
      <div className="place-order-left">
        <p className="title">Ticket Booking Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          name="college_name"
          onChange={onChangeHandler}
          value={data.college_name}
          type="text"
          placeholder="College name"
          required
        />
        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
          required
        />
        <div className="multi-fields">
          <input
            name="Branch"
            onChange={onChangeHandler}
            value={data.Branch}
            type="text"
            placeholder="Branch"
            required
          />
          <input
            name="Team_name"
            onChange={onChangeHandler}
            value={data.Team_name}
            type="text"
            placeholder="Team Name"
          />
        </div>
        <div className="multi-fields">
          <input
            name="Team_leader_name"
            onChange={onChangeHandler}
            value={data.Team_leader_name}
            type="text"
            placeholder="Team Leader Name"
          />
          <input
            name="Team_size"
            onChange={onChangeHandler}
            value={data.Team_size}
            type="text"
            placeholder="Team Size"
          />
        </div>
        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone (+91 989-767-0000)"
          required
        />
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
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BuyTicket;
