import React, { useState, useEffect } from "react";
import UserService from "../services/user-service";
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour, homeObjFive } from './data';
import { InfoSection } from '../components';
import "../assets/styles/home.css";

const Home = () => {
  const [, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent(error.response?.data || error.message || error.toString());
      }
    );
  }, []);

  return (
    <div className="homepage">
      <InfoSection {...homeObjFive}/>
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjThree} />
      <InfoSection {...homeObjFour} />
      <InfoSection {...homeObjTwo}/>
    </div>
  );
};


export default Home;