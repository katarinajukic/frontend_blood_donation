import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import "./assets/styles/dropdown.css";
import jwt_decode from "jwt-decode";


import AuthService from "./services/auth-service";
import TokenService from "./services/token-service";


import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Profile from "./pages/profile";
import ProfileAdmin from "./components/profileAdmin";
import AddDonation from "./pages/addDonation";
import ViewDonation from "./pages/viewDonation";
import ViewDonationAdmin from "./pages/view-donation-admin";
import Donation from "./pages/donationDetail";
import Map from "./pages/map";
import Survey from "./pages/survey";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import BloodTypesA from "./components/bloodTypesA";
import BloodTypesB from "./components/bloodTypesB";
import BloodTypesAB from "./components/bloodTypesAB";
import BloodTypes0 from "./components/bloodTypes0";


import EventBus from "./common/EventBus";

import {BsDropletHalf} from 'react-icons/bs'
import { Button } from './components/button/Button'

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);


  const [,setButton]=useState(true)


  const showButton=()=>{
    if(window.innerWidth<=960){
        setButton(false);
    }else{
        setButton(true);
    }
};


window.addEventListener('resize', showButton);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      startTokenExpirationTimer(user.accessToken);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTokenExpirationTimer = (accessToken) => {
    const decodedToken = jwt_decode(accessToken);
    const tokenExpirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    const timeRemaining = tokenExpirationTime - currentTime;
  
    if (timeRemaining > 0) {
      setTimeout(() => {
        logOut();
        window.location.href = "/";
      }, timeRemaining);
    } else {
      logOut();
      window.location.href = "/home";
    }
  };


  const logOut = () => {
    AuthService.logout()
      .then(() => {
        TokenService.removeAccessToken();
        setCurrentUser(undefined);
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };
  

  
  return (
    <div>
      <nav className="navbar navbar-expand">
        <div className="navbar-nav">
          <Link to="/" className="navbar-logo">
            <BsDropletHalf className="navbar-icon" />
          </Link>
          <li className="nav-item home">
            <Link to={"/home"} className="nav-link">
              Početna
            </Link>
          </li>
        </div>

        {currentUser ? (
          <div className="navbar-nav mx-auto">
            {currentUser.roles.includes("ROLE_ADMIN") ? (
              <>
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Lista darivatelja
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <div className="nav-link dropdown-toggle">Krvne grupe</div>
                  <div className="dropdown-menu">
                    <Link to={"/blood-type-a"} className="dropdown-item">
                      A+/-
                    </Link>
                    <Link to={"/blood-type-b"} className="dropdown-item">
                      B+/-
                    </Link>
                    <Link to={"/blood-type-ab"} className="dropdown-item">
                      AB+/-
                    </Link>
                    <Link to={"/blood-type-0"} className="dropdown-item">
                      0+/-
                    </Link>
                  </div>
                </li>
                {  }
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    Osobni podaci
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/view"} className="nav-link">
                    Pregled darivanja
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/map"} className="nav-link">
                    Karta
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/survey"} className="nav-link">
                    Anketa
                  </Link>
                </li>
              </>
            )}
          </div>
        ) : (
          <div className="navbar-nav mx-auto"></div>
        )}

        <div className="navbar-nav">
          {currentUser ? (
            <li className="nav-btn">
              <a href="/home" className="btn-link" onClick={logOut}>
                <Button buttonStyle="btn--outline">Odjava</Button>
              </a>
            </li>
          ) : (
            <>
              <li className="nav-btn">
                <Link to={"/login"} className="btn-link">
                  <Button buttonStyle="btn--outline">Prijava</Button>
                </Link>
              </li>
              <li className="nav-btn">
                <Link to={"/register"} className="btn-link">
                  <Button buttonStyle="btn--outline">Registracija</Button>
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>


      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          {currentUser && currentUser.roles.includes("ROLE_USER") && (
            <>
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/view" element={<ViewDonation />} />
              <Route exact path="/donations/:id" element={<Donation />} />
              <Route exact path="/map" element={<Map />} />
              <Route exact path="/survey" element={<Survey />} />
            </>
          )}
          <Route path="/user" element={<BoardUser />} />
          {currentUser && currentUser.roles.includes("ROLE_ADMIN") && (
            <>
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/blood-type-a" element={<BloodTypesA />} />
            <Route path="/blood-type-b" element={<BloodTypesB />} />
            <Route path="/blood-type-ab" element={<BloodTypesAB />} />
            <Route path="/blood-type-0" element={<BloodTypes0 />} />
            <Route path="/view-donation/:userId" element={<ViewDonationAdmin />} />
            <Route path="/profile/:userId" element={<ProfileAdmin />} />
            <Route exact path="/add/:userId" element={<AddDonation />} />
            </>
          )}
        </Routes>
      </div>
      { }
    </div>
  );
};

export default App;