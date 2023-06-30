import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import image from '../../assets/images/logos/default.jpg';
import test from './Command';
import { Box } from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';

export default function Orders() {
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

  let idd = Restaurants.id;

  useEffect(() => {
    loadCommande(idd);
  }, [idd]);

  const loadCommande = async id => {
    const result = await axios.get(`http://localhost:8080/commande-resources/getAllCommandBy/${id}`);
    setCommand(result.data);
  };

  useEffect(() => {
    if (command.id) {
      axios
        .get(`http://localhost:8080/commande-resources/command/getCommandeItems/${command.id}/items`)
        .then(response => {
          setCommands(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [command.id]);

  const [editMode, setEditMode] = useState(false);
  const [editedUsers, setEditedUsers] = useState([]);

  const convertImage = base64Image => {
    return base64Image;
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
    if (editMode) {
      console.log('Saving changes:', editedUsers);
    } else {
      setEditedUsers([...command]);
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedUsers = [...editedUsers];
    updatedUsers[index][name] = value;
    setEditedUsers(updatedUsers);
  };

  return (
    <>
      <br />
      <DashboardCard title="Orders">
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Order num</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">prix</th>
              <th scope="col">date</th>
              <th scope="col">paymentMethod</th>
              <th scope="col">action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {command.map((user, index) => (
              <tr key={user.userId}>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      name="authority"
                      value={user.userId}
                      onChange={e => handleInputChange(e, index)}
                      className="form-control"
                    />
                  ) : (
                    <>{user.userId}</>
                  )}
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={image}
                      alt=""
                      style={{ width: '45px', height: '45px' }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      {editMode ? (
                        <input
                          type="text"
                          name="username"
                          value={user.username}
                          onChange={e => handleInputChange(e, index)}
                          className="form-control"
                        />
                      ) : (
                        <p className="fw-bold mb-1">{user.nom}</p>
                      )}
                    </div>
                  </div>
                </td>

                <td>
                  {editMode ? (
                    <select
                      name="commandeStatus"
                      value={user.commandeStatus}
                      onChange={e => handleInputChange(e, index)}
                      className="form-select"
                    >
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="CANCELED">CANCELED</option>
                    </select>
                  ) : (
                    <>
                      {(() => {
                        switch (String(user.commandeStatus)) {
                          case 'COMPLETED':
                            return (
                              <MDBBadge color="success" pill>
                                {String(user.commandeStatus)}
                              </MDBBadge>
                            );
                          case 'PENDING':
                            return (
                              <MDBBadge color="warning" pill>
                                {String(user.commandeStatus)}
                              </MDBBadge>
                            );
                          case 'CONFIRMED':
                            return (
                              <MDBBadge color="info" pill>
                                {String(user.commandeStatus)}
                              </MDBBadge>
                            );
                          case 'CANCELED':
                            return (
                              <MDBBadge color="danger" pill>
                                {String(user.commandeStatus)}
                              </MDBBadge>
                            );
                          default:
                            return null;
                        }
                      })()}
                    </>
                  )}
                </td>

                <td>
                  {editMode ? (
                    <input
                      type="text"
                      name="total"
                      value={user.total}
                      onChange={e => handleInputChange(e, index)}
                      className="form-control"
                    />
                  ) : (
                    <>{user.total}</>
                  )}
                </td>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      name="authority"
                      value={user.description}
                      onChange={e => handleInputChange(e, index)}
                      className="form-control"
                    />
                  ) : (
                    <>{user.createdAt}</>
                  )}
                </td>
                <td>
                  {editMode ? (
                    <input
                      type="text"
                      name="authority"
                      value={user.paymentMethod}
                      onChange={e => handleInputChange(e, index)}
                      className="form-control"
                    />
                  ) : (
                    <>{user.paymentMethod}</>
                  )}
                </td>
                <td>
                  {editMode ? (
                    <MDBBtn color="link" rounded size="sm" onClick={handleEditClick}>
                      Save
                    </MDBBtn>
                  ) : (
                    <MDBBtn color="link" rounded size="sm" onClick={handleEditClick}>
                      Edit
                    </MDBBtn>
                  )}
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
}
