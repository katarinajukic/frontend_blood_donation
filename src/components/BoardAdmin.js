import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user-service";
import "../assets/styles/boardAdmin.css";

const BoardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoverIndex, setHoverIndex] = useState(-1);

  useEffect(() => {
    UserService.getUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const isUser = user.roles.some(role => role.name === "ROLE_USER");
    const name = user.name || "";
    const surname = user.surname || "";
    
    return (
      isUser &&
      (name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surname.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(-1);
  };

  return (
    <div className="card card-container">
      <h2 className="list-heading">Svi darivatelji</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pretraži korisnika"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul className="user-list">
        {filteredUsers.map((user, index) => (
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
  );
};

export default BoardAdmin;
