import React,{ useState, useContext,  } from 'react';
import { useNavigate } from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';

export default function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const {firebase} = useContext(FirebaseContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({displayName: username})
          .then(() => {
            firebase.firestore().collection('users').add({
              id:result.user.uid,
              username: username,
              phone: phone
            }).then(() => {
              navigate('/login');
            })
          })
      })
      
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}  alt='signup'></img>
        <form onSubmit = {handleSubmit} >
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e)=>{
              setUsername(e.target.value)
            }}
            defaultValue="John"
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
            }}
            defaultValue="Doe"
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
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
