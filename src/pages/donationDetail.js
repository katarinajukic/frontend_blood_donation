import React, { Component } from "react";
import DonationDataService from "../services/donation-service";
import { withRouter } from '../common/with-router';

class Donation extends Component {
  constructor(props) {
    super(props);
    this.onChangeOrdinalNumber = this.onChangeOrdinalNumber.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeProblems = this.onChangeProblems.bind(this);
    this.getDonation = this.getDonation.bind(this);
    this.updateDonation = this.updateDonation.bind(this);
    this.deleteDonation = this.deleteDonation.bind(this);

    this.state = {
      currentDonation: {
        id: null,
        ordinalNumber: "",
        date: "",
        problems: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
        this.getDonation(this.props.match.params.id);
      }
    }

  onChangeOrdinalNumber(e) {
    const ordinalNumber = e.target.value;

    this.setState(prevState => ({
      currentDonation: {
        ...prevState.currentDonation,
        ordinalNumber: ordinalNumber
      }
    }));
  }

  onChangeDate(e) {
    const date = e.target.value;
    
    this.setState(prevState => ({
      currentDonation: {
        ...prevState.currentDonation,
        date: date
      }
    }));
  }

  onChangeProblems(e) {
    const problems = e.target.value;
    
    this.setState(prevState => ({
      currentDonation: {
        ...prevState.currentDonation,
        problems: problems
      }
    }));
  }

  getDonation(id) {
    DonationDataService.get(id)
      .then(response => {
        this.setState({
          currentDonation: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateDonation() {
    DonationDataService.update(
      this.state.currentDonation.id,
      this.state.currentDonation
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The donation was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteDonation() {
    const isAdmin = true;
    if (!isAdmin) {
      return;
    }

    DonationDataService.delete(this.state.currentDonation.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/donations');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentDonation } = this.state;

    return (
      <div>
        {currentDonation ? (
          <div className="edit-form">
            <h4>Donation</h4>
            <form>
              <div className="form-group">
                <label htmlFor="ordinalNumber">Ordinal Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="ordinalNumber"
                  value={currentDonation.ordinalNumber}
                  onChange={this.onChangeOrdinalNumber}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="text"
                  className="form-control"
                  id="date"
                  value={currentDonation.date}
                  onChange={this.onChangeDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor="problems">Problems</label>
                <input
                  type="text"
                  className="form-control"
                  id="problems"
                  value={currentDonation.problems}
                  onChange={this.onChangeProblems}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteDonation}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateDonation}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Donation...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Donation);
