import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const navigate = useNavigate();

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "480005944874-5c0523ra83a42ivf1gk62u43crak29rj.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("google-login-btn"),
      { theme: "outline", size: "large" }
    );

    // Optional: prompt auto-login on load if user previously signed in
    google.accounts.id.prompt();
  }, []);

  const handleCredentialResponse = async (response) => {
    try {
      const token = response.credential;

      const res = await fetch("http://localhost:3000/auth/google", { // Fixed port to 3000 (match backend)
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();

      if (data.token && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed, please try again.");
    }
  };

  return (
    <div
      className="p-5 mx-auto flex items-center justify-center min-h-screen"
      id="google-login-btn"
    />
  );
};

export default Authentication;
