import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  return (
    <div className="outContainer">
      <div className="inputContainer">
        <h1 className="heading">Sohbete Giriş</h1>
        <input className="input m-tb-5" type="text" placeholder="Adınız" onChange={(event) => setName(event.target.value)} />
        <input className="input m-tb-5" type="text" placeholder="Soyadınız" onChange={(event) => setSurname(event.target.value)} />
        <input className="input m-tb-5" type="text" placeholder="E-posta adresiniz" onChange={(event) => setEmail(event.target.value)} />
        <input className="input m-tb-5" type="text" placeholder="Konu başlığı" onChange={(event) => setTitle(event.target.value)} />
        <Link onClick={(event) => (!name || !surname || !email || !title ? event.preventDefault() : null)} to={`/chat?name=${name}&surname=${surname}&email=${email}&title=${title}`}>
          <button className="button mt-10">
            <b>Sohbeti Başlat</b>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
