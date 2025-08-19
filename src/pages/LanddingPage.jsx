import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer"; // adjust path as needed


export default function LandingPage({ setToken, setRole }) {
  return (
    <>
      <Navbar setToken={setToken} setRole={setRole} />
      <div className="bg">
        <h1>Welcome to InvTrack</h1>
        {/* About, Services, Contact sections will go here later */}
      </div>
      <Footer />
    </>
  );
}
