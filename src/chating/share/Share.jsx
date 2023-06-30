import {  PermMedia } from "@mui/icons-material";
import "./share.css";
import { useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";
import { useEffect } from "react";
export default function Share() {
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  
  let navigate = useNavigate();

  const handleNameChange = (event) => {
    setDesc(event.target.value);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();




    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      desc: desc,
      image: image,
      restaurantId:Restaurants.id,
    };
    axios.post('http://localhost:8080/post-configuration/post/createPost', data)
    window.location.reload(true);
  };
  const [restaurant, setRestaurant] = useState([])
  useEffect(() => {
      axios.get('http://localhost:8080/restaurant-configuration/restaurant/getRestaurantById/',Restaurants.id)
        .then(response => {
          setRestaurant(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    const convertImage = (base64Image) => {
      return base64Image;
    };
    const [Restaurants, setRestaurants] = useState('');
    useEffect(() => {
      const userId = localStorage.getItem('userId');
      axios
        .get(`http://localhost:8080/restaurant-configuration/restaurant/getRestaurantIdByUserId/${userId}`)
        .then(response => {
          setRestaurants(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);


  return (
    <form  > 
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={convertImage(Restaurants.log2)} alt="" />
          <input   className="shareInput"id="desc" name="desc" value={desc} onChange={handleNameChange}/>
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <Button  component="label">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <input type="file" hidden   id="image" onChange={handleImageChange}/>
                    <span className="shareOptionText" color="black"> Photo </span>
                </Button>
              
               
            </div>
            <button className="shareButton" onClick={handleSubmit}>Share</button>
        </div>
      </div>
    </div>
    </form>
  );
}
