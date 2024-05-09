import React,{ useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context'
import Logo from '../../olx-logo.png';
import { useNavigate } from 'react-router-dom'
import './Login.css';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const { firebase } = useContext(FirebaseContext)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setErr('Email and password are required');
      setTimeout(() => {
        setErr('');
      }, 3000);

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setErr('Invalid email address');
      return;
    }

    if (!password.trim() || password.length < 6) {
      setErr('Password must be at least 6 characters');
      return;
    }


    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate('/');
      }).catch((error) => {
        alert(error.message);
      })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        {err && <p style={{ color: 'red' }}>{err}</p>}
        <a onClick={(() => navigate('/signup'))} >Signup</a>
      </div>
    </div>
  );
}

export default Login;
