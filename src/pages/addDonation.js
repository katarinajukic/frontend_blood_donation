import React, { useState, useEffect } from "react";
import DonationDataService from "../services/donation-service";
import "../assets/styles/addDonation.css";
import { Link, useParams } from "react-router-dom";
import UserService from "../services/user-service";

const AddDonation = () => {
  const { userId } = useParams();
  const [ordinalNumber, setOrdinalNumber] = useState("");
  const [date, setDate] = useState("");
  const [problems, setProblems] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserService.getUser(userId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const saveDonation = () => {
    const data = {
      ordinalNumber,
      date,
      problems,
      userId,
    };


    DonationDataService.create(userId, data)
      .then((response) => {
        setOrdinalNumber(response.data.ordinalNumber);
        setDate(response.data.date);
        setProblems(response.data.problems);
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetForm = () => {
    setOrdinalNumber("");
    setDate("");
    setProblems("");
    setSubmitted(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="card card-container">
      {submitted ? (
        <div style={{ textAlign: "center" }}>
          <h4 style={{ padding: "10px" }}>Uspješno ste spremili darivanje!</h4>
          <button
            className="btn btn-primary btn-block"
            onClick={resetForm}
            style={{ backgroundColor: "#e63946" }}
          >
            <span>Dodaj sljedeću</span>
          </button>
          <Link
            to={`/view-donation/${userId}`}
            className="btn btn-primary btn-block"
            style={{ backgroundColor: "#e63946" }}
          >
            <span>Pregledaj sve</span>
          </Link>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="ordinalNumber">Redni broj</label>
            <input
              type="number"
              className="form-control"
              id="ordinalNumber"
              required
              value={ordinalNumber}
              onChange={(e) => setOrdinalNumber(e.target.value)}
              name="ordinalNumber"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Datum darivanja</label>
            <input
              type="date"
              className="form-control"
              id="date"
              required
              value={formatDate(date)}
              onChange={(e) => setDate(e.target.value)}
              name="date"
            />
          </div>

          <div className="form-group">
            <label htmlFor="problems">Problemi nakon darivanja (ako ima)</label>
            <textarea
              className="form-control"
              id="problems"
              required
              value={problems}
              onChange={(e) => setProblems(e.target.value)}
              name="problems"
            ></textarea>
          </div>
          <button
            className="btn btn-primary btn-block"
            onClick={saveDonation}
            style={{ backgroundColor: "#e63946" }}
          >
            <span>Dodaj</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AddDonation;
