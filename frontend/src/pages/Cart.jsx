import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  useSelector,
} from "react-redux";

import API from "../service/api";

function Cart() {

  const [cartItems,
    setCartItems] =
    useState([]);

  // LOGGED USER
  const { user } =
    useSelector(
      (state) =>
        state.auth
    );

  const userEmail =
    user?.email;

  // FETCH CART
  const fetchCart =
    async () => {

      try {

        const res =
          await API.get(
            `cart/?email=${userEmail}`
          );

        setCartItems(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  // LOAD
  useEffect(() => {

    if (
      userEmail
    ) {

      fetchCart();
    }

  }, [userEmail]);

  // REMOVE ITEM
  const removeCartItem =
    async (id) => {

      try {

        await API.delete(
          `cart/remove/${id}/`
        );

        fetchCart();

      } catch (error) {

        console.log(error);
      }
    };

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
              item.product
                ?.priceCents || 0
            ) / 100
          ) *

          (
            item.quantity || 1
          )
        );
      },

      0
    );

  return (

    <div
      style={{
        minHeight:
          "100vh",

        position:
          "relative",

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

          inset: 0,

          background:
            "rgba(0,0,0,0.45)",

          zIndex: -1,
        }}
      />

      {/* TITLE */}
      <h1
        style={{
          color:
            "#FFE066",

          fontSize:
            "3rem",

          marginBottom:
            "30px",
        }}
      >
        Shopping Cart 🌻
      </h1>

      {
        cartItems.length === 0
          ? (

            <div
              style={{
                textAlign:
                  "center",

                marginTop:
                  "120px",

                color:
                  "white",
              }}
            >

              <h2>
                Your Cart
                is Empty 🛒
              </h2>

              <Link
                to="/home"
              >

                <button
                  style={{
                    marginTop:
                      "20px",

                    padding:
                      "12px 20px",

                    border:
                      "none",

                    borderRadius:
                      "10px",

                    background:
                      "#FFD43B",

                    cursor:
                      "pointer",

                    fontWeight:
                      "bold",
                  }}
                >
                  Continue
                  Shopping
                </button>

              </Link>

            </div>

          )
          : (

            <>

              {/* ITEMS */}
              {
                cartItems.map(
                  (
                    item
                  ) => (

                    <div
                      key={
                        item._id
                      }
                      style={{
                        display:
                          "flex",

                        gap:
                          "20px",

                        marginBottom:
                          "20px",

                        padding:
                          "20px",

                        borderRadius:
                          "15px",

                        background:
                          "rgba(255,255,255,0.12)",

                        backdropFilter:
                          "blur(8px)",

                        color:
                          "white",
                      }}
                    >

                      {/* IMAGE */}
                      <img
                        src={
                          item
                            .product
                            ?.image
                        }
                        alt={
                          item
                            .product
                            ?.name
                        }
                        style={{
                          width:
                            "130px",

                          height:
                            "130px",

                          objectFit:
                            "cover",

                          borderRadius:
                            "12px",
                        }}
                      />

                      {/* DETAILS */}
                      <div
                        style={{
                          flex: 1,
                        }}
                      >

                        <h2>
                          {
                            item
                              .product
                              ?.name
                          }
                        </h2>

                        {/* PRICE */}
                        <p
                          style={{
                            marginTop:
                              "10px",

                            color:
                              "#FFE066",

                            fontSize:
                              "1.2rem",
                          }}
                        >
                          ₹
                          {" "}

                          {
                            (
                              (
                                item
                                  .product
                                  ?.priceCents || 0
                              ) / 100
                            ).toFixed(
                              2
                            )
                          }
                        </p>

                        {/* QUANTITY */}
                        <p
                          style={{
                            marginTop:
                              "10px",
                          }}
                        >
                          Quantity:
                          {" "}

                          {
                            item.quantity || 1
                          }
                        </p>

                        {/* REMOVE */}
                        <button
                          onClick={() =>
                            removeCartItem(
                              item._id
                            )
                          }
                          style={{
                            marginTop:
                              "15px",

                            padding:
                              "10px 18px",

                            border:
                              "none",

                            borderRadius:
                              "8px",

                            background:
                              "red",

                            color:
                              "white",

                            cursor:
                              "pointer",

                            fontWeight:
                              "bold",
                          }}
                        >
                          Remove
                        </button>

                      </div>

                    </div>
                  )
                )
              }

              {/* TOTAL */}
              <div
                style={{
                  marginTop:
                    "30px",

                  padding:
                    "25px",

                  borderRadius:
                    "15px",

                  background:
                    "rgba(255,255,255,0.15)",

                  backdropFilter:
                    "blur(8px)",

                  color:
                    "white",
                }}
              >

                <h2>
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

                <Link
                  to="/checkout"
                >

                  <button
                    style={{
                      marginTop:
                        "20px",

                      padding:
                        "14px 25px",

                      border:
                        "none",

                      borderRadius:
                        "10px",

                      background:
                        "#FFD43B",

                      cursor:
                        "pointer",

                      fontWeight:
                        "bold",
                    }}
                  >
                    Checkout 🌻
                  </button>

                </Link>

              </div>

            </>
          )
      }

    </div>
  );
}

export default Cart;