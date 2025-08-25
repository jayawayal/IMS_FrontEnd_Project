import React from "react";
import styles from "./LandingPage.module.css";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx"; // optional


export default function LandingPage({ setToken, setRole }) {
  return (
    <>
      <Navbar setToken={setToken} setRole={setRole} />

      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <div>
          <h1>InvTrack</h1>
          <h1> Manage Inventory Effortlessly</h1>
          <p>
            Track products, suppliers, purchases, and reports — all in one place.
          </p>
          <a href="#services" className={styles.primaryBtn}>
            Explore Services
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className={styles.section}>
        <h2 className={styles.sectionTitle}>About Us</h2>
        <p className={styles.about}>
          InvTrack simplifies inventory operations for businesses of all sizes.
          From stock tracking to supplier management, it’s designed to be fast,
          reliable, and easy to use.
        </p>
      </section>

      {/* Services */}
      <section id="services" className={styles.sectionAlt}>
        <h2 className={styles.sectionTitle}>Our Services</h2>
        <div className={styles.services}>
          <div className={styles.serviceCard}>
            <h3>Real-time Stock</h3>
            <p>
              Live product counts, low-stock alerts, and fast updates.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <h3>Supplier & Purchase</h3>
            <p>
              Manage suppliers, purchases, and GST invoices smoothly.
            </p>
          </div>
          <div className={styles.serviceCard}>
            <h3>Reports & Analytics</h3>
            <p>
              Clear dashboards and exportable reports for decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
<section id="contact" className={styles.contactSection}>
  <div className={styles.contactContainer}>
    <h2 className={styles.contactTitle}>Get in Touch</h2>
    <p className={styles.contactSubtitle}>
      We’d love to hear from you. Fill out the form and we’ll get back shortly.
    </p>

    <form className={styles.contactForm}>
      <div className={styles.inputGroup}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
      </div>
      <textarea rows="5" placeholder="How can we help?" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  </div>
</section>


      {typeof Footer === "function" && <Footer />}
    </>
  );
}
