import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  useEffect,
  useState,
} from "react";

import API from "../service/api";

import { logout } from "../redux/authSlice";

function Navbar() {

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  // USER FROM REDUX
  const { user } =
    useSelector(
      (state) =>
        state.auth
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

    if (
      user?.email
    ) {

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

  // LOGOUT
  const handleLogout =
    () => {

      dispatch(
        logout()
      );

      navigate(
        "/login"
      );
    };

  return (

    <nav
      style={
        navbarStyle
      }
    >

      {/* LOGO */}
      <Link
        to="/home"
        style={
          logoStyle
        }
      >
        🌻 Sunflower Shop
      </Link>

      {/* RIGHT */}
      <div
        style={
          rightSection
        }
      >

        {/* HOME */}
        <Link
          to="/home"
          style={navBtn}
        >

          <FaHome />

          Home

        </Link>

        {/* WISHLIST */}
        <Link
          to="/wishlist"
          style={
            glassBtn
          }
        >

          <FaHeart />

          Wishlist
          (
          {
            wishlistCount
          }
          )

        </Link>

        {/* CART */}
        <Link
          to="/cart"
          style={
            cartBtn
          }
        >

          <FaShoppingCart />

          Cart
          (
          {
            cartCount
          }
          )

        </Link>

        {/* PROFILE */}
        <Link
          to="/profile"
          style={
            profileBtn
          }
        >

          <FaUser />

          {
            user?.name ||
            "Profile"
          }

        </Link>

        {/* LOGOUT */}
        <button
          onClick={
            handleLogout
          }
          style={
            logoutBtn
          }
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>
    </nav>
  );
}

/* ---------------- STYLES ---------------- */

const navbarStyle = {

  position: "sticky",

  top: 0,

  zIndex: 1000,

  width: "100%",

  padding:
    "18px 40px",

  display: "flex",

  justifyContent:
    "space-between",

  alignItems:
    "center",

  backdropFilter:
    "blur(16px)",

  background:
    "rgba(0,0,0,0.25)",

  borderBottom:
    "1px solid rgba(255,255,255,0.1)",

  boxShadow:
    "0 8px 32px rgba(0,0,0,0.25)",

  boxSizing:
    "border-box",
};

const logoStyle = {

  color: "#FFE066",

  textDecoration:
    "none",

  fontSize: "2rem",

  fontWeight:
    "bold",

  letterSpacing:
    "1px",

  textShadow:
    "0 0 15px rgba(255,255,0,0.7)",
};

const rightSection = {

  display: "flex",

  alignItems:
    "center",

  gap: "16px",

  flexWrap: "wrap",
};

const navBtn = {

  color: "#ffffff",

  textDecoration:
    "none",

  display: "flex",

  alignItems:
    "center",

  gap: "8px",

  fontSize: "1rem",

  fontWeight:
    "600",

  padding:
    "10px 16px",

  borderRadius:
    "12px",

  background:
    "rgba(255,255,255,0.08)",

  border:
    "1px solid rgba(255,255,255,0.1)",
};

const glassBtn = {

  background:
    "rgba(255,255,255,0.12)",

  color: "#FFD6E7",

  padding:
    "10px 16px",

  borderRadius:
    "12px",

  textDecoration:
    "none",

  display: "flex",

  alignItems:
    "center",

  gap: "8px",

  fontWeight:
    "600",

  border:
    "1px solid rgba(255,255,255,0.1)",

  backdropFilter:
    "blur(10px)",
};

const cartBtn = {

  background:
    "linear-gradient(135deg,#FFD43B,#FFC107)",

  color: "#111",

  padding:
    "10px 18px",

  borderRadius:
    "12px",

  textDecoration:
    "none",

  display: "flex",

  alignItems:
    "center",

  gap: "8px",

  fontWeight:
    "bold",

  boxShadow:
    "0 0 18px rgba(255,212,59,0.45)",
};

const profileBtn = {

  background:
    "rgba(255,255,255,0.14)",

  color: "#ffffff",

  padding:
    "10px 18px",

  borderRadius:
    "12px",

  textDecoration:
    "none",

  display: "flex",

  alignItems:
    "center",

  gap: "8px",

  fontWeight:
    "600",

  border:
    "1px solid rgba(255,255,255,0.12)",

  backdropFilter:
    "blur(10px)",
};

const logoutBtn = {

  background:
    "linear-gradient(135deg,#ff4d4d,#ff1f1f)",

  color: "#fff",

  border: "none",

  padding:
    "10px 18px",

  borderRadius:
    "12px",

  cursor: "pointer",

  display: "flex",

  alignItems:
    "center",

  gap: "8px",

  fontWeight:
    "bold",

  boxShadow:
    "0 0 18px rgba(255,77,77,0.35)",
};

export default Navbar;