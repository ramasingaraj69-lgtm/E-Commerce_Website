import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

import { useSelector } from "react-redux";

import API from "../service/api";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // LOGGED USER
  const { user } = useSelector(
    (state) => state.auth
  );

  // FETCH PRODUCT
  useEffect(() => {

    const fetchProduct =
      async () => {

        try {

          const res =
            await axios.get(
              "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json"
            );

          const found =
            res.data.find(
              (item) =>
                String(item.id) ===
                String(id)
            );

          setProduct(found);

          setLoading(false);

        } catch (err) {

          console.log(err);

          setLoading(false);
        }
      };

    fetchProduct();

  }, [id]);

  // ADD TO CART
  const addToCart =
    async () => {

      try {

        await API.post(
          "cart/add/",
          {
            email: user.email,
            product_id:
              String(product.id),
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
  const addToWishlist =
    async () => {

      try {

        await API.post(
          "wishlist/add/",
          {
            email: user.email,
            product_id:
              String(product.id),
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

  // LOADING
  if (loading) {

    return (

      <div
        style={{
          color: "white",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
        }}
      >
        Loading Product 🌻
      </div>
    );
  }

  // PRODUCT NOT FOUND
  if (!product) {

    return (

      <div
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Product Not Found
      </div>
    );
  }

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
          padding: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >

        {/* CARD */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            maxWidth: "1100px",
            width: "100%",
            background:
              "rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            borderRadius: "25px",
            padding: "35px",
            color: "white",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.3)",
          }}
        >

          {/* IMAGE */}
          <div style={{ flex: 1 }}>

            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />

          </div>

          {/* DETAILS */}
          <div style={{ flex: 1 }}>

            <h1
              style={{
                color: "#FFE066",
                fontSize: "3rem",
              }}
            >
              {product.name}
            </h1>

            <p
              style={{
                marginTop: "15px",
                fontSize: "1.2rem",
              }}
            >
              {product.category}
            </p>

            <h2
              style={{
                marginTop: "20px",
                fontSize: "2rem",
              }}
            >
              ₹ {product.price}
            </h2>

            <p
              style={{
                marginTop: "20px",
                lineHeight: "1.8",
                color: "#eee",
              }}
            >
              Premium quality product
              with elegant sunflower
              lifestyle design 🌻
            </p>

            {/* BUTTONS */}
            <div
              style={{
                marginTop: "35px",
                display: "flex",
                gap: "15px",
              }}
            >

              <button
                onClick={addToCart}
                style={{
                  padding: "15px 25px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#FFD43B",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Add To Cart 🛒
              </button>

              <button
                onClick={
                  addToWishlist
                }
                style={{
                  padding: "15px 25px",
                  border: "none",
                  borderRadius: "12px",
                  background: "pink",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Wishlist ❤️
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;