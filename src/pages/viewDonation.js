import React, { Component } from "react";
import DonationDataService from "../services/donation-service";
import "../assets/styles/viewDonation.css";
import AuthService from "../services/auth-service";

export default class ViewDonation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donations: [],
      currentDonation: null,
      hoverIndex: -1,
      currentIndex: -1,
      searchTitle: "",
      user: null
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({ user }, () => {
        this.retrieveDonations();
      });
    } else {
      this.props.history.push("/login");
    }
  }

  retrieveDonations() {
    DonationDataService.getAll(this.state.user.id)
      .then(response => {
        const sortedDonations = response.data.sort((a, b) => a.ordinalNumber - b.ordinalNumber);
        this.setState({
          donations: sortedDonations
        });
        console.log(sortedDonations);
      })
      .catch(e => {
        console.log(e);
      });
  }
  

  setActiveDonation(donation, index) {
    this.setState({
      currentDonation: donation,
      currentIndex: index
    });
  }



  handleMouseEnter(index) {
    this.setState({ hoverIndex: index });
  }

  handleMouseLeave() {
    this.setState({ hoverIndex: -1 });
  }
  
  render() {
    const { donations, currentDonation, currentIndex, hoverIndex } = this.state;

    return (
      <div className="list row">
        <div className="card card-container">
          <h4 style={{ textAlign: "center", fontSize: "24px"}}>Lista donacija</h4>
          <table className="table">
            <thead>
              <tr>
                <th className="ordinal-number">Rd. broj</th>
                <th>Datum darivanja</th>
              </tr>
            </thead>
            <tbody>
              {donations &&
                donations.map((donation, index) => (
                  <tr
                    key={index}
                    className={index === currentIndex ? "active" : ""}
                    onClick={() => this.setActiveDonation(donation, index)}
                    onMouseEnter={() => this.handleMouseEnter(index)}
                    onMouseLeave={() => this.handleMouseLeave()}
                    style={{
                      backgroundColor: index === hoverIndex ? "#e2efde" : "transparent",
                    }}
                  >
                    <td style={{ textAlign: "center", fontWeight: "bold", color:"#e63946"}}>{donation.ordinalNumber}</td>
                    <td style={{ textAlign: "center"}}>{new Date(donation.date).toLocaleDateString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="card card-container"
        style={{ height: "100%"}}>
          {currentDonation ? (
            <div>
              <h4 style={{ textAlign: "center", fontSize: "24px"}}>Detalji</h4>
              <div>
                <label>
                  <strong className="ordinal-number">Rd. broj:</strong>
                </label>{" "}
                {currentDonation.ordinalNumber}
              </div>
              <div>
                <label>
                  <strong>Datum darivanja:</strong> {new Date(currentDonation.date).toLocaleDateString()}
                </label>{" "}
              </div>
              <div>
                <label>
                  <strong>Problemi nakon darivanja:</strong>
                </label>{" "}
                {currentDonation.problems}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p style={{fontWeight: "bold"}}>Kliknite na darivanje...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
