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

function Wishlist() {

  // STATE
  const [wishlistItems,
    setWishlistItems] =
    useState([]);

  // LOGGED USER
  const { user } =
    useSelector(
      (state) =>
        state.auth
    );

  const userEmail =
    user?.email;

  // FETCH WISHLIST
  const fetchWishlist =
    async () => {

      try {

        const res =
          await API.get(
            `wishlist/?email=${userEmail}`
          );

        setWishlistItems(
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

      fetchWishlist();
    }

  }, [userEmail]);

  // REMOVE ITEM
  const removeWishlistItem =
    async (id) => {

      try {

        await API.delete(
          `wishlist/remove/${id}/`
        );

        fetchWishlist();

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        position: "relative",
      }}
    >

      {/* VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100vh",
          objectFit: "cover",
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
          position: "fixed",
          inset: 0,
          background:
            "rgba(0,0,0,0.4)",
          zIndex: -1,
        }}
      />

      {/* TITLE */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "35px",
        }}
      >

        <h1
          style={{
            color: "#FFE066",
            fontSize: "3.5rem",
          }}
        >
          Wishlist ❤️
        </h1>

        <p
          style={{
            color: "white",
            fontSize: "1.1rem",
          }}
        >
          Your favorite sunflower
          products 🌻
        </p>

      </div>

      {/* EMPTY */}
      {
        wishlistItems.length === 0
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
                Your Wishlist
                is Empty
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
                  Explore
                  Products 🌻
                </button>

              </Link>

            </div>

          )
          : (

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "repeat(auto-fit,minmax(260px,1fr))",

                gap: "25px",
              }}
            >

              {
                wishlistItems.map(
                  (
                    item
                  ) => (

                    <div
                      key={
                        item._id
                      }
                      style={{
                        background:
                          "rgba(255,255,255,0.12)",

                        backdropFilter:
                          "blur(10px)",

                        padding:
                          "18px",

                        borderRadius:
                          "18px",

                        color:
                          "white",

                        boxShadow:
                          "0 8px 32px rgba(0,0,0,0.3)",
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
                            "100%",

                          height:
                            "240px",

                          objectFit:
                            "cover",

                          borderRadius:
                            "12px",
                        }}
                      />

                      {/* NAME */}
                      <h2
                        style={{
                          marginTop:
                            "15px",
                        }}
                      >
                        {
                          item
                            .product
                            ?.name
                        }
                      </h2>

                      {/* CATEGORY */}
                      <p
                        style={{
                          marginTop:
                            "8px",

                          color:
                            "#ddd",
                        }}
                      >
                        {
                          item
                            .product
                            ?.category
                        }
                      </p>

                      {/* PRICE */}
                      <h3
                        style={{
                          marginTop:
                            "12px",

                          color:
                            "#FFE066",
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
                      </h3>

                      {/* BUTTONS */}
                      <div
                        style={{
                          display:
                            "flex",

                          gap:
                            "10px",

                          marginTop:
                            "18px",
                        }}
                      >

                        {/* VIEW */}
                        <Link
                          to={`/product/${item.product?.id}`}
                          style={{
                            flex: 1,
                          }}
                        >

                          <button
                            style={{
                              width:
                                "100%",

                              padding:
                                "12px",

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
                            View
                          </button>

                        </Link>

                        {/* REMOVE */}
                        <button
                          onClick={() =>
                            removeWishlistItem(
                              item._id
                            )
                          }
                          style={{
                            flex: 1,

                            padding:
                              "12px",

                            border:
                              "none",

                            borderRadius:
                              "10px",

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

            </div>

          )
      }

    </div>
  );
}

export default Wishlist;