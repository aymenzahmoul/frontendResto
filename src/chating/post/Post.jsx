import "./post.css";


import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { IconX } from "@tabler/icons";

import { useNavigate, useParams } from "react-router";

export default function Post({ post }) {
  const [like,setLike] = useState(post.like)
  const [isLiked,setIsLiked] = useState(false)
  ;
  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/post-configuration/post/GetAllPost')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  let navigate = useNavigate();
  const convertImage = (base64Image) => {
    return  base64Image;
  };
  const { id } = useParams()
  const deletePost = async (id) => {
    await axios.delete(`http://localhost:8080/post-configuration/post/removePost/${id}`);
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
  
   
  return (<>
    {posts.map((p) => (
    <div className="post">
       
    <div className="postWrapper">
      <div className="postTop">
        <div className="postTopLeft">
          <img
            className="postProfileImg"
            src={convertImage(restaurant.log)}
            alt=""
          />
          <span className="postUsername">
            {restaurant.name}
          </span>
          <span className="postDate">{post.date}</span>
        </div>
        <div className="postTopRight">
          <MoreVert />
        <IconX onClick={() => deletePost(p.id)}/>
        </div>
      </div>
      <div className="postCenter">
        <span className="postText">{p.desc}</span>
        <img  className="w-100"style={{ width: '400px', height: '500px' }} src={convertImage(p.image)} alt="" />
      </div>
      <div className="postBottom">
        <div className="postBottomLeft">
         
          <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
          <span className="postLikeCounter">{like} people like it</span>
        </div>
        <div className="postBottomRight">
          <span className="postCommentText">{post.comment} comments</span>
        </div>
      </div>
    </div>
   
  </div>
   ))}
   </>
  );
}
