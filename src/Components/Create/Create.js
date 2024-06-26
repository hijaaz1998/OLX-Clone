import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

const Create = () => {

  console.log("rendering create");

  const navigate = useNavigate()
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const date = new Date()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !category || !price || !image) {
      setError('All fields are required');
  
      setTimeout(() => {
        setError('');
      }, 3000);
  
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Price must be a positive number');

      setTimeout(() => {
        setError('');
      }, 3000);

      return;
    }

    firebase.storage().ref(`/images/${image.name}`).put(image)
      .then( ({ref}) => {
        ref.getDownloadURL()
          .then( (url) => {
            firebase.firestore().collection('products').add({
              name,
              category,
              price,
              url,
              userId: user.uid,
              date: date.toDateString()
            })
            navigate('/');
          } )
      } )
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
              }}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value)
              }}
            />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={
              image? URL.createObjectURL(image) : ''
          }></img>
          <form>
            <br />
            <input onChange={(e) => {
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
