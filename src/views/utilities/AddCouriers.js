import React from 'react';
import axios from "axios";
import  {useState } from "react";
import {  useNavigate } from "react-router-dom";
import DashboardCard from 'src/components/shared/DashboardCard';
import Box from '@mui/material/Box';
import { Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { IconArrowLeft } from '@tabler/icons';

  export default function AddCouriers() {
    let navigate = useNavigate();

    const [couriers, setCouriers] = useState({
      name: "",
      address: "",
      email: "",
      phone:"",
      sexe:""
    });
  
    const { name, address, email,phone ,sexe} = couriers;
  
    const onInputChange = (e) => {
        setCouriers({ ...couriers, [e.target.name]: e.target.value });
    };
  
    const onSubmit = async (e) => {
      e.preventDefault();
      await axios.post("http://localhost:8080/couriers", couriers);
      navigate("/");
    };
  return (
    <DashboardCard title="Couriers / Create">
  <Button variant="outlined" href="Couriers" startIcon={<IconArrowLeft />}>
  <IconArrowLeft /> 
      </Button>
      
    <br></br>
    <Box>
    <Form onSubmit={(e) => onSubmit(e)} >
    <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>photo </Form.Label>
          <Form.Control
            required
            type="file"
        
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      <Row className="mb-3">
        
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label> name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={name}
            
            onChange={(e) => onInputChange(e)}
           
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>phone</Form.Label>
          <InputGroup hasValidation>
            
            <Form.Control
              type="number"
              
              aria-describedby="inputGroupPrepend"
              required
              name="phone"
              value={phone}
              
              onChange={(e) => onInputChange(e)}
            />
            <Form.Control.Feedback type="invalid">
             
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>des</Form.Label>
          <Form.Control type="text"  required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>email</Form.Label>
          <Form.Control type="email"  name="email"
            value={email}
            
            onChange={(e) => onInputChange(e)} required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
      <Form.Group as={Col} md="9" controlId="validationCustom03">
          <Form.Label>address</Form.Label>
          <Form.Control as="textarea"  name="address"
            value={address}
            
            onChange={(e) => onInputChange(e)} rows={3} required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Group>
      <Button type="submit"> save</Button>
    </Form>
 
    </Box>

</DashboardCard>
  );
};