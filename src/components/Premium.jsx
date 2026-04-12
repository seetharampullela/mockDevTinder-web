import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";

export default function Premium() {
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const user = useSelector((state) => {
    console.log("🚀 ~ Premium.jsx:10 ~ Premium ~ user:", state);
    return state.user;
  });

  const handleCloseRazorPay = async () => {
    const { data } = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    setIsPremiumUser(data.isPremium);
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      `${BASE_URL}/payment/create`,
      { membershipType: type },
      { withCredentials: true },
    );
    const { keyId, amount, orderId, notes } = order.data;
    console.log("🚀 ~ Premium.jsx:13 ~ handleBuyClick ~ order:", order);
    var options = {
      key: keyId, // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits.
      currency: "INR",
      name: "Mock Dev TInder", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      prefill: {
        name: notes?.firstName,
        email: notes?.emailId,
        contact: "+919876543210",
      },
      notes: notes,
      theme: {
        color: "#3399cc",
      },
      handler: handleCloseRazorPay,
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    handleCloseRazorPay();
  });

  return isPremiumUser ? (
    <div>
      <h1 className="text-2xl font-bold text-center mt-10">
        You are already a premium user and have a {user.membershipType}
        membership.
      </h1>
    </div>
  ) : (
    <div className="flex w-full flex-col lg:flex-row p-10">
      <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center p-3">
        <h1 className="font-bold text-2xl">Silver Membership</h1>
        <ul>
          <li> - 100 connection requests per day</li>
          <li> - Blue tick</li>
          <li> - Chat with other people</li>
          <li> - 3 Months</li>
        </ul>
        <button
          className="btn btn-secondary m-3 "
          onClick={async () => await handleBuyClick("silver")}
        >
          Buy Silver
        </button>
      </div>
      <div className="divider lg:divider-horizontal">OR</div>
      <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center p-3">
        <h1 className="font-bold text-2xl">Silver Membership</h1>
        <ul>
          <li> - Unlimited connection requests per day</li>
          <li> - Blue tick</li>
          <li> - Chat with other people</li>
          <li> - 6 Months</li>
        </ul>
        <button
          className="btn btn-primary m-3"
          onClick={() => handleBuyClick("gold")}
        >
          Buy Gold
        </button>
      </div>
    </div>
  );
}
