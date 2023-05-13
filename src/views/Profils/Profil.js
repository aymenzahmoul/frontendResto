import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';
import AjouteMap from './AjouteMap';


function Profil() {
let navigate = useNavigate();
const[log,setLog]=useState(null)
  const [user, setUser] = useState({
    name: "",
    address: "",
  });

  const { name, address } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setLog(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      address:address,
      log: log,
      userId: 3,
    };
    await axios.post("http://localhost:8080/restaurant-configuration/restaurant/create", data);
    navigate("/");
  };
  const [restaurant, setRestaurant] = useState([])
  useEffect(() => {
      axios.get('http://localhost:8080/restaurant-configuration/restaurant/getRestaurantById/${userId}')
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

    const [userId, setUserId] = useState('');

  useEffect(() => {
    // Retrieve the user ID from local storage or cookies
    const storedUserId = localStorage.getItem('userId');
  
    if (storedUserId) {
      setUserId(storedUserId);
      console.log(storedUserId);
    }
  }, []);
  return (
    <section style={{ backgroundColor: '#eee' }}>
    <MDBContainer className="py-5">
      

      <MDBRow>
        <MDBCol lg="4">
          <MDBCard className="mb-4">
            <MDBCardBody className="text-center">
              <MDBCardImage
                src={convertImage(restaurant.log)}
                alt="avatar"
                className="rounded-circle"
                style={{ width: '150px' }}
                fluid />
              <p className="text-muted mb-1"></p>
              <p className="text-muted mb-4"></p>
              <div className="d-flex justify-content-center mb-2">
              <Button component="label">
              <MDBCardText outline className="ms-1">modifier</MDBCardText>
              <input type="file" hidden  onChange={handleImageChange}/>
              </Button>
                
              </div>
            </MDBCardBody>
          </MDBCard>

          <MDBCard className="mb-4 mb-lg-0">
              <AjouteMap/>
            </MDBCard>
          
        </MDBCol>
        <MDBCol lg="8">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Full Name</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <input type="text" id="name" class="form-control" name='name'  value={name} onChange={onInputChange}  />
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Email</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                <input type="text" id="email" class="form-control"    />
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Phone</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                <input type="text" id="form12" class="form-control"  />
                </MDBCol>
              </MDBRow>
              <hr />
              
             
              <MDBRow>
                <MDBCol sm="3">
                  <MDBCardText>Address</MDBCardText>
                </MDBCol>
                <MDBCol sm="9">
                  <input type="text" id="address" class="form-control"  name='address'  value={address} onChange={onInputChange} />
                  
                </MDBCol>
              </MDBRow>
              <hr />
              <MDBRow>
              <MDBCol sm="9">
              <button type="button" class="btn btn-primary" onClick={onSubmit}>AjoutER</button>
              </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>

        
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </section>
  );
}

export default Profil;