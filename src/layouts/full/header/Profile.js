import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItem ,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import { IconUser } from '@tabler/icons';

import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Logout } from 'src/redux/actions/authActions';



const Profile = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const LogoutHanlder = ()=>{
     dispatch(Logout())
     navigate('/')
     
  }
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const [restaurants, setRestaurants] = useState([]);
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

  const [restaurant, setRestaurant] = useState([])
  let idd:restaurants.id
  useEffect(() => {
      axios.get('http://localhost:8080/restaurant-configuration/restaurant/getRestaurantById/')
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
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={convertImage(restaurant.log)}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItem  component={Link} to="/profil">
          <ListItemText > My Profile</ListItemText>
       </ListItem>
        </MenuItem>
        
        <Box mt={1} py={1} px={2}>
          <Button variant="outlined" color="primary" onClick={LogoutHanlder} fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
