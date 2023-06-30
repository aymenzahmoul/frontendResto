import React, { useEffect, useState } from 'react'
import {  MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';

import axios from 'axios';
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}



const Command = () => {

  const [command, setCommand] = useState([]);

  const [commands, setCommands] = useState([]);
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

  


  useEffect(() => {
    axios.get(`http://localhost:8080/commande-resources/getAllCommandBy/${Restaurants.id}`)
    .then(response => {
      setCommands(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    
   }, [Restaurants.id]);
 
   
 




useEffect(() => {
    
  axios.get(`http://localhost:8080/commande-resources/command/getCommandeItems/${command.id}/items`)
    .then(response => {
      setCommands(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}, [command.id]);



  return (
<>
    <div role="presentation" onClick={handleClick}>
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center' }}
        color="inherit"
        href="/dashboard"
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
       dashbord
      </Link>
      <Link
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center' }}
        color="inherit"
        href="/orders"
      >
        <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Order
      </Link>
      <Typography
   
        sx={{ display: 'flex', alignItems: 'center' }}
        color="text.primary"
      >
        <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Order ID
      </Typography>
    </Breadcrumbs>
  </div>
    <MDBTable align='middle'>
 
    <MDBTableHead>
      <tr>
        
        <th scope='col'>Items</th>
        <th scope='col'>Quantity</th>
        <th scope='col'>total</th>
        <th scope='col'>total </th>
    
      </tr>
    </MDBTableHead>
    {commands.map((user, index) => (
      
    <MDBTableBody>
      <tr>
        <td>
          <div className='d-flex align-items-center'>
           
            <div className='ms-3'>

              <p className='fw-bold mb-1'>{user.id}</p>

              <p className='text-muted mb-0'></p>
            </div>
          </div>
        </td>
        <td>
         
          <p className='text-muted mb-0'>{user.qty}</p>
        </td>
        {command.map((users, index) => (
        <td>{users.total}</td>
        ))}
        {command.map((users, index) => (
        <td>{users.total+3.5}</td>
        ))}
        <td>
          <MDBBtn color='link' rounded size='sm'>
          {command.total}
          </MDBBtn>
        </td>
      </tr>
     
    </MDBTableBody>
      ))}
  </MDBTable>
  </>
  )
}

export default Command
