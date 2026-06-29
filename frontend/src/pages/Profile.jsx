import {
  useEffect,
  useState,
} from "react";

import {
  useSelector,
} from "react-redux";

import {
  Link,
} from "react-router-dom";

import {
  FaCamera,
} from "react-icons/fa";

import API from "../service/api";

function Profile() {

  // USER
  const user = useSelector(
    (state) => state.auth.user
  );

  // COUNTS
  const [cartCount,
    setCartCount] =
    useState(0);

  const [wishlistCount,
    setWishlistCount] =
    useState(0);

  // FETCH COUNTS
  useEffect(() => {

    if (user?.email) {

      fetchCounts();
    }

  }, [user]);

  const fetchCounts =
    async () => {

      try {

        // CART
        const cartRes =
          await API.get(
            `cart/?email=${user.email}`
          );

        setCartCount(
          cartRes.data.length
        );

        // WISHLIST
        const wishlistRes =
          await API.get(
            `wishlist/?email=${user.email}`
          );

        setWishlistCount(
          wishlistRes.data.length
        );

      } catch (error) {

        console.log(error);
      }
    };

  // PROFILE IMAGE
  const profileImage =
    `https://ui-avatars.com/api/?name=${
      user?.name || "User"
    }&background=FFE066&color=000&size=200`;

  return (

    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
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
          top: 0,
          left: 0,
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
            "rgba(0,0,0,0.45)",
          zIndex: -1,
        }}
      />

      {/* MAIN */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "30px",
        }}
      >

        {/* CARD */}
        <div
          style={{
            width: "470px",
            padding: "40px",
            borderRadius: "25px",
            background:
              "rgba(255,255,255,0.12)",
            backdropFilter:
              "blur(15px)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.3)",
            color: "white",
          }}
        >

          {/* PROFILE IMAGE */}
          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
              marginBottom: "25px",
            }}
          >

            <div
              style={{
                position:
                  "relative",
              }}
            >

              <img
                src={
                  profileImage
                }
                alt="profile"
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius:
                    "50%",
                  objectFit:
                    "cover",
                  border:
                    "5px solid #FFE066",
                  boxShadow:
                    "0 0 25px rgba(255,224,102,0.6)",
                }}
              />

              {/* CAMERA */}
              <button
                style={{
                  position:
                    "absolute",
                  bottom: "5px",
                  right: "5px",
                  width: "38px",
                  height: "38px",
                  borderRadius:
                    "50%",
                  border: "none",
                  background:
                    "#FFE066",
                  cursor:
                    "pointer",
                  display: "flex",
                  justifyContent:
                    "center",
                  alignItems:
                    "center",
                  boxShadow:
                    "0 0 15px rgba(255,224,102,0.5)",
                }}
              >

                <FaCamera
                  color="black"
                />

              </button>

            </div>

          </div>

          {/* TITLE */}
          <div
            style={{
              textAlign:
                "center",
              marginBottom:
                "30px",
            }}
          >

            <h1
              style={{
                color:
                  "#FFE066",
                fontSize:
                  "3rem",
              }}
            >
              My Profile 🌻
            </h1>

            <p>
              Welcome back to
              Sunflower Shop
            </p>

          </div>

          {/* USER INFO */}
          <div
            style={{
              display: "flex",
              flexDirection:
                "column",
              gap: "18px",
            }}
          >

            {/* NAME */}
            <div
              style={{
                background:
                  "rgba(255,255,255,0.15)",
                padding:
                  "15px",
                borderRadius:
                  "12px",
              }}
            >

              <h3>Name</h3>

              <p>
                {
                  user?.name ||
                  "Guest"
                }
              </p>

            </div>

            {/* EMAIL */}
            <div
              style={{
                background:
                  "rgba(255,255,255,0.15)",
                padding:
                  "15px",
                borderRadius:
                  "12px",
              }}
            >

              <h3>Email</h3>

              <p>
                {
                  user?.email ||
                  "No Email"
                }
              </p>

            </div>

            {/* STATS */}
            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop:
                  "10px",
              }}
            >

              {/* CART */}
              <div
                style={{
                  flex: 1,
                  background:
                    "rgba(255,255,255,0.15)",
                  padding:
                    "20px",
                  borderRadius:
                    "15px",
                  textAlign:
                    "center",
                }}
              >

                <h2
                  style={{
                    color:
                      "#FFE066",
                  }}
                >
                  {
                    cartCount
                  }
                </h2>

                <p>
                  Cart Items 🛒
                </p>

              </div>

              {/* WISHLIST */}
              <div
                style={{
                  flex: 1,
                  background:
                    "rgba(255,255,255,0.15)",
                  padding:
                    "20px",
                  borderRadius:
                    "15px",
                  textAlign:
                    "center",
                }}
              >

                <h2
                  style={{
                    color:
                      "#FFE066",
                  }}
                >
                  {
                    wishlistCount
                  }
                </h2>

                <p>
                  Wishlist ❤️
                </p>

              </div>

            </div>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop:
                  "25px",
              }}
            >

              {/* CART */}
              <Link
                to="/cart"
                style={{
                  flex: 1,
                }}
              >

                <button
                  style={{
                    width:
                      "100%",
                    padding:
                      "14px",
                    border:
                      "none",
                    borderRadius:
                      "12px",
                    background:
                      "#FFD43B",
                    cursor:
                      "pointer",
                    fontWeight:
                      "bold",
                  }}
                >
                  View Cart
                </button>

              </Link>

              {/* WISHLIST */}
              <Link
                to="/wishlist"
                style={{
                  flex: 1,
                }}
              >

                <button
                  style={{
                    width:
                      "100%",
                    padding:
                      "14px",
                    border:
                      "none",
                    borderRadius:
                      "12px",
                    background:
                      "pink",
                    cursor:
                      "pointer",
                    fontWeight:
                      "bold",
                  }}
                >
                  Wishlist
                </button>

              </Link>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;