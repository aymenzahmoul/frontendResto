import React from 'react';
import axios from "axios";
import  { useEffect,useState } from "react";
import { Grid, TextField } from '@mui/material';
import {IconEdit } from '@tabler/icons';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaselinr from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Form, Upload, Space, Avatar } from 'antd';
import MealService from 'src/Service/MealService';

const AddMeal = () => {
  
    let navigate = useNavigate()
    
   
    const [photo, setPhoto] = useState('');
    const [category, setCategory] = useState({})
    const [meal, setMeal] = useState({
      name: "",
      price: "",
      desc: "",
      available:"",
    });
  
    const { name, available,price, desc} = meal;
    const onInputChange = (e) => {
      setMeal({ ...meal, [e.target.name]: e.target.value });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const idd = localStorage.getItem('id');
  const getValueFromEvent = (event) => {
    if (Array.isArray(event)) {
      return event;
    }
    return event && event.fileList;
  };
  const mealService = new MealService();
const updateMeal = (id) => {
  const data = {
    name: name,
    image: photo,
    price: price,
    desc: desc,
    available: available,
  };

  mealService.updateMealById(id, { data })
    .then(updatedMeal => {
      // Handle the updated meal data
      console.log(updatedMeal);
    })
    .catch(error => {
      // Handle the error
      console.error(error);
    });
};

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/meal-configuration/meal/update/${id}`, meal);
    navigate("/");
  };
    useEffect(() => {
      axios.get('http://localhost:8080/category-configuration/category/all')
        .then(response => {
          setCategory(response.data);
          
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
    const { id } = useParams();
    useEffect(() => {
      axios
        .get(`http://localhost:8080/meal-configuration/meal/getById/${id}`)
        .then((response) => {
          setMeal(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [id]);

 


    
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value );
    };
  
    const [statee, setStatee] = React.useState({
        right: false,
      });
    
      const toggleDrawerr = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event  ).key === 'Tab' || (event ).key === 'Shift')) {
          return;
        }
    
        setStatee({ ...statee, right: open });
      };
  
      const listcat = (
        <Box
          sx={{ width: 450 }}
          role="presentation"
        
         
        >
          <List>
            <Container component="main" maxWidth="xs">
          <CssBaselinr />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
           <Button component="label">
           <Form.Item
  name="images"
  valuePropName="fileList"
  getValueFromEvent={getValueFromEvent}
  noStyle
  rules={[
    {
      required: true,
    },
  ]}
>
  <Upload.Dragger
    name="file"
    action={`/media/upload`}
    listType="picture"
    maxCount={1}
    accept=".png"
  >
    <Space direction="vertical" size={2}>
      <Avatar
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "256px",
        }}
        src="/images/product-default-img.png"
        alt="Store Location"
      />
    </Space>
  </Upload.Dragger>
</Form.Item>
            <input type="file" hidden  onChange={handleImageChange}/>
          </Button>
          <Box component="form" noValidate  sx={{ mt: 3 }}>
        
   
              <Grid container spacing={2}>
          
              <Grid item xs={12}>
 
    <TextField
      name="name"
      required
      fullWidth
      id="name"
      label="Name"
      value={meal.name}
      onChange={onInputChange}
    />

</Grid>
                
                <Grid item xs={12} >
                  <TextField
                    name="desc"
                    required
                    fullWidth
                    id="desc"
                    label="description"
                    value={desc}
                    onChange={onInputChange}
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    name="price"
                    required
                    fullWidth
                    id="price"
                    label="price"
                    value={price}
                    onChange={onInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
  <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">Category</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={age}
      label="Category"
      onChange={handleChange}
    >
      {Array.isArray(category) &&
        category.map((category, index) => (
          <MenuItem value={index} key={index}>
            {category.name}
          </MenuItem>
        ))}
    </Select>
  </FormControl>
</Grid>

                <Grid item xs={6} >
                <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">disponibilete</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={available}
   
    onChange={handleChange}
  >
    <MenuItem value={10}>true</MenuItem>
    <MenuItem value={20}>false</MenuItem>
    
  </Select>
</FormControl>
</Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 3 }}
               onClick={updateMeal(id)}
              >
                save
              </Button>
             
            </Box>
          </Box>
         
        </Container> 
       
          </List>
        </Box>
      );
  return (<>
    <Button variant=""  startIcon={<IconEdit />} onClick={toggleDrawerr(true)}></Button>
    <Drawer
      anchor={'right'}
      open={statee['right']}
      onClose={toggleDrawerr(false)}
    >
      {listcat}
    </Drawer>
    
    </>
  )
}

export default AddMeal
