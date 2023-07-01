import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user-service";
import "../assets/styles/boardAdmin.css";

const BloodTypesA = () => {
  const [usersAPlus, setUsersAPlus] = useState([]);
  const [usersAMinus, setUsersAMinus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoverIndex, setHoverIndex] = useState(-1);

  useEffect(() => {
    UserService.getUsers()
      .then((response) => {
        const allUsers = response.data;
        const usersAPlus = allUsers.filter((user) => user.bloodType === "A" && user.rhFactor === "+");
        const usersAMinus = allUsers.filter((user) => user.bloodType === "A" && user.rhFactor === "-");
        setUsersAPlus(usersAPlus);
        setUsersAMinus(usersAMinus);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsersAPlus = usersAPlus.filter((user) => {
    const name = user.name || "";
    const surname = user.surname || "";

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredUsersAMinus = usersAMinus.filter((user) => {
    const name = user.name || "";
    const surname = user.surname || "";

    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  return (
    <div>
      <div className="card card-container">
        <h2 className="list-heading">Svi darivatelji (A+)</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pretraži korisnika"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <ul className="user-list">
          {filteredUsersAPlus.map((user, index) => (
            <Link
              to={{ pathname:`/view-donation/${user.id}`, state: { userId: user.id } }}
              key={user.id}
              className={`user-list-item ${index === hoverIndex ? "active" : ""}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <li
                style={{
                  backgroundColor: index === hoverIndex ? "#e2efde" : "transparent",
                  padding: ".75rem",
                  verticalAlign: "top",
                  borderTop: "1px solid #dee2e6",
                }}
              >
                <span className="username">{user.name} {user.surname}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="card card-container">
        <h2 className="list-heading">Svi darivatelji (A-)</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Pretraži korisnika"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <ul className="user-list">
          {filteredUsersAMinus.map((user, index) => (
            <Link
              to={{ pathname:`/view-donation/${user.id}`, state: { userId: user.id } }}
              key={user.id}
              className={`user-list-item ${index === hoverIndex ? "active" : ""}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <li
                style={{
                  backgroundColor: index === hoverIndex ? "#e2efde" : "transparent",
                  padding: ".75rem",
                  verticalAlign: "top",
                  borderTop: "1px solid #dee2e6",
                }}
              >
                <span className="username">{user.name} {user.surname}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BloodTypesA;
