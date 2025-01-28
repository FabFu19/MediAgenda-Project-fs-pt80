//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";


//include your index.scss file into the bundle
import "../styles/index.css";
import "../styles/navbar.css";
import "../styles/BookAppointment.css";
import "../styles/profile.css";
import "../styles/login.css";
import "../styles/register.css";
import "../styles/calendar.css";


//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
