import React from 'react';
import axios from "axios";
import  { useEffect,useState } from "react";
import {  MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import DashboardCard from '../../components/shared/DashboardCard';


  export default function Contact() {
    const [contact, setContact] = useState([]);

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
    
      axios.get(`http://localhost:8080/Contact-management/restaurant/${Restaurants.id}`)
        .then(response => {
          setContact(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, [Restaurants.id]);
  
 
    
  

    

  return (<>
    
  <br></br>
    <DashboardCard title="Contact">
        <MDBTable align='middle'>
          <MDBTableHead>
            <tr>
            <th scope='col'> num</th>
              <th scope='col'>Name</th>
              <th scope='col'>email</th>
              <th scope='col'>message</th>
          
              <th scope='col'>action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
  {contact.map((contactItem) => (
    <tr key={contactItem.id}>
      <td>
        <div className="d-flex align-items-center">
          <div className="ms-3">
            <p className="fw-bold mb-1">{contactItem.id}</p>
          </div>
        </div>
      </td>
      <td>{contactItem.firstName}</td>
      <td>
        <p className="text-muted mb-0">{contactItem.email}</p>
      </td>
      <td>{contactItem.message}</td>
      <td>
        <MDBBtn color="danger" rounded size="sm">
          Delete
        </MDBBtn>
      </td>
    </tr>
  ))}
</MDBTableBody>
        </MDBTable>

</DashboardCard>
</>
  );
};