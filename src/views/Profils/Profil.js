import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';

import axios from 'axios';



import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places']; // Specify any additional libraries you need

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 33.871891625042686,
  lng: 10.860368009704592,
};
function Profil() {
  const [users, setUsers] = useState([]);
  console.log(users)


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios
      .get(`http://localhost:8080/authentication-management/userInfo/${userId}`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  const [restaurant, setRestaurant] = useState([]);
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios
      .get(`http://localhost:8080/restaurant-configuration/restaurant/getRestaurantIdByUserId/${userId}`)
      .then(response => {
        setRestaurant(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  async function updateUserInfo2(userId, updateUserDto) {
    try {
      const response = await fetch(`http://localhost:8080/restaurant-configuration/restaurant/update/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateUserDto),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return { success: true, data };
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  }
  




  const handleUpdateProfile = () => {
    const userId = localStorage.getItem('userId');
    const updateUserDto = {
      id:restaurant.id,
      name: name,
      address: address,
      email: email,
      log:log,
      log2:log2,
      userId:userId,
      latitude:lats,
      longitude:lng,
      phone: phone,
    };

    updateUserInfo2(1, updateUserDto)
      .then(isUpdated => {
        if (isUpdated) {
          window.location.reload(true);
          console.log('User info updated successfully');
        } else {
          console.log('Failed to update user info');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const [log2, setLog2] = useState(null);
  const [log, setLog] = useState(null);
  const [user, setUser] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  const { name, address, email, phone } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const [restaurants, setRestaurants] = useState([]);
  const onInputChangee = (e) => {
    setRestaurants({ ...restaurants, [e.target.name]: e.target.value });
  };
  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setLog2(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setLog(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const convertImage = (base64Image) => {
    return  ""+base64Image;
  };
  const [lats, setLat] = useState('');
  const [lng, setLngs] = useState('');
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDF7JeM5j8kRhyt89EkIVgjlnVl2_wAZPE',
    libraries,
  });

  const [markerPosition, setMarkerPosition] = useState(center);

  if (loadError) {
    return <div>Error loading maps</div>;
  }



  const handleMapClicks = (event) => {
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    setLat( event.latLng.lng());
    setLngs(event.latLng.lng());
    console.log( event.latLng.lng());
    console.log(event.latLng.lng());
  };

  const handleMapClick = (event) => {
    const clickedLatLng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(clickedLatLng);
    setLat( clickedLatLng.lat);
    setLngs(clickedLatLng.lng);
    console.log(setLat);
    console.log(setLngs);
  };

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="">
                <MDBCardImage
                  src={convertImage(restaurant.log)}
                  
                  alt="avatar"
                  
                  className="rounded-circle center"
                  style={{ width: '150px' }}
                  fluid
                />
                <div className="mb-2"></div>
                <div>
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <MDBCardText>{restaurant.name}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <MDBCardText>{users.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <MDBCardText>{restaurant.phone}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="4">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="8">
                      <MDBCardText>{restaurant.address}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </div>
                <hr />
                <Button component="label">
                  <MDBCardText outline className="ms-1">
                    modifier image
                  </MDBCardText>
                  <input type="file" hidden onChange={handleImageChange} />
                </Button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>logo</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                    <Button component="label">
                    <MDBCardText outline className="ms-1">
                    modifier logo
                    </MDBCardText>
                    <input type="file" hidden onChange={handleImageChange2} />
                   </Button>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={onInputChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      value={users.email}
                      onChange={onInputChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={users.phone}
                      className="form-control"
                      onChange={onInputChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={address}
                      className="form-control"
                      onChange={onInputChange}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
           
                <br></br>
                <MDBRow>
                  <MDBCol sm="9">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleUpdateProfile}
                    >
                      modifier
                    </button>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="12">
            <MDBCard className="mb-4">
              <MDBCardBody>


                 <MDBRow className='w-100'>
      <MDBCol>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={center}
            onClick={handleMapClick}
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        ) : (
          <div>Loading maps...</div>
        )}
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
