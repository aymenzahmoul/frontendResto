import { EmojiEmotions, PermMedia, Room } from "@mui/icons-material";
import "./share.css";

import react,{ useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";
import { useEffect } from "react";
export default function Share() {
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const[posts,setPosts]=useState({
    desc:'',
    image:'',
    restaurantId:'',
  });
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
      restaurantId:1,
    };
    axios.post('http://localhost:8080/post-configuration/post/createPost', data)
    navigate("/");
  };
  const [restaurant, setRestaurant] = useState([])
  useEffect(() => {
      axios.get('http://localhost:8080/restaurant-configuration/restaurant/getRestaurantById/1')
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

  return (
    <form  > 
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={convertImage(restaurant.log)} alt="" />
          <input   className="shareInput"id="desc" name="desc" value={desc} onChange={handleNameChange}/>
        </div>
        <hr className="shareHr"/>
        <div className="shareBottom">
            <div className="shareOptions">
                <Button  component="label">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <input type="file" hidden   id="image" onChange={handleImageChange}/>
                    <span className="shareOptionText" color="black"> Photo or Video</span>
                </Button>
              
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" onClick={handleSubmit}>Share</button>
        </div>
      </div>
    </div>
    </form>
  );
}
