import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import  { useEffect,useState } from "react";
import { Grid, Paper, InputBase, IconButton,  TextField, Avatar, Chip } from '@mui/material';
import { Stack } from '@mui/system';
import {IconSquarePlus } from '@tabler/icons';
import {   Dialog, DialogTitle, DialogContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {
    MDBContainer,
   
  } from "mdb-react-ui-kit";
  import SearchIcon from '@mui/icons-material/Search';
  import Button from '@mui/material/Button';
  import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaselinr from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import { Container } from 'react-bootstrap';
import DashboardCard from 'src/components/shared/DashboardCard';
import { useNavigate } from 'react-router';
import AddMeal from '../category/AddMeal';
import ModifiPlats from '../category/ModifiPlats';

  export default function Produits() {

    let navigate = useNavigate()
    const [category, setCategory] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const convertImage = (base64Image) => {
      return  ""+base64Image;
    };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      console.log(reader.result);
    };

    reader.readAsDataURL(file);
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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      image: image,
      restaurantId: Restaurant.id,
    };
    axios.post('http://localhost:8080/category-configuration/category/create', data)
    window.location.reload(true);
  };
  async function updateCategory(userId, updatedMealConfig) {
    try {
      const response = await fetch(`http://localhost:8080/category-configuration/category/update/${userId}`, {
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


  

  const handleUpdateCategory = () => {
    
    const updateUserDto = {
      id: editedid,
      restaurantId: editedresto,
      name: editedName,
      image: image,
    };

    updateCategory(editedid,updateUserDto)
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



 
    useEffect(() => {
      axios.get(`http://localhost:8080/category-configuration/restaurant/${Restaurant.id}/categories`)
        .then(response => {
          setCategory(response.data);
     
        })
        .catch(error => {
          console.error(error);
        });
    }, [Restaurant.id]);
 
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
           <Avatar   size="100" src="/broken-image.jpg"  />
          <input type="file" hidden  onChange={handleImageChange}/>
        </Button>
        <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={name}
                  onChange={handleNameChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 3 }}
             onClick={handleSubmit}
            >
              save
            </Button>
          </Box>
        </Box>
      </Container> 
        </List>
      </Box>
    );


  
  
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedid, setEditedid] = useState('');
    const [editedresto, setEditedresto] = useState('');
    const [editedImage, setEditedImage] = useState('');
  
    const handleEditClick = (category) => {

      setEditedid(category.id);
      setEditedresto(category.restaurantId);
      setSelectedCategory(category);
      setEditedName(category.name);
      setEditedImage(category.image);
      setEditDialogOpen(true);
    };
  
 
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:8080/meal-configuration/category/delete/${id}`);
        const updatedMeal = category.filter((p) => p.id !== id);
        setCategory(updatedMeal);
        window.location.reload(true);
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <DashboardCard title="Menus">
    <MDBContainer fluid className="my-5 text-center">
    <Stack direction="row"  spacing={13}> 
         <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
    
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search "
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
   
    
    </Paper>
    <AddMeal/>

    <div>
      <Button variant="outlined"  startIcon={<IconSquarePlus />} onClick={toggleDrawerr(true)}> ADD category</Button>
      <Drawer
        anchor={'right'}
        open={statee['right']}
        onClose={toggleDrawerr(false)}
      >
        {listcat}
      </Drawer>
    </div>
    
    
      </Stack>
    <br></br>


    
    <Stack direction="row" spacing={1}>
        {category.map((category) => (
          <Chip
            key={category.id}
            avatar={<Avatar alt="Natacha" src={convertImage(category.image)} />}
            label={category.name}
            variant="outlined"
            onDelete={() => handleDelete(editedid)}
            deleteIcon={<CloseIcon />}
            onClick={() => handleEditClick(category)}
            icon={<EditIcon />}
          />
        ))}
      </Stack>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Modifier la catégorie</DialogTitle>
        <DialogContent>
      
          
            <Button component="label">
           <Avatar   size="100" src="/broken-image.jpg"  />
          <input type="file" hidden  onChange={handleImageChange}/>
        </Button>
        <TextField
          
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
      <>  </>
          <Button variant="contained" onClick={handleUpdateCategory}>Enregistrer</Button>
        </DialogContent>
      </Dialog>
      <br></br>
      <br></br>
<ModifiPlats/>


  </MDBContainer>
  </DashboardCard>
  );
};