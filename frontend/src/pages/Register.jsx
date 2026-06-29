import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../redux/authSlice";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Register() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error } =
    useSelector((state) => state.auth);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister =
    async (e) => {

      e.preventDefault();

      if (
        !name ||
        !email ||
        !password
      ) {

        alert("Fill all fields");

        return;
      }

      const res = await dispatch(
        registerUser({
          name,
          email,
          password,
        })
      );

      if (res.payload) {

        alert(
          "Registration Successful 🌻"
        );

        navigate("/login");

      } else {

        alert("Register failed");
      }
    };

  return (

    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >

      {/* VIDEO BACKGROUND */}
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

      {/* REGISTER CARD */}
      <form
        onSubmit={handleRegister}
        style={{
          width: "400px",
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

        {/* TITLE */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >

          <h1
            style={{
              color: "#FFE066",
              fontSize: "2.5rem",
            }}
          >
            Create Account 🌻
          </h1>

          <p>
            Join Sunflower Shop
          </p>

        </div>

        {/* NAME */}
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "18px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            background:
              "rgba(255,255,255,0.2)",
            color: "white",
            fontSize: "1rem",
          }}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "18px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            background:
              "rgba(255,255,255,0.2)",
            color: "white",
            fontSize: "1rem",
          }}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            background:
              "rgba(255,255,255,0.2)",
            color: "white",
            fontSize: "1rem",
          }}
        />

        {/* ERROR */}
        {error && (
          <p
            style={{
              color: "red",
              marginBottom: "15px",
            }}
          >
            {error}
          </p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background: "#FFD43B",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >

          {loading
            ? "Creating..."
            : "Register 🌻"}

        </button>

        {/* LOGIN */}
        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
          }}
        >

          Already have an account?

          <Link
            to="/login"
            style={{
              color: "#FFE066",
              marginLeft: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>

        </p>

      </form>
    </div>
  );
}

export default Register;