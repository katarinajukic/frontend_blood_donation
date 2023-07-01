import React from "react";
import AuthService from "../services/auth-service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="card card-container">
      <p>
        <strong>Ime: </strong> {currentUser.name}
      </p>
      <p>
        <strong>Prezime: </strong> {currentUser.surname}
      </p>
      <p>
        <strong>Datum rođenja: </strong> {currentUser.dateOfBirth}
      </p>
      <p>
        <strong>Spol: </strong> {currentUser.gender}
      </p>
      <p>
        <strong>Adresa: </strong> {currentUser.address}
      </p>
      <p>
        <strong>Krvna grupa: </strong> {currentUser.bloodType}
      </p>
      <p>
        <strong>Rh faktor: </strong> {currentUser.rhFactor}
      </p>
      <p>
        <strong>Broj mobitela: </strong> {currentUser.phoneNumber}
      </p>
      <p>
        <strong>Email: </strong> {currentUser.email}
      </p>
      <p>
        <strong>Korisničko ime: </strong> {currentUser.username}
      </p>
    </div>
  );
};

export default Profile;