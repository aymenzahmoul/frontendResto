import React, { useState, useEffect } from 'react';
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from 'mdb-react-ui-kit';
import DashboardCard from 'src/components/shared/DashboardCard';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Box,
} from '@mui/material';
import Button from '@mui/material/Button';
import { MenuItem } from '@material-ui/core';


export default function TypographyPage() {
  const [users, setUsers] = useState([]);
 
 
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/authentication-management/users/all')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const convertImage = (base64Image) => {
    return 'data:image/jpg;base64,' + base64Image;
  };


  async function updatedUsers(userId, updateUserDto) {
    try {
      const response = await fetch(`http://localhost:8080/authentication-management/${userId}/authority`, {
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
 
  
    updatedUsers(selectedUser.id, selectedUser.enabled)
      .then(isUpdated => {
        if (isUpdated) {
          window.location.reload(true);
          console.log(selectedUser.enabled);
          console.log('User info updated successfully');
        } else {
          console.log('Failed to update user info');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/meal-configuration/meal/delete/${id}`);
      const updatedMeal = users.filter((p) => p.id !== id);
      setUsers(updatedMeal);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      <DashboardCard title="Users">
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={convertImage(user.image)}
                      alt=""
                      style={{ width: '45px', height: '45px' }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{user.username}</p>
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <>
                    {String(user.enabled) === 'true' ? (
                      <MDBBadge color="success" pill>
                        {String(user.enabled)}
                      </MDBBadge>
                    ) : (
                      <MDBBadge color="danger" pill>
                        {String(user.enabled)}
                      </MDBBadge>
                    )}
                  </>
                </td>
                <td>{user.authority}</td>
                <td>
                  <MDBBtn
                    color="link"
                    value={selectedUser}
                    name='selectedUser'
                    rounded
                    size="sm"
                    onClick={() => {
                      setSelectedUser(user);
                      setEditDialogOpen(true);
                    }}
                  >
                    Edit
                  </MDBBtn>
                  <MDBBtn
                    color="danger"
                    rounded
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </DashboardCard>

      {editDialogOpen && (
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
        >
          <DialogTitle>Modifier l'utilisateur</DialogTitle>
<DialogContent>
<Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Grid container spacing={6}>
 
    <Grid item xs={12}>
    
        <InputLabel id="demo-simple-select-label">Activation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(selectedUser?.enabled)}
          onChange={(e) => setSelectedUser({ ...selectedUser, enabled: e.target.value === 'true' })}
        >
          <MenuItem value="true">Activé</MenuItem>
          <MenuItem value="false">Désactivé</MenuItem>
        </Select>
        
    </Grid>
    <Grid item xs={12}>
      <Button variant="contained" onClick={handleUpdateProfile}>
        Enregistrer
      </Button>
      
    </Grid>
   
  </Grid>
 
  </Box>
</DialogContent>

        </Dialog>
      )}
    </>
  );
}
