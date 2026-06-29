import {
  useState,
} from "react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  clearCart,
} from "../redux/cartSlice";

function Checkout() {

  const [success,
    setSuccess] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const [cardNumber,
    setCardNumber] =
    useState("");

  const [name,
    setName] =
    useState("");

  const [cvv,
    setCvv] =
    useState("");

  const [expiry,
    setExpiry] =
    useState("");

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  // FIXED CART
  const cartItems =
    useSelector(
      (state) =>
        state.cart.items
    );

  // TOTAL
  const total =
    cartItems.reduce(
      (
        acc,
        item
      ) => {

        return (
          acc +

          (
            (
              item
                ?.product
                ?.priceCents ||

              item
                ?.priceCents ||

              0
            ) / 100
          ) *

          (
            item
              ?.quantity || 1
          )
        );
      },

      0
    );

  // PAYMENT
  const handlePayment =
    () => {

      if (
        !cardNumber ||
        !name ||
        !cvv ||
        !expiry
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      setLoading(
        true
      );

      setTimeout(
        () => {

          setLoading(
            false
          );

          setSuccess(
            true
          );

          // CLEAR CART
          dispatch(
            clearCart()
          );

        },

        2500
      );
    };

  return (

    <div
      style={{
        minHeight:
          "100vh",

        position:
          "relative",

        overflow:
          "hidden",

        display:
          "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        padding:
          "30px",
      }}
    >

      {/* VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position:
            "fixed",

          top: 0,
          left: 0,

          width:
            "100%",

          height:
            "100vh",

          objectFit:
            "cover",

          zIndex: -2,
        }}
      >
        <source
          src="/dashboard.mp4"
          type="video/mp4"
        />
      </video>

      {/* OVERLAY */}
      <div
        style={{
          position:
            "fixed",

          width:
            "100%",

          height:
            "100vh",

          background:
            "rgba(0,0,0,0.4)",

          zIndex: -1,
        }}
      />

      {/* CARD */}
      <div
        style={{
          width:
            "420px",

          backdropFilter:
            "blur(12px)",

          background:
            "rgba(255,255,255,0.12)",

          border:
            "1px solid rgba(255,255,255,0.2)",

          padding:
            "35px",

          borderRadius:
            "25px",

          color:
            "white",

          boxShadow:
            "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >

        {
          !success
            ? (

              <>

                {/* TITLE */}
                <h1
                  style={{
                    textAlign:
                      "center",

                    color:
                      "#FFE066",

                    marginBottom:
                      "25px",

                    fontSize:
                      "2.5rem",
                  }}
                >
                  Checkout 🌻
                </h1>

                {/* TOTAL */}
                <h2
                  style={{
                    textAlign:
                      "center",

                    marginBottom:
                      "25px",

                    color:
                      "#FFD43B",
                  }}
                >
                  Total:
                  {" "}

                  ₹
                  {" "}

                  {
                    total.toFixed(
                      2
                    )
                  }
                </h2>

                {/* NAME */}
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />

                {/* CARD */}
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />

                {/* EXPIRY */}
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) =>
                    setExpiry(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />

                {/* CVV */}
                <input
                  type="password"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) =>
                    setCvv(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />

                {/* BUTTON */}
                <button
                  onClick={
                    handlePayment
                  }
                  style={{
                    width:
                      "100%",

                    marginTop:
                      "20px",

                    padding:
                      "14px",

                    background:
                      "#FFD43B",

                    border:
                      "none",

                    borderRadius:
                      "12px",

                    fontWeight:
                      "bold",

                    cursor:
                      "pointer",

                    fontSize:
                      "1rem",
                  }}
                >
                  {
                    loading
                      ? "Processing Payment..."
                      : "Pay Now 🌻"
                  }
                </button>

              </>

            )
            : (

              <div
                style={{
                  textAlign:
                    "center",
                }}
              >

                {/* SUCCESS */}
                <h1
                  style={{
                    color:
                      "#FFE066",

                    fontSize:
                      "3rem",
                  }}
                >
                  ✅ Payment
                  Successful
                </h1>

                <p
                  style={{
                    marginTop:
                      "20px",

                    fontSize:
                      "1.2rem",
                  }}
                >
                  Thank you
                  for shopping
                  with
                  Sunflower
                  Shop 🌻
                </p>

                <button
                  onClick={() =>
                    navigate(
                      "/home"
                    )
                  }
                  style={{
                    marginTop:
                      "30px",

                    padding:
                      "14px 25px",

                    background:
                      "#FFD43B",

                    border:
                      "none",

                    borderRadius:
                      "12px",

                    fontWeight:
                      "bold",

                    cursor:
                      "pointer",
                  }}
                >
                  Continue
                  Shopping
                </button>

              </div>

            )
        }

      </div>

    </div>
  );
}

const inputStyle = {

  width: "100%",

  padding: "14px",

  marginTop: "15px",

  borderRadius: "10px",

  border: "none",

  outline: "none",

  fontSize: "1rem",
};

export default Checkout;