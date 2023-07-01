import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../services/user-service";

const ProfileAdmin = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.getUser(userId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!user) {
    return ;
  }

  return (
    <div className="card card-container">
      <p>
        <strong>Ime: </strong> {user.name}
      </p>
      <p>
        <strong>Prezime: </strong> {user.surname}
      </p>
      <p>
        <strong>Datum rođenja: </strong> {user.dateOfBirth}
      </p>
      <p>
        <strong>Spol: </strong> {user.gender}
      </p>
      <p>
        <strong>Adresa: </strong> {user.address}
      </p>
      <p>
        <strong>Krvna grupa: </strong> {user.bloodType}
      </p>
      <p>
        <strong>Rh faktor: </strong> {user.rhFactor}
      </p>
      <p>
        <strong>Broj mobitela: </strong> {user.phoneNumber}
      </p>
      <p>
        <strong>Email: </strong> {user.email}
      </p>
      <p>
        <strong>Korisničko ime: </strong> {user.username}
      </p>
      <button onClick={handleGoBack}>Natrag</button>
    </div>
    
  );
};

export default ProfileAdmin;
