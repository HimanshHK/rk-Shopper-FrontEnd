import React, { useState,useEffect } from "react";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";
import { hostUrl } from "../host";
import Cookies from 'js-cookie'

const LoginForm = () => {
  const history = useHistory();
  const [pic, changePic] = useState(0);
  const [yeti, changeYeti] = useState(1);
  const [email, ChangeEmail] = useState("");
  const [password, ChangePassword] = useState("");
  const [login, setLogin] = useState(true);
  const [registerForm, changeRegisterForm] = useState({
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    pincode: "",
    type: "",
  });

  const [LoginForm,changeLoginForm]=useState({
    email:"",
    password:""
  });

  const currFrame = `/yeti${yeti}/ezgif-frame-${(pic + 1)
    .toString()
    .padStart(3, "0")}.jpg`;


  useEffect(()=>{
    const token=Cookies.get('himanshukatoken');
    console.log(token);
  },[])


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in registerForm) {
      formData.append(key.toString(), registerForm[key]);
    }

    console.log(formData);

    fetch(`${hostUrl}/api/users`, {
      method: "POST",
      body: formData,
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    }
    )
    .catch((err) => console.log(err));

    history.push("/");
  };

  

  const handleLoginChange = (e) => {
    e.preventDefault();

    //yeti bhai ka code
    if (e.target.name === "email") {
      changeYeti(1);
      ChangeEmail(e.target.value);
      if (email.length / 3 >= 21);
      else if (email.length % 3 === 0) changePic(email.length / 3);
    } else {
      changeYeti(2);
      ChangePassword(e.target.value);
      if (password.length === 0) changePic(0);
      else if (pic >= 3) changePic(3);
      else if (password.length >= 0) changePic(pic + 1);
    }

    changeLoginForm({...LoginForm,[e.target.name]:e.target.value});
    console.log(LoginForm);
  };


  const handleRadioChange = (e, type) => {
    e.preventDefault();
    changeRegisterForm({ ...registerForm, type: type });
  };

  const handleChangeRegister = (e) => {
    e.preventDefault();

    const { name, value, files } = e.target;
    const updatedForm = { ...registerForm };

    // Handle file input separately
    if (name === "profile-pic") {
      updatedForm[name] = files[0];
    } else {
      updatedForm[name] = value;
    }

    changeRegisterForm(updatedForm);
    console.log(updatedForm);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Hello");
    const formData = new FormData();
    console.log(LoginForm)

    for (const key in LoginForm) {
      formData.append(key.toString(), LoginForm[key]);
    }

    console.log(formData);

    fetch(`${hostUrl}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(LoginForm),
    })

    .then((res) => res.json())
    .then((data) => {
      Cookies.set('shopperWebToken', data.token, { expires: 1 });
      const token=Cookies.get('shopperWebToken');
      // console.log(token);
      alert(token);
    }
    ).catch((err) => console.log(err));


  }



  if (login === true) {
    return (
      <div className="container-hklogin">
        <div className="content-hklogin">
          <div className="login-yeti">
            <img
              src={process.env.PUBLIC_URL + currFrame}
              alt="My Image"
              className="yeti-image"
            />
          </div>
          <form className="content__form-hklogin">
            <div className="content__inputs-hklogin">
              <label>
                <input
                  required
                  type="text"
                  name="email"
                  value={LoginForm.email}
                  onChange={handleLoginChange}
                  autoComplete="off"
                />
                <span>Phone number, username, or email</span>
              </label>
              <label>
                <input
                  required
                  type="password"
                  name="password"
                  value={LoginForm.password}
                  onChange={handleLoginChange}
                />
                <span>Password</span>
              </label>
            </div>
            <button type="submit" onClick={handleLoginSubmit}>Log In</button>
          </form>
          <div className="content__or-text-hklogin">
            <span></span>
            <span>OR</span>
            <span></span>
          </div>
          <div className="content__forgot-buttons-hklogin">
            <button>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  x="0"
                  y="0"
                  width="512"
                  height="512"
                  viewBox="0 0 408.788 408.788"
                  xmlSpace="preserve"
                  style={{ enableBackground: "new 0 0 512 512" }}
                >
                  <g>
                    <path
                      fill="#475993"
                      d="M353.701 0H55.087C24.665 0 .002 24.662.002 55.085v298.616c0 30.423 24.662 55.085 55.085 55.085h147.275l.251-146.078h-37.951a8.954 8.954 0 0 1-8.954-8.92l-.182-47.087a8.955 8.955 0 0 1 8.955-8.989h37.882v-45.498c0-52.8 32.247-81.55 79.348-81.55h38.65a8.955 8.955 0 0 1 8.955 8.955v39.704a8.955 8.955 0 0 1-8.95 8.955l-23.719.011c-25.615 0-30.575 12.172-30.575 30.035v39.389h56.285c5.363 0 9.524 4.683 8.892 10.009l-5.581 47.087a8.955 8.955 0 0 1-8.892 7.901h-50.453l-.251 146.078h87.631c30.422 0 55.084-24.662 55.084-55.084V55.085C408.786 24.662 384.124 0 353.701 0z"
                    ></path>
                  </g>
                </svg>
              </span>
              <span>Log in with Facebook</span>
            </button>
            <button onClick={() => setLogin(false)}>
              Don't have an account?
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-hklogin">
        <div className="content-hklogin">
          <form onSubmit={handleSubmit}>
            <div className="content__form-hklogin">
              <div className="content__inputs-hklogin">
                {/* Existing form inputs */}
                <label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={registerForm.name}
                    onChange={handleChangeRegister}
                  />
                  <span>Name</span>
                </label>
                <label>
                  <input
                    required
                    type="text"
                    name="email"
                    value={registerForm.email}
                    onChange={handleChangeRegister}
                  />
                  <span>Email</span>
                </label>
                <label>
                  <input
                    required
                    type="text"
                    name="mobile"
                    value={registerForm.mobile}
                    onChange={handleChangeRegister}
                  />
                  <span>Mobile</span>
                </label>
                <label>
                  <input
                    required
                    type="text"
                    name="address"
                    value={registerForm.address}
                    onChange={handleChangeRegister}
                  />
                  <span>Address</span>
                </label>
                <label>
                  <input
                    required
                    type="text"
                    name="pincode"
                    value={registerForm.pincode}
                    onChange={handleChangeRegister}
                  />
                  <span>Pincode</span>
                </label>

                {/* File input */}
                <label>
                  <input
                    required
                    type="file"
                    name="profile-pic"
                    className="file-sign-hk"
                    onChange={handleChangeRegister}
                  />
                </label>
                
                
                
                {/* Existing form inputs */}
                <label>
                  <input
                    required
                    type="password"
                    name="password"
                    value={registerForm.password}
                    onChange={handleChangeRegister}
                  />
                  <span>Password</span>
                </label>
                <label>
                  <input
                    required
                    type="password"
                    name="confirmPassword"
                    value={registerForm.confirmPassword}
                    onChange={handleChangeRegister}
                  />
                  <span>Confirm Password</span>
                </label>
              </div>
            </div>

            {/*radio buttons*/}
            <div
              className="radio-inputs-hk-login-remember"
              onChange={handleChangeRegister}
            >
              <div
                onClick={(e) => {
                  handleRadioChange(e, "buyer");
                }}
              >
                <label>
                  <input
                    className="radio-input-hk-login-remember"
                    type="radio"
                    name="engine-hk-login-remember"
                    value="buyer"
                  />
                  <span
                    className="radio-tile-hk-login-remember"
                    name="buyer"
                    style={
                      registerForm.type === "buyer"
                        ? {
                            borderColor: "#2260ff",
                            boxShadow:
                              "0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc",
                          }
                        : {}
                    }
                  >
                    <span className="radio-icon-hk-login-remember">
                      <img src="https://img.freepik.com/premium-vector/illustration-young-guy-with-purchases_15870-281.jpg" />
                    </span>
                    <span className="radio-label-hk-login-remember">Buyer</span>
                  </span>
                </label>
              </div>

              <div
                onClick={(e) => {
                  handleRadioChange(e, "seller");
                }}
              >
                <label>
                  <input
                    className="radio-input-hk-login-remember"
                    type="radio"
                    name="engine-hk-login-remember"
                    value="seller"
                  />
                  <span
                    className="radio-tile-hk-login-remember"
                    name="seller"
                    style={
                      registerForm.type === "seller"
                        ? {
                            borderColor: "#2260ff",
                            boxShadow:
                              "0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc",
                          }
                        : {}
                    }
                  >
                    <span className="radio-icon-hk-login-remember">
                      <img src="https://img.freepik.com/premium-vector/chief-cook_96037-10.jpg" />
                    </span>
                    <span className="radio-label-hk-login-remember">
                      Seller
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="content__form-hklogin">
              <div className="content__inputs-hklogin">
                <button type="submit">Sign Up</button>
              </div>
            </div>
          </form>
          <div className="content__or-text-hklogin">
            <span></span>
            <span>OR</span>
            <span></span>
          </div>
          <div className="content__forgot-buttons-hklogin">
            <button onClick={() => setLogin(true)}>Back to Login</button>
          </div>
        </div>
      </div>
    );
  }
};

export default LoginForm;
