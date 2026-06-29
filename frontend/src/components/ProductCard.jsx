import {
  FaHeart,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import API from "../service/api";

function ProductCard({
  item,
}) {

  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  const requireLogin =
    () => {

      if (!user) {

        navigate("/login");

        return false;
      }

      return true;
    };

  const safeItem = item || {};

  // ADD TO CART
  const handleAddToCart =
    async (e) => {

      e.stopPropagation();

      if (!requireLogin()) {
        return;
      }

      try {

        await API.post(
          "cart/add/",
          {
            email:
              user.email,

            product_id:
              String(
                safeItem.id
              ),
          }
        );

        alert(
          "Added To Cart 🌻"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Add Cart"
        );
      }
    };

  // ADD TO WISHLIST
  const handleAddToWishlist =
    async (e) => {

      e.stopPropagation();

      if (!requireLogin()) {
        return;
      }

      try {

        await API.post(
          "wishlist/add/",
          {
            email:
              user.email,

            product_id:
              String(
                safeItem.id
              ),
          }
        );

        alert(
          "Added To Wishlist ❤️"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed To Add Wishlist"
        );
      }
    };

  return (

    <div
      onClick={() =>
        navigate(
          `/product/${safeItem.id}`
        )
      }
      style={{

        backdropFilter:
          "blur(14px)",

        background:
          "rgba(255,255,255,0.12)",

        border:
          "1px solid rgba(255,255,255,0.2)",

        padding: "18px",

        borderRadius: "24px",

        color: "white",

        cursor: "pointer",

        transition: "0.3s ease",

        boxShadow:
          "0 8px 32px rgba(0,0,0,0.35)",

        overflow: "hidden",
      }}
    >

      {/* IMAGE */}
      <div
        style={{
          overflow: "hidden",
          borderRadius: "18px",
        }}
      >

        <img
          src={safeItem.image}
          alt={safeItem.name}
          style={{
            width: "100%",
            height: "260px",
            objectFit: "cover",
            borderRadius: "18px",
            transition: "0.4s",
          }}
        />

      </div>

      {/* CONTENT */}
      <div
        style={{
          marginTop: "18px",
        }}
      >

        {/* CATEGORY */}
        <p
          style={{
            color: "#FFE066",
            fontSize: "0.9rem",
            marginBottom: "8px",
          }}
        >
          {
            safeItem.category
          }
        </p>

        {/* NAME */}
        <h2
          style={{
            fontSize: "1.25rem",
            minHeight: "60px",
            lineHeight: "1.4",
          }}
        >
          {safeItem.name}
        </h2>

        {/* DESCRIPTION */}
        <p
          style={{
            marginTop: "10px",
            color: "#ddd",
            fontSize: "0.95rem",
            lineHeight: "1.6",
            minHeight: "70px",
          }}
        >
          {
            safeItem.description
              ?.slice(0, 90)
          }
          ...
        </p>

        {/* RATING + PRICE */}
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",

            alignItems: "center",

            marginTop: "18px",
          }}
        >

          {/* RATING */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#FFD43B",
            }}
          >

            <FaStar />

            <span>
              {
                safeItem.rating
                  ?.stars
              }
            </span>

          </div>

          {/* PRICE */}
          <h2
            style={{
              color: "#FFE066",
              fontSize: "1.5rem",
            }}
          >
            ₹
            {" "}
            {
              safeItem.priceCents
                ? (
                    safeItem.priceCents /
                    100
                  ).toFixed(2)
                : "0.00"
            }
          </h2>

        </div>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "22px",
          }}
        >

          {/* CART */}
          <button
            onClick={
              handleAddToCart
            }
            style={{
              flex: 1,

              padding: "13px",

              border: "none",

              borderRadius: "12px",

              background:
                "#FFD43B",

              color: "black",

              fontWeight: "bold",

              cursor: "pointer",

              display: "flex",

              justifyContent:
                "center",

              alignItems:
                "center",

              gap: "8px",

              fontSize: "0.95rem",
            }}
          >

            <FaShoppingCart />

            Cart

          </button>

          {/* WISHLIST */}
          <button
            onClick={
              handleAddToWishlist
            }
            style={{
              flex: 1,

              padding: "13px",

              border: "none",

              borderRadius: "12px",

              background:
                "rgba(255,255,255,0.18)",

              color: "white",

              fontWeight: "bold",

              cursor: "pointer",

              display: "flex",

              justifyContent:
                "center",

              alignItems:
                "center",

              gap: "8px",

              fontSize: "0.95rem",
            }}
          >

            <FaHeart />

            Wishlist

          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;