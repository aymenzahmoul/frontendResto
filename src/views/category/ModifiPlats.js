import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBRow,
  MDBCol,
  MDBBadge,
} from 'mdb-react-ui-kit';
import axios from 'axios';

import { IconEdit, IconX } from '@tabler/icons';
import { Dialog, DialogTitle, DialogContent, Avatar, TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { Form, Upload, Space } from 'antd';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {  } from '@mui/material/Select';



const ModifiPlats = () => {
  
 
  const [meal, setMeal] = useState([]);
  const [photo, setPhoto] = useState('');
  const [category, setCategory] = useState([]);

  

  const convertImage = (base64Image) => {
    return '' + base64Image;
  };
  const [meals, setMeals] = useState({
    name: '',
    price: '',
    desc: '',
    available: '',
  });
  const { name, available, price, desc } = meals;
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/meal-configuration/meal/delete/${id}`);
      const updatedMeal = meal.filter((p) => p.id !== id);
      setMeal(updatedMeal);
    } catch (error) {
      console.error(error);
    }
  };
async function updateMeal(userId, updatedMealConfig) {
  try {
    const response = await fetch(`http://localhost:8080/meal-configuration/meal/update2/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMealConfig),
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

  const handleUpdateMeal = () => {
   
    const updateUserDto = {
      id: selectedMeal.id,
      name: name,
      photo: photo,
      price: price,
      desc: desc,
      available: available,
    
    };

    updateMeal(selectedMeal.id,updateUserDto)
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


 
  const handleModify = (meal) => {
    setSelectedMeal(meal);
    setMeals(meal);
    
    setEditDialogOpen(true);
  };

  const onChangeHandler = (e) => {
    setMeals({
      ...meals,
      [e.target.name]: e.target.value,
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

  const [i, setI] = useState(0);
  const s = category.length;

  useEffect(() => {
    if (i < s) {
      axios.get(`http://localhost:8080/meal-configuration/byCategory/${category[i].id}`)
        .then((response) => {
          setMeal(response.data);
          console.log(category);
        })
        .catch((error) => {
          console.error(error);
        });

      setI(i + 1); // Update the value of i
    }
  }, [i, s]);


  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  return (
    <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
      {meal.map((p) => (
        <MDBCol key={p.id}>
          <MDBCard className='h-100'>
            <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
              <IconX icon='trash' onClick={() => handleDelete(p.id)} />
              <IconEdit icon='edit' onClick={() => handleModify(p)} />
            </div>
            <br />
            <br />
            <MDBCardImage src={convertImage(p.photo)} alt='...' position='top' />
            <MDBCardBody>
              <MDBCardTitle>{p.name}</MDBCardTitle>
              <MDBCardText>{p.desc}</MDBCardText>
              <MDBCardText>{p.price}dt</MDBCardText>
            </MDBCardBody>
            <MDBCardFooter>
              <small className='text-muted'>
                {String(p.available) === 'true' ? (
                  <MDBBadge color='success' pill>
                    Disponible
                  </MDBBadge>
                ) : (
                  <MDBBadge color='danger' pill>
                    Non Disponible
                  </MDBBadge>
                )}
              </small>
            </MDBCardFooter>
          </MDBCard>
        </MDBCol>
      ))}

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Modifier le plat</DialogTitle>
        <DialogContent>
          <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Form.Item
              name='photo'
              valuePropName='fileList'
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
              noStyle
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Upload.Dragger
                name='file'
                listType='picture'
                maxCount={1}
                onChange={(info) => {
                  if (info.fileList.length > 0) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPhoto(reader.result);
                    };
                    reader.readAsDataURL(info.file.originFileObj);
                  } else {
                    setPhoto(photo);
                  }
                }}
              >
                <Space direction='vertical' size={2}>
                  <Avatar style={{ width: '50%', height: '50%', maxWidth: '200px' }} src={photo} alt='Store Location'  />
                </Space>
              </Upload.Dragger>
            </Form.Item>
            <Box component='form' noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField name='name' required fullWidth id='name' label='Name' value={name} onChange={onChangeHandler} />
                </Grid>
                <Grid item xs={12}>
                  <TextField name='desc' required fullWidth id='desc' label='description' value={desc} onChange={onChangeHandler} />
                </Grid>
                <Grid item xs={12}>
                  <TextField name='price' required fullWidth id='price' label='price' value={price} onChange={onChangeHandler} />
                </Grid>
          
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Disponibilité</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={String(available)}
                      onChange={(e) => setMeals({ ...meals, available: e.target.value })}
                    >
                      <MenuItem value='true'>true</MenuItem>
                      <MenuItem value='false'>false</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 4, mb: 3 }} onClick={handleUpdateMeal}>
                Save
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </MDBRow>
  );
};

export default ModifiPlats;
