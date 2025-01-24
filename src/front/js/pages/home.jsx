import React from "react";
import group21Image from "../../img/Group 21.png";
import image15 from "../../img/image 15.png";
import image16 from "../../img/image 16.png";
import image17 from "../../img/image 17.png";
import "../../styles/home.css";

export const Home = () => {
  return (
    <div className="home_body">
      {/* Sección Principal */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>Schedule your appointment easily</h1>
          <p>
            We are here to make healthcare easier, because every visit counts and
            every patient matters.
          </p>
          <button className="btn-appointment">Take an Appointment</button>
        </div>
        <div className="hero-image">
          <img src={group21Image} alt="Laptop with calendar" />
        </div>
      </section>

      {/* Sección "What do we do?" */}
      <section className="what-we-do" id="about-us">
        <h2>What do we do?</h2>
        <p>
          We developed a comprehensive solution to manage medical consultations
          efficiently and securely. We facilitate appointment scheduling, access
          to medical records, and communication between patients and doctors,
          optimizing administrative processes for clinics and offices.
        </p>
      </section>

      {/* Carrusel de Profesionales */}
      <section className="professional-slide">
        <h2>Our Professionals</h2>
        <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <img src={image15} className="d-block w-100 carousel-image" alt="Doctor 1" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Dr. Jane Doe</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src={image16} className="d-block w-100 carousel-image" alt="Doctor 2" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Dr. John Smith</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={image17} className="d-block w-100 carousel-image" alt="Doctor 3" />
              <div className="carousel-caption d-none d-md-block">
                <h5>Dr. Emily Brown</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Sección "Find Your Doctor" */}
      <section className="find-doctor">
        <h2>Find Your Doctor</h2>
        <div className="search-bar">
          <input type="text" placeholder="Orangel Hernandez" className="search-input" />
          <button className="search-button">🔍</button>
        </div>
      </section>

      {/* Sección "Medical Suggestions" */}
      <section className="medical-suggestions">
        <h2>Medical Suggestions</h2>
        <blockquote className="suggestion">
          <p>
            "Excess sodium can increase blood pressure, and high sugar intake can
            contribute to obesity and diabetes."
          </p>
          <footer>By Dr. Smith</footer>
        </blockquote>
      </section>
    </div>
  );
};
