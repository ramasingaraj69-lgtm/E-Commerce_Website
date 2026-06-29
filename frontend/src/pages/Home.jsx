import { useEffect, useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

import ProductCard from "../components/ProductCard";

import API from "../service/api";

function Home() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [selectedCategory,
    setSelectedCategory] =
    useState("All");

  // LOGGED USER
  const { user } = useSelector(
    (state) => state.auth
  );

  // FETCH PRODUCTS
  useEffect(() => {

    axios
      .get(
        "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json"
      )

      .then((res) => {

        setProducts(res.data);

        setLoading(false);
      })

      .catch((err) => {

        console.log(err);

        setLoading(false);
      });

  }, []);

  // ADD TO CART
  const addToCart =
    async (productId) => {

      try {

        await API.post(
          "cart/add/",
          {
            email: user.email,
            product_id:
              String(productId),
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
    async (productId) => {

      try {

        await API.post(
          "wishlist/add/",
          {
            email: user.email,
            product_id:
              String(productId),
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

  // CATEGORIES
  const categories = [

    "All",

    ...new Set(
      products.map(
        (item) =>
          item.category
      )
    ),
  ];

  // FILTER PRODUCTS
  const filteredProducts =
    products.filter((item) => {

      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All"
          ? true
          : item.category ===
            selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (

    <div
      style={{
        position: "relative",
        minHeight: "100vh",
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
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background:
            "rgba(0,0,0,0.35)",
          zIndex: -1,
        }}
      />

      {/* MAIN */}
      <div
        style={{
          padding: "30px",
        }}
      >

        {/* HERO */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >

          <h1
            style={{
              color: "#FFE066",
              fontSize: "4rem",
              textShadow:
                "0 0 20px rgba(255,255,0,0.8)",
            }}
          >
            Sunflower Shop 🌻
          </h1>

          <p
            style={{
              color: "white",
              fontSize: "1.2rem",
              marginTop: "10px",
            }}
          >
            Premium Beauty &
            Lifestyle Products
          </p>

        </div>

        {/* SEARCH */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "35px",
          }}
        >

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              width: "500px",
              padding: "18px",
              borderRadius: "15px",
              border: "none",
              outline: "none",
              fontSize: "1rem",
              background:
                "rgba(255,255,255,0.18)",
              color: "white",
              backdropFilter:
                "blur(10px)",
            }}
          />

        </div>

        {/* LAYOUT */}
        <div
          style={{
            display: "flex",
            gap: "25px",
          }}
        >

          {/* SIDEBAR */}
          <div
            style={{
              width: "240px",
              flexShrink: 0,
              height: "80vh",
              overflowY: "auto",
              position: "sticky",
              top: "90px",
              backdropFilter:
                "blur(12px)",
              background:
                "rgba(255,255,255,0.12)",
              padding: "20px",
              borderRadius: "20px",
            }}
          >

            <h2
              style={{
                color: "#FFE066",
                marginBottom: "20px",
              }}
            >
              Filters 🌻
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >

              {categories.map(
                (
                  category,
                  index
                ) => (

                  <button
                    key={index}
                    onClick={() =>
                      setSelectedCategory(
                        category
                      )
                    }
                    style={{
                      padding: "13px",
                      borderRadius:
                        "12px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "bold",
                      background:
                        selectedCategory ===
                        category
                          ? "#FFD43B"
                          : "rgba(255,255,255,0.2)",
                      color:
                        selectedCategory ===
                        category
                          ? "black"
                          : "white",
                    }}
                  >
                    {category}
                  </button>
                )
              )}
            </div>
          </div>

          {/* PRODUCTS */}
          <div
            style={{
              flex: 1,
              height: "80vh",
              overflowY: "auto",
              paddingRight: "10px",
            }}
          >

            {loading && (
              <h1
                style={{
                  color: "white",
                }}
              >
                Loading 🌻
              </h1>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(260px,1fr))",
                gap: "25px",
              }}
            >

              {filteredProducts.map(
                (item) => (

                  <ProductCard
                    key={item.id}
                    item={item}
                    addToCart={
                      addToCart
                    }
                    addToWishlist={
                      addToWishlist
                    }
                  />
                )
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;