import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Login() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:3001';

  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const clickRegister = async (event) => {
    event.preventDefault();

    const form = { email, password };
    const result = await Axios.post(baseUrl + '/register', form);
    alert(result.data.msg);
    limparFormulario();
  }

  const limparFormulario = () => {
    setEmail('');
    setPassword('');
  }

  const clickLogin = async (event) => {


    event.preventDefault();


    const form = { emailLogin, passwordLogin };
    const result = await Axios.post(baseUrl + '/login', form);
    alert(result.data.msg);
    limparFormulario();

    if (result.data.ok) {
      navigate('/produto');
    }
  }

  return (
    <div>
      <div className="container">
        <h1 className="form-cadastro">CADASTRO</h1>
        <form onSubmit={clickRegister}>
          <label>Email:</label>
          <input type="text" name="email" className="form-field" value={email} onChange={(event) => setEmail(event.target.value)} />
          <div>
            <label>Senha:</label>
            <input type="password" name="password" className="form-field" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div><br />
          <button type="submit" className="button">Cadastrar</button>
        </form>
      </div>
      <div>
        <div className="container">
          <form onSubmit={clickLogin}>
            <div>
              <h1 className="form-login">LOGIN</h1>
              <label>Email:</label>
              <input type="text" name="email-login" className="form-field" value={emailLogin} onChange={(event) => setEmailLogin(event.target.value)} />
            </div>
            <div>
              <label>Senha:</label>
              <input type="password" name="password-login" className="form-field" value={passwordLogin} onChange={(event) => setPasswordLogin(event.target.value)} />
            </div><br />
            <button type="submit" className="button">Entrar</button>
          </form>
        </div>
      </div>
      <div>
      </div>
    </div >

  )
};

export default Login;