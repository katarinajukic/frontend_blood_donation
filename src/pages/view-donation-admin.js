import React, { useState, useEffect } from "react";
import DonationDataService from "../services/donation-service";
import "../assets/styles/viewDonation.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import UserService from "../services/user-service";

const ViewDonationAdmin = () => {
  const [donations, setDonations] = useState([]);
  const [currentDonation, setCurrentDonation] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [user, setUser] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    retrieveDonations(userId);
    fetchUser(userId);
  }, [userId]);

  const fetchUser = (userId) => {
    UserService.getUser(userId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const retrieveDonations = (userId) => {
    DonationDataService.getAll(userId)
      .then((response) => {
        let sortedDonations;
        if (Array.isArray(response.data)) {
          sortedDonations = response.data.sort(
            (a, b) => a.ordinalNumber - b.ordinalNumber
          );
        } else {
          sortedDonations = [];
        }
        setDonations(sortedDonations);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveDonation = (donation, index) => {
    setCurrentDonation(donation);
    setCurrentIndex(index);
  };

  const removeDonation = (id) => {
    DonationDataService.delete(id)
      .then((response) => {
        setDonations((prevDonations) =>
          prevDonations.filter((donation) => donation.id !== id)
        );
        setCurrentDonation(null);
        setCurrentIndex(-1);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  return (
    <div className="list row">
      <div className="card card-container">
          <h4 className="underline" style={{ textAlign: "center", fontSize: "24px" }}>
            Lista donacija
          </h4>
      {user && user.name && user.surname && (
          <h5 className="underline" style={{ textAlign: "center", fontSize: "20px" }}>
            {user.name} {user.surname}
          </h5>
        )}
        <table className="table">
          <thead>
            <tr>
              <th className="ordinal-number">Rd. broj</th>
              <th>Datum darivanja</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr
                key={index}
                className={index === currentIndex ? "active" : ""}
                onClick={() => setActiveDonation(donation, index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{
                  backgroundColor: index === hoverIndex ? "#e2efde" : "transparent",
                }}
              >
                <td style={{ textAlign: "center", fontWeight: "bold", color: "#e63946" }}>
                  {donation.ordinalNumber}
                </td>
                <td style={{ textAlign: "center" }}>{new Date(donation.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="card-footer">
            <Link to={{ pathname:`/profile/${userId}`, state: { userId: userId } }} className="btn btn-primary btn-block" style={{ backgroundColor: "#e63946" }}>Osobni podaci</Link>
            <Link to={{ pathname:`/add/${userId}`, state: { userId: userId } }} className="btn btn-primary btn-block" style={{ backgroundColor: "#e63946" }}>Dodaj darivanje</Link>
          </div>
      </div>
      <div className="card card-container" style={{ height: "100%" }}>
        {currentDonation ? (
          <div>
            <h4 style={{ textAlign: "center", fontSize: "24px" }}>Detalji</h4>
            <div>
              <label>
                <strong className="ordinal-number">Rd. broj:</strong>
              </label>{" "}
              {currentDonation.ordinalNumber}
            </div>
            <div>
              <label>
                <strong>Datum darivanja:</strong>{" "}
                {new Date(currentDonation.date).toLocaleDateString()}
              </label>{" "}
            </div>
            <div>
              <label>
                <strong>Problemi nakon darivanja:</strong>
              </label>{" "}
              {currentDonation.problems}
            </div>

            <button
              className="badge badge-danger"
              style={{ backgroundColor: "#e63946", color: "#ffffff", padding: "7px", border: "none" }}
              onClick={() => removeDonation(currentDonation.id)}
            >
              Obriši
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p style={{ fontWeight: "bold" }}>Kliknite na darivanje...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDonationAdmin;
