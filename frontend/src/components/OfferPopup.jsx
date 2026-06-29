import {
  useEffect,
  useState,
} from "react";

import {
  FaGift,
  FaTimes,
  FaStar,
} from "react-icons/fa";

function OfferPopup() {

  const [show,
    setShow] =
    useState(false);

  const [animate,
    setAnimate] =
    useState(false);

  useEffect(() => {

    const timer =
      setTimeout(() => {

        setShow(true);

        setTimeout(() => {

          setAnimate(true);

        }, 100);

      }, 2000);

    return () =>
      clearTimeout(
        timer
      );

  }, []);

  if (!show)
    return null;

  return (

    <div
      style={{
        position:
          "fixed",

        bottom:
          "30px",

        right:
          "30px",

        width:
          "340px",

        padding:
          "25px",

        borderRadius:
          "25px",

        overflow:
          "hidden",

        backdropFilter:
          "blur(14px)",

        background:
          "linear-gradient(135deg, rgba(255,212,59,0.95), rgba(255,193,7,0.85))",

        boxShadow:
          "0 10px 40px rgba(255,193,7,0.45)",

        zIndex: 9999,

        transform:
          animate
            ? "translateY(0px) scale(1)"
            : "translateY(100px) scale(0.8)",

        opacity:
          animate
            ? 1
            : 0,

        transition:
          "all 0.6s ease",
      }}
    >

      {/* CLOSE */}
      <button
        onClick={() =>
          setShow(false)
        }
        style={{
          position:
            "absolute",

          top: "12px",

          right: "12px",

          border:
            "none",

          background:
            "rgba(255,255,255,0.25)",

          width: "35px",

          height:
            "35px",

          borderRadius:
            "50%",

          cursor:
            "pointer",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          color:
            "#111",

          fontSize:
            "1rem",
        }}
      >
        <FaTimes />
      </button>

      {/* ICON */}
      <div
        style={{
          width: "75px",

          height:
            "75px",

          borderRadius:
            "50%",

          background:
            "rgba(255,255,255,0.3)",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          margin:
            "0 auto 20px",

          fontSize:
            "2rem",

          color:
            "#111",

          boxShadow:
            "0 0 20px rgba(255,255,255,0.5)",
        }}
      >
        <FaGift />
      </div>

      {/* TITLE */}
      <h2
        style={{
          textAlign:
            "center",

          color:
            "#111",

          fontSize:
            "2rem",

          marginBottom:
            "10px",

          fontWeight:
            "bold",
        }}
      >
        🌻 Special Offer
      </h2>

      {/* SUBTITLE */}
      <p
        style={{
          textAlign:
            "center",

          color:
            "#222",

          fontSize:
            "1.1rem",

          lineHeight:
            "1.6",
        }}
      >
        Get
        {" "}
        <strong>
          20% OFF
        </strong>
        {" "}
        on your first
        Sunflower Shop
        order ✨
      </p>

      {/* COUPON */}
      <div
        style={{
          marginTop:
            "20px",

          padding:
            "15px",

          borderRadius:
            "15px",

          background:
            "rgba(255,255,255,0.25)",

          textAlign:
            "center",

          border:
            "2px dashed rgba(0,0,0,0.2)",
        }}
      >

        <p
          style={{
            marginBottom:
              "8px",

            color:
              "#111",

            fontWeight:
              "600",
          }}
        >
          Use Coupon
        </p>

        <h1
          style={{
            letterSpacing:
              "3px",

            color:
              "#111",

            margin: 0,
          }}
        >
          SUNFLOWER20
        </h1>

      </div>

      {/* STARS */}
      <div
        style={{
          display:
            "flex",

          justifyContent:
            "center",

          gap: "8px",

          marginTop:
            "20px",

          color:
            "#fff",
        }}
      >
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>

      {/* BUTTON */}
      <button
        onClick={() =>
          setShow(false)
        }
        style={{
          width:
            "100%",

          marginTop:
            "22px",

          padding:
            "14px",

          border:
            "none",

          borderRadius:
            "14px",

          background:
            "#111",

          color:
            "white",

          fontWeight:
            "bold",

          fontSize:
            "1rem",

          cursor:
            "pointer",

          transition:
            "0.3s",
        }}
      >
        Claim Offer 🌻
      </button>

    </div>
  );
}

export default OfferPopup;