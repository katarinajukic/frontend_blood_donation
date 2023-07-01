import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth-service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        Morate ispuniti ovo polje!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        Upišite ispravan email.
      </div>
    );
  }
};




const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="invalid-feedback d-block">
        Korisničko ime mora imati više od 3 slova.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        Lozinka mora imati više od 6 slova.
      </div>
    );
  }
};

const vname = (value) => {
  if (value.length < 2 || value.length > 50) {
    return (
      <div className="invalid-feedback d-block">
        Ime mora imati više od 2 slova.
      </div>
    );
  }
};

const vsurname = (value) => {
  if (value.length < 2 || value.length > 50) {
    return (
      <div className="invalid-feedback d-block">
        Prezime mora imati više od 2 slova.
      </div>
    );
  }
};

const vgender = (value) => {
  if ( value !== "M" && value !== "Ž") {
    return (
      <div className="invalid-feedback d-block">
        Molim vas odaberite ispravan spol.
      </div>
    );
  }
};

const vphoneNumber = (value) => {
  if (!/^[0-9]+$/.test(value) || value.length < 7 || value.length > 15) {
    return (
      <div className="invalid-feedback d-block">
        Molim vas odaberite ispravan broj mobitela.
      </div>
    );
  }
};

const vdateOfBirth = (value) => {
  const dateOfBirth = new Date(value);
  const currentDate = new Date();

  if (dateOfBirth > currentDate) {
    return (
      <div className="invalid-feedback d-block">
        Molim vas upišite ispravan datum rođenja.
      </div>
    );
  }
};

const vaddress = (value) => {
  if (value.length < 10 || value.length > 200) {
    return (
      <div className="invalid-feedback d-block">
        Adresa mora imati više od 2 slova.
      </div>
    );
  }
};

const vbloodType = (value) => {
  if (!["O", "A", "B", "AB"].includes(value)) {
    return (
      <div className="invalid-feedback d-block">
        Molim vas odaberite točnu krvnu grupu.
      </div>
    );
  }
};


const vrhFactor = (value) => {
  if (value !== "-" && value !== "+") {
    return (
      <div className="invalid-feedback d-block">
        Molim vas odaberite točan rh faktor.
      </div>
    );
  }
};


const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [rhFactor, setRhfactor] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);


  const [genderTouched, setGenderTouched] = useState(false);
  const [bloodTypeTouched, setBloodTypeTouched] = useState(false);
  const [rhFactorTouched, setRhFactorTouched] = useState(false);

  const onChangeConsent = (e) => {
    const isChecked = e.target.checked;
    setConsent(isChecked);
    setConsentError(false);
  };
  

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeGender = (e) => {
    const gender = e.target.value;
    setGender(gender);
  };

  const onBlurGender = () => {
    setGenderTouched(true);
  };
  
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  
  const onChangeSurname = (e) => {
    const surname = e.target.value;
    setSurname(surname);
  };
  
  const onChangeAddress = (e) => {
    const address = e.target.value;
    setAddress(address);
  };

  const onChangeDateOfBirth = (e) => {
    const dateOfBirth = e.target.value;
    setDateOfBirth(dateOfBirth);
  };
  
  const onChangeRhfactor = (e) => {
    const rhFactor = e.target.value;
    setRhfactor(rhFactor);
  };

  const onBlurRhFactor = () => {
    setRhFactorTouched(true);
  };
  
  const onChangeBloodType = (e) => {
    const bloodType = e.target.value;
    setBloodType(bloodType);
  };

  const onBlurBloodType = () => {
    setBloodTypeTouched(true);
  };
  
  const onChangePhoneNumber = (e) => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    
    setSuccessful(false);

    form.current.validateAll();

    if (!consent) {
      setConsentError(true);
      return;
    }

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, name,surname,gender,dateOfBirth,phoneNumber,address,bloodType,rhFactor,consent).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Korisničko ime</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Lozinka</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Ime</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required, vname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="surname">Prezime</label>
                <Input
                  type="text"
                  className="form-control"
                  name="surname"
                  value={surname}
                  onChange={onChangeSurname}
                  validations={[required, vsurname]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Broj mobitela</label>
                <Input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChangePhoneNumber}
                  validations={[required, vphoneNumber]}
                />
              </div>

              <div className="form-group">
              <label htmlFor="gender">Spol</label>
              <select 
                className={`form-control ${genderTouched && vgender(gender) ? 'is-invalid' : ''}`}
                name="gender"
                value={gender}
                onChange={onChangeGender}
                onBlur={onBlurGender}
              >
                <option value=""></option>
                <option value="M">M</option>
                <option value="Ž">Ž</option>
              </select>
              {genderTouched && vgender(gender)}
            </div>

            <div className="form-group">
                <label htmlFor="dateOfBirth">Datum rođenja (dan.mjesec.godina.)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="dateOfBirth"
                  value={dateOfBirth}
                  onChange={onChangeDateOfBirth}
                  validations={[required, vdateOfBirth]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="address">Adresa (Ulica broj, Grad)</label>
                <Input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={onChangeAddress}
                  validations={[required, vaddress]}
                />
              </div>

              <div className="form-group">
              <label htmlFor="bloodType">Krvna grupa</label>
              <select 
                className={`form-control ${bloodTypeTouched && vbloodType(bloodType) ? 'is-invalid' : ''}`}
                name="bloodType"
                value={bloodType}
                onChange={onChangeBloodType}
                onBlur={onBlurBloodType}
              >
                <option value=""></option>
                <option value="O">O</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
              </select>
              {bloodTypeTouched && vbloodType(bloodType)}
              </div>

              <div className="form-group">
              <label htmlFor="rhFactor">Rh faktor</label>
              <select 
                className={`form-control ${rhFactorTouched && vrhFactor(rhFactor) ? 'is-invalid' : ''}`}
                name="rhFactor"
                value={rhFactor}
                onChange={onChangeRhfactor}
                onBlur={onBlurRhFactor}
              >
                <option value=""></option>
                <option value="-">-(neg)</option>
                <option value="+">+(poz)</option>
              </select>
              {rhFactorTouched && vrhFactor(rhFactor)}
              </div>
              <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="consent"
                  checked={consent}
                  onChange={onChangeConsent}
                />{" "}
                Prihvaćam dijeliti svoje informacije s bolničkim institucijama.
              </label>
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" style={{ backgroundColor: 'black' }}>Registriraj se</button>
              </div>
              {consentError && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                  Morate prihvatiti kako biste se registrirali.
                  </div>
                </div>
              )}
            </div>
            
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;