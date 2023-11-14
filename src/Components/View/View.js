import React,{ useEffect, useState, useContext } from 'react';
import './View.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
function View() {

  const {firebase} = useContext(FirebaseContext)
  const {postDetails} = useContext(PostContext)
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    const {userId} = postDetails
    firebase.firestore().collection('users').where('id','==',userId).get().then((res) => {
      res.forEach(doc => {
        setUserDetail(doc.data())
      });
    })
  })
  
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.date}</span>
        </div>k
        { userDetail && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetail.username}</p>
          <p>{userDetail.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
