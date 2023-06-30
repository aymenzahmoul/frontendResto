import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Grid, TextField } from '@mui/material';
import { IconSquarePlus } from '@tabler/icons';
import { Form, Upload, Space, Avatar } from 'antd';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import test from "../../assets/images/logos/default.jpg"

const AddMeal = () => {
  let navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [photo, setPhoto] = useState('');



  const [meal, setMeal] = useState({
    name: "",
    price: "",
    desc: "",
  });
  const { name, price, desc } = meal;

  const onChangeHandler = (e) => {
    setMeal({
      ...meal,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      photo: photo,
      price: price,
      desc: desc,
      categoryId: category[age]?.id,
    };
    axios.post('http://localhost:8080/meal-configuration/meal/create', data)
      .then(() => {
        window.location.reload(true);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const [Restaurant, setRestaurant] = useState('');
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
  useEffect(() => {
    axios.get(`http://localhost:8080/category-configuration/restaurant/${Restaurant.id}/categories`)
      .then(response => {
        setCategory(response.data);
      
       
      })
      .catch(error => {
        console.error(error);
      });
  }, [Restaurant.id]);

  


  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
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
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Form.Item
              name="photo"
              valuePropName="fileList"
              getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
              noStyle
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Upload.Dragger
                name="file"
                listType="picture"
                maxCount={1}
                onChange={(info) => {
                  if (info.fileList.length > 0) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPhoto(reader.result);
                    };
                    reader.readAsDataURL(info.file.originFileObj);
                  } else {
                    setPhoto('');
                  }
                }}
              >
                <Space direction="vertical" size={2}>
                  <Avatar
                    style={{
                      width: "50%",
                      height: "50%",
                      maxWidth: "200px",
                    }}
                    src={photo || test}
                    alt="Store Location"
                  />
                </Space>
              </Upload.Dragger>
            </Form.Item>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    value={name}
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="desc"
                    required
                    fullWidth
                    id="desc"
                    label="description"
                    value={desc}
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="price"
                    required
                    fullWidth
                    id="price"
                    label="price"
                    value={price}
                    onChange={onChangeHandler}
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 3 }}
                onClick={handleSubmit}
                
              >
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      </List>
    </Box>
  );

  return (
    <div>
      <Button variant="outlined" startIcon={<IconSquarePlus />} onClick={toggleDrawerr(true)}>ADD Plats</Button>
      <Drawer
        anchor={'right'}
        open={statee['right']}
        onClose={toggleDrawerr(false)}
      >
        {listcat}
      </Drawer>
    </div>
  );
}

export default AddMeal;
